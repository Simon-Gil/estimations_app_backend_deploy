"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountService = exports.AccountService = void 0;
const class_transformer_1 = require("class-transformer");
const account_dto_1 = require("./dtos/account.dto");
const account_entity_1 = require("./account.entity");
const AppError_1 = require("../../common/utils/AppError");
const account_repository_1 = require("./account.repository");
const price_config_service_1 = require("./price-config/price-config.service");
const opportunity_dto_1 = require("../opportunity/opportunity.dto");
const user_service_1 = require("../user/user.service");
const authorization_utility_1 = require("../../common/utils/authorization.utility");
const proposal_service_1 = require("../proposal/proposal.service");
const opportunity_service_1 = require("./../opportunity/opportunity.service");
const account_detail_dto_1 = require("./dtos/account-detail.dto");
/**
 * Servicio que maneja las cuentas comerciales.
 *
 * Este servicio proporciona funciones para la gestión de cuentas, incluyendo la creación,
 * actualización, eliminación y consulta.
 */
class AccountService {
    /**
     * Obtiene una lista de todas las cuentas disponibles, filtradas según los permisos del usuario.
     *
     * Esta función verifica si el usuario tiene permisos de lectura (`read`) sobre las cuentas. Si el usuario no tiene acceso general a las cuentas, la lista se filtra para devolver solo aquellas que están relacionadas con el usuario.
     * Si se reciben valores para offset y limit, se limitarán los resultados devueltos
     *
     * @param user - El usuario para el cual se realiza la consulta de cuentas. Se usa para verificar si el usuario tiene permisos de acceso a las cuentas.
     * @param offset - Número de registro a partir del cual se devuelven los resultados
     * @param limit - Número de registros devueltos a partir del offset
     *
     * @returns Una lista de DTOs de cuentas que el usuario tiene permitido ver.
     * @throws {AppError} Si no se encuentra ninguna cuenta que coincida con los permisos del usuario (404).
     */
    async getAccounts(user, offset, limit) {
        const offsetNum = offset ? parseInt(offset, 10) : undefined;
        const limitNum = limit ? parseInt(limit, 10) : undefined;
        let accounts = await account_repository_1.accountRepo.findPaged(offsetNum, limitNum);
        // Filtramos la lista de cuentas si el usuario tiene permiso readSelf Account y no read Account
        if (!await (0, authorization_utility_1.checkAuthorization)(user, 'read', 'account')) {
            accounts = (await Promise.all(accounts.map(async (account) => {
                const isRelated = await this.checkRelatedUser(account.id, user);
                return isRelated ? account : null; // Si es válido, lo mantenemos, de lo contrario, lo ignoramos
            }))).filter(account => account !== null);
        }
        if (!accounts) {
            throw new AppError_1.AppError('No se ha encontrado el recurso solicitado', 404);
        }
        const accountsDTO = accounts.map(account => (0, class_transformer_1.plainToClass)(account_dto_1.AccountDTO, account));
        return accountsDTO;
    }
    /**
     * Obtiene los detalles de una cuenta específica, incluidos los datos de configuración de precios si el usuario tiene permisos.
     *
     * La función recupera la cuenta identificada por su `accountId`, y dependiendo de los permisos del usuario, puede incluir información adicional sobre la configuración de precios. Si el usuario no tiene permisos para ver la configuración de precios, se omite esta información.
     *
     * @param accountId - El identificador único de la cuenta de la cual se desean obtener los detalles.
     * @param user - El usuario para el cual se realiza la consulta de la cuenta. Se usa para verificar los permisos del usuario.
     *
     * @returns Un DTO que contiene los detalles completos de la cuenta solicitada.
     * @throws {AppError} Si no se puede obtener la cuenta o si el usuario no tiene los permisos necesarios para verla (404 o 403).
     */
    async getAccountDetail(accountId, user) {
        let account;
        const hasReadPriceConfig = await (0, authorization_utility_1.checkAuthorization)(user, 'readPriceConfig', 'account');
        if (!hasReadPriceConfig) {
            account = await this.getAccountById(accountId, ['commercialManager', 'technicalManager']);
        }
        else {
            account = await this.getAccountById(accountId, [
                'priceConfig.profilePrices.profile', 'commercialManager', 'technicalManager'
            ]);
        }
        const accountDTO = (0, class_transformer_1.plainToInstance)(account_detail_dto_1.AccountDetailDTO, account);
        return accountDTO;
    }
    /**
     * Obtiene los detalles de una cuenta asociada a una propuesta específica, validando los permisos del usuario.
     *
     * La función busca una propuesta identificada por su `proposalId` y verifica si el usuario tiene permisos suficientes para ver la cuenta asociada a dicha propuesta. Si el usuario no tiene permisos de lectura o no es el responsable técnico o comercial de la cuenta, se lanzará un error.
     *
     * @param proposalId - El identificador único de la propuesta relacionada con la cuenta.
     * @param user - El usuario para el cual se realiza la consulta de la cuenta. Se verifica si el usuario tiene permisos para acceder a la cuenta asociada a la propuesta.
     *
     * @returns Un DTO con los detalles de la cuenta asociada a la propuesta solicitada.
     * @throws {AppError} Si el usuario no tiene permisos suficientes para acceder a la cuenta (403).
     * @throws {AppError} Si ocurre un error al obtener la cuenta o si la propuesta no existe (404 o 500).
     */
    async getAccountByProposal(proposalId, user) {
        const proposal = await proposal_service_1.proposalService.getById(proposalId, ['opportunity.account.technicalManager', 'opportunity.account.commercialManager']);
        // Si el usuario no tiene read y no es resp. técnico o comercial de la cuenta lanzamos error 
        const managerIds = [proposal.opportunity.account.technicalManager?.id, proposal.opportunity.account.commercialManager.id];
        if (!await (0, authorization_utility_1.checkAuthorization)(user, 'read', 'account') && !managerIds.includes(user.id)) {
            throw new AppError_1.AppError('No tienes los permisos necesarios para realizar esta acción', 403);
        }
        const accountId = proposal.opportunity.account.id;
        const accountDTO = await this.getAccountDetail(accountId, user);
        return accountDTO;
    }
    /**
     * Obtiene una cuenta por su identificador único.
     *
     * La función busca una cuenta identificada por su `accountId` en la base de datos, y puede cargar relaciones adicionales si se especifican. Si la cuenta no existe o ocurre un error al obtenerla, se lanzará una excepción.
     *
     * @param accountId - El identificador único de la cuenta que se desea obtener.
     * @param relations - (Opcional) Una lista de relaciones a cargar junto con la cuenta.
     *
     * @returns La entidad de la cuenta encontrada.
     * @throws {AppError} Si no se encuentra la cuenta (404).
     * @throws {AppError} Si ocurre un error durante la operación (500).
     */
    async getAccountById(accountId, relations) {
        try {
            const account = await account_repository_1.accountRepo.findOne({
                where: { id: accountId },
                relations: relations
            });
            if (!account) {
                throw new AppError_1.AppError('La cuenta no ha sido encontrada', 404);
            }
            return account;
        }
        catch (err) {
            throw new AppError_1.AppError('Error al obtener la cuenta', 500);
        }
    }
    /**
     * Asigna una configuración de precios a una cuenta.
     *
     * La función recibe una cuenta y una configuración de precios, y asigna dicha configuración a la cuenta. Luego, guarda la cuenta actualizada en la base de datos. Si ocurre un error al intentar guardar la cuenta, se lanzará una excepción.
     *
     * @param account - La cuenta a la que se le asignará la configuración de precios.
     * @param priceConfig - La configuración de precios que se asignará a la cuenta.
     *
     * @returns La cuenta actualizada con la nueva configuración de precios asignada.
     * @throws {AppError} Si no es posible guardar la cuenta con la nueva configuración de precios (500).
     */
    async assignPriceConfigToAccount(account, priceConfig) {
        account.priceConfig = priceConfig;
        const resultAccount = await account_repository_1.accountRepo.save(account);
        if (!resultAccount) {
            throw new AppError_1.AppError('No ha sido posible asignar la configuración de precios a la cuenta', 500);
        }
        return resultAccount;
    }
    /**
    * Crea una nueva cuenta con la información proporcionada.
    *
    * La función crea una nueva cuenta comercial, asignando un responsable comercial, un responsable técnico (opcional), una configuración de precios por defecto, y otros parámetros. Además, realiza comprobaciones para asegurar que el email y el nombre de la cuenta sean únicos. Si ocurre algún error durante el proceso de creación, se lanzará una excepción.
    *
    * @param email - El correo electrónico de la nueva cuenta. Este debe ser único.
    * @param name - El nombre de la nueva cuenta. Este debe ser único.
    * @param commercialManagerId - El identificador del responsable comercial de la cuenta.
    * @param technicalManagerId - (Opcional) El identificador del responsable técnico de la cuenta.
    * @param isCustomer - (Opcional) Indica si la cuenta es un cliente.
    *
    * @returns Un DTO con los detalles de la cuenta recién creada.
    * @throws {AppError} Si el email o el nombre ya están en uso (400).
    * @throws {AppError} Si falta información requerida, como el email o el nombre (400).
    * @throws {AppError} Si no se puede asignar el responsable comercial o técnico (400).
    */
    async createAccount(user, email, name, legalName, cif, tlf) {
        const newAccount = new account_entity_1.AccountEntity();
        // Asignación de email
        if (email) {
            if (await account_repository_1.accountRepo.findOne({ where: { email: email } })) {
                throw new AppError_1.AppError('El email introducido está asignado a otra cuenta', 400);
            }
            newAccount.email = email;
        }
        else {
            throw new AppError_1.AppError('No se ha recibido email', 400);
        }
        if (name) {
            if (await account_repository_1.accountRepo.findOne({ where: { name: name } })) {
                throw new AppError_1.AppError('El nombre introducido está asignado a otra cuenta', 400);
            }
            newAccount.name = name;
        }
        else {
            throw new AppError_1.AppError('No se ha recibido el nombre de la cuenta', 400);
        }
        // Asignación de razón social y comprobación de unicidad
        if (legalName) {
            const existingAccount = await account_repository_1.accountRepo.findOne({ where: { legalName: legalName } });
            if (existingAccount) {
                throw new AppError_1.AppError('La razón social recibida está asignada a otra cuenta', 400);
            }
            newAccount.legalName = legalName;
        }
        // Asignación  de código de identificación fiscal y comprobación de unicidad
        if (cif) {
            const existingAccount = await account_repository_1.accountRepo.findOne({ where: { cif: cif } });
            if (existingAccount) {
                throw new AppError_1.AppError('El CIF recibido está asignado a otra cuenta', 400);
            }
            newAccount.cif = cif;
        }
        // Asignación de teléfono y comprobación de unicidad
        if (tlf) {
            const existingAccount = await account_repository_1.accountRepo.findOne({ where: { tlf: tlf } });
            if (existingAccount) {
                throw new AppError_1.AppError('El número de teléfono recibido está asignado a otra cuenta', 400);
            }
            newAccount.tlf = tlf;
        }
        // Asignación de responsable comercial, por defecto quien crea la cuenta
        newAccount.commercialManager = user;
        // Asignacion de PriceConfig por defecto
        const defaultPriceConfig = await price_config_service_1.priceConfigService.getDefaultPriceConfig();
        newAccount.priceConfig = defaultPriceConfig;
        const savedAccount = await account_repository_1.accountRepo.save(newAccount);
        const accountDTO = (0, class_transformer_1.plainToClass)(account_dto_1.AccountDTO, savedAccount);
        return accountDTO;
    }
    /**
     * Obtiene las oportunidades comerciales asociadas a una cuenta específica, filtrando los resultados según los permisos del usuario.
     *
     * La función recupera las oportunidades relacionadas con una cuenta, asegurándose de que el usuario tenga los permisos adecuados para acceder a ellas. Además, se filtran las propuestas asociadas a las oportunidades según los permisos del usuario (tanto para leer todas las propuestas como solo las que le pertenecen).
     *
     * @param accountId - El identificador único de la cuenta cuya información de oportunidades se desea obtener.
     * @param user - El usuario que realiza la solicitud, utilizado para verificar los permisos de acceso.
     *
     * @returns Un arreglo de DTOs de oportunidades asociadas a la cuenta, con las propuestas filtradas de acuerdo con los permisos del usuario.
     * @throws {AppError} Si ocurre un error al intentar obtener las oportunidades de la cuenta (500).
     */
    async getAccountOpportunities(accountId, user) {
        // Obtenemos cuenta con sus oportunidades ordenadas por status (pending-won-lost)
        let account = await account_repository_1.accountRepo.findWithOrderedOpportunities(accountId);
        // Filtramos oportunidades en funcion de permisos de usuario respecto a Oportunidades
        if (!await (0, authorization_utility_1.checkAuthorization)(user, 'read', 'opportunity')) {
            account.opportunities = (await Promise.all(account.opportunities.map(async (opportunity) => {
                const isValid = await opportunity_service_1.opportunityService.checkRelatedUser(user, opportunity.id);
                return isValid ? opportunity : null;
            }))).filter(opportunity => opportunity !== null);
        }
        // Determinamos permisos del usuario respecto a Propuesta
        const hasReadProposal = await (0, authorization_utility_1.checkAuthorization)(user, 'read', 'proposal');
        const hasReadSelfProposal = await (0, authorization_utility_1.checkAuthorization)(user, 'readSelf', 'proposal');
        // Comprobamos si el usuario tiene algún acceso de lectura a Propuestas
        if (hasReadProposal || hasReadSelfProposal) {
            // En caso de ser read self, comprobamos si existe alguna propuesta que pueda leer el usuario
            if (!hasReadProposal) {
                await Promise.all(account.opportunities.map(async (opportunity) => {
                    opportunity.proposals = (await Promise.all(opportunity.proposals.map(async (proposal) => {
                        const isValid = await proposal_service_1.proposalService.checkRelatedUser(user, proposal.id);
                        return isValid ? proposal : null;
                    }))).filter(proposal => proposal !== null);
                }));
            }
            // Filtramos datos sensibles de propuestas en el envío
            await Promise.all(account.opportunities.map(async (opportunity) => {
                if (opportunity.proposals && opportunity.proposals.length > 0) {
                    const filteredProposals = await proposal_service_1.proposalService.filterSpecialFields(user, opportunity.proposals);
                    opportunity.proposals = Array.isArray(filteredProposals) ? filteredProposals : [filteredProposals];
                }
            }));
        }
        const accountOpportunitiesDTO = (0, class_transformer_1.plainToInstance)(opportunity_dto_1.OpportunityDTO, account.opportunities);
        // Si el usuario no tiene ningún permiso read proposal se eliminan del DTO
        if (!hasReadProposal && !hasReadSelfProposal) {
            accountOpportunitiesDTO.forEach(opportunity => {
                delete opportunity.proposals;
            });
        }
        return accountOpportunitiesDTO;
    }
    /**
     * Obtiene una cuenta comercial a partir de su dirección de correo electrónico.
     *
     * La función busca una cuenta en el repositorio de cuentas utilizando el correo electrónico proporcionado como criterio de búsqueda.
     * Si no se encuentra ninguna cuenta con el correo electrónico proporcionado, se retorna `null`.
     *
     * @param email - La dirección de correo electrónico de la cuenta que se desea obtener.
     *
     * @returns Una instancia de la cuenta comercial encontrada, o `null` si no se encuentra ninguna cuenta con ese correo electrónico.
     */
    async getAccountByEmail(email) {
        const account = await account_repository_1.accountRepo.findOne({ where: { email: email } });
        return account;
    }
    /**
     * Actualiza los datos de una cuenta comercial existente.
     *
     * La función permite actualizar varios atributos de una cuenta comercial, tales como el nombre, el correo electrónico, el cif
     * o el número de teléfono. Además, verifica que el correo electrónico no esté siendo utilizado por otra cuenta.
     *
     * @param id - El identificador único de la cuenta que se desea actualizar.
     * @param name - (Opcional) El nuevo nombre de la cuenta.
     * @param email - (Opcional) El nuevo correo electrónico de la cuenta.
     * @param commercialManagerId - (Opcional) El identificador del nuevo responsable comercial de la cuenta.
     * @param technicalManagerId - (Opcional) El identificador del nuevo responsable técnico de la cuenta.
     * @param isCustomer - (Opcional) El nuevo valor del campo booleano `isCustomer`, indicando si la cuenta es un cliente.
     *
     * @returns Un objeto `AccountDTO` con la información de la cuenta actualizada.
     * @throws {AppError} Si el correo electrónico está asignado a otra cuenta o si ocurre un error al actualizar la cuenta (409, 500).
     */
    async updateAccount(id, name, email, legalName, cif, tlf) {
        const accountEntity = await this.getAccountById(id);
        //Asignación de nombre
        if (name) {
            const existingAccount = await account_repository_1.accountRepo.findOne({ where: { name: name } });
            if (existingAccount && existingAccount.id !== id) {
                throw new AppError_1.AppError('El nombre recibido está asignado a otra cuenta', 400);
            }
            accountEntity.name = name;
        }
        //Asignación de email
        if (email) {
            // Comprobar que el email no está asignado a otra cuenta
            const existingAccount = await this.getAccountByEmail(email);
            if (existingAccount && existingAccount.id !== id) {
                throw new AppError_1.AppError('El email está asignado a otra cuenta cliente', 409);
            }
            accountEntity.email = email;
        }
        // Asignación de razón social y comprobación de unicidad
        if (legalName) {
            const existingAccount = await account_repository_1.accountRepo.findOne({ where: { legalName: legalName } });
            if (existingAccount && existingAccount.id !== id) {
                throw new AppError_1.AppError('La razón social recibida está asignada a otra cuenta', 400);
            }
            accountEntity.legalName = legalName;
        }
        // Asignación  de código de identificación fiscal y comprobación de unicidad
        if (cif) {
            const existingAccount = await account_repository_1.accountRepo.findOne({ where: { cif: cif } });
            if (existingAccount && existingAccount.id !== id) {
                throw new AppError_1.AppError('El CIF recibido está asignado a otra cuenta', 400);
            }
            accountEntity.cif = cif;
        }
        // Asignación de teléfono y comprobación de unicidad
        if (tlf) {
            const existingAccount = await account_repository_1.accountRepo.findOne({ where: { tlf: tlf } });
            if (existingAccount && existingAccount.id !== id) {
                throw new AppError_1.AppError('El número de teléfono recibido está asignado a otra cuenta', 400);
            }
            accountEntity.tlf = tlf;
        }
        const updatedAccount = await account_repository_1.accountRepo.save(accountEntity);
        // Comprobación de la actualización de cuenta y error inesperado
        if (!updatedAccount) {
            throw new AppError_1.AppError('Ha ocurrido un error al modificar los datos de la cuenta', 500);
        }
        return (0, class_transformer_1.plainToClass)(account_dto_1.AccountDTO, updatedAccount);
    }
    /**
     * Asigna la configuración de precios por defecto a una cuenta comercial.
     *
     * La función obtiene la configuración de precios por defecto y la asigna a la cuenta especificada mediante su identificador.
     *
     * @param accountId - El identificador único de la cuenta a la que se desea asignar la configuración de precios.
     *
     * @returns La cuenta comercial con la configuración de precios por defecto asignada.
     * @throws {AppError} Si ocurre un error al obtener o asignar la configuración de precios (500).
     */
    async assignDefaultPriceConfig(accountId) {
        const account = await this.getAccountById(accountId, ["priceConfig"]);
        const defaultConfig = await price_config_service_1.priceConfigService.getDefaultPriceConfig();
        const resultAccount = await this.assignPriceConfigToAccount(account, defaultConfig);
        return (0, class_transformer_1.plainToInstance)(account_detail_dto_1.AccountDetailDTO, resultAccount);
    }
    /**
     * Verifica si un usuario está relacionado con una cuenta como responsable técnico o comercial.
     *
     * La función comprueba si el usuario proporcionado es el responsable técnico o comercial de la cuenta
     * especificada por su identificador. Retorna `true` si el usuario es alguno de estos responsables; de lo contrario, retorna `false`.
     *
     * @param accountId - El identificador único de la cuenta que se desea comprobar.
     * @param user - El usuario que se desea verificar si está relacionado con la cuenta.
     *
     * @returns `true` si el usuario es el responsable técnico o comercial de la cuenta; de lo contrario, retorna `false`.
     */
    async checkRelatedUser(accountId, user) {
        const account = await this.getAccountById(accountId, ['technicalManager', 'commercialManager']);
        return account.technicalManager?.id === user.id || account.commercialManager?.id === user.id;
    }
    /**
     * Asigna un nuevo responsable comercial a una cuenta.
     *
     * La función actualiza la cuenta especificada, asignando al responsable comercial proporcionado.
     * Si ocurre un error al obtener la cuenta o al asignar el responsable comercial, se lanza un error con el mensaje correspondiente.
     *
     * @param accountId - El identificador único de la cuenta a la que se asignará el responsable comercial.
     * @param commercialManagerId - El identificador del nuevo responsable comercial que se asignará a la cuenta.
     *
     * @throws {AppError} Si ocurre un error al asignar al responsable comercial (500).
     */
    async assignCommercialManager(accountId, commercialManagerId) {
        try {
            const account = await exports.accountService.getAccountById(accountId, ['commercialManager']);
            const commercialManager = await user_service_1.userService.getUserById(commercialManagerId);
            account.commercialManager = commercialManager;
            await account_repository_1.accountRepo.save(account);
        }
        catch (err) {
            throw new AppError_1.AppError('No ha sido posible asignar al responsable comercial de la cuenta', 500);
        }
    }
    /**
     * Asigna un nuevo responsable técnico a una cuenta.
     *
     * La función actualiza la cuenta especificada, asignando al responsable técnico proporcionado.
     * Si ocurre un error al obtener la cuenta o al asignar el responsable técnico, se lanza un error con el mensaje correspondiente.
     *
     * @param accountId - El identificador único de la cuenta a la que se asignará el responsable técnico.
     * @param technicalManagerId - El identificador del nuevo responsable técnico que se asignará a la cuenta.
     *
     * @throws {AppError} Si ocurre un error al asignar al responsable técnico (500).
     */
    async assignTechnicalManager(accountId, technicalManagerId) {
        try {
            const account = await exports.accountService.getAccountById(accountId, ['technicalManager']);
            const technicalManager = await user_service_1.userService.getUserById(technicalManagerId);
            account.technicalManager = technicalManager;
            await account_repository_1.accountRepo.save(account);
        }
        catch (err) {
            console.log('No ha sido posible asignar al responsable técnico de la cuenta', err);
            throw new AppError_1.AppError('No ha sido posible asignar al responsable técnico de la cuenta', 500);
        }
    }
}
exports.AccountService = AccountService;
exports.accountService = new AccountService();
