"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.opportunityService = exports.OpportunityService = void 0;
const class_transformer_1 = require("class-transformer");
const opportunity_dto_1 = require("./opportunity.dto");
const AppError_1 = require("./../../common/utils/AppError");
const Opportunity_1 = require("./Opportunity");
const opportunity_repository_1 = require("./opportunity.repository");
const account_service_1 = require("./../accounts/account.service");
const typology_service_1 = require("../company-structure/typology/typology.service");
const user_service_1 = require("./../user/user.service");
const estimation_service_1 = require("./../estimations/estimation.service");
const OpportunityStatus_1 = require("./../opportunity/OpportunityStatus");
const proposal_service_1 = require("./../proposal/proposal.service");
const authorization_utility_1 = require("./../../common/utils/authorization.utility");
const account_repository_1 = require("./../accounts/account.repository");
const ProposalStatus_1 = require("./../proposal/ProposalStatus");
const proposal_dto_1 = require("./../proposal/proposal.dto");
/**
 * Servicio que maneja las oportunidades comerciales.
 *
 * Este servicio proporciona funciones para la gestión de oportunidades comerciales, incluyendo la creación,
 * actualización, eliminación y consulta de oportunidades.
 */
class OpportunityService {
    /**
     * Crea una nueva oportunidad comercial para una cuenta específica.
     *
     * La función realiza varias validaciones y asignaciones antes de crear la oportunidad:
     * - Verifica si ya existe una oportunidad con el mismo nombre para la cuenta.
     * - Asigna los responsables comercial y técnico, ya sea proporcionados como parámetros o por defecto desde la cuenta.
     * - Guarda la nueva oportunidad en la base de datos.
     *
     * @param accountId - El identificador de la cuenta asociada a la oportunidad.
     * @param name - El nombre de la oportunidad comercial.
     * @param requirements - Una lista de requisitos asociados a la oportunidad.
     * @param typologyId - El identificador de la tipología de la oportunidad.
     *
     * @returns Una instancia del DTO de la oportunidad recién creada.
     * @throws {AppError} Si ya existe una oportunidad con el mismo nombre para la misma cuenta (400).
     * @throws {AppError} Si ocurre un error al crear la oportunidad o al obtener los datos necesarios (500).
    
     */
    async createOpportunity(accountId, name, requirements, typologyId) {
        // Obtener cuenta
        const account = await account_service_1.accountService.getAccountById(accountId, ['commercialManager', 'technicalManager']);
        // Obtener tipologia 
        const typology = await typology_service_1.typologyService.getTypologyById(typologyId);
        // Comprobar si existe oportunidad con el mismo nombre
        const checkSameName = await opportunity_repository_1.opportunityRepo.findOne({
            where: {
                name: name
            },
            relations: ['account']
        });
        if (checkSameName && checkSameName.account.id === account.id) {
            throw new AppError_1.AppError('Ya existe una oportunidad comercial con el mismo nombre para la cuenta especificada', 400);
        }
        // Asignar responsable comercial por defecto (el responsable comercial de la cuenta)
        const commercialManager = account.commercialManager;
        // Asignar responsable técnico por defecto (si existe, responsable técnico de la cuenta)
        const technicalManager = account.technicalManager;
        const opportunity = new Opportunity_1.Opportunity(account, name, requirements, typology, commercialManager, technicalManager);
        const savedOpportunity = await opportunity_repository_1.opportunityRepo.save(opportunity);
        return (0, class_transformer_1.plainToInstance)(opportunity_dto_1.OpportunityDTO, savedOpportunity);
    }
    /**
     * Obtiene una oportunidad comercial por su ID.
     *
     * @param id - El identificador único de la oportunidad comercial.
     * @param relations - (Opcional) Una lista de relaciones a cargar junto con la oportunidad.
     * @returns La oportunidad comercial encontrada, incluyendo las relaciones especificadas.
     * @throws {AppError} Si no se encuentra la oportunidad (404).
     * @throws {AppError} Si ocurre un error durante la operación (500).
     */
    async getById(id, relations) {
        try {
            const opportunity = await opportunity_repository_1.opportunityRepo.findOne({
                where: { id: id },
                relations: relations
            });
            if (!opportunity) {
                throw new AppError_1.AppError('La oportunidad no ha sido encontrada', 404);
            }
            return opportunity;
        }
        catch (err) {
            throw new AppError_1.AppError('Error al obtener la oportunidad comercial', 500);
        }
    }
    /**
     * Elimina una oportunidad comercial.
     *
     * La función realiza las siguientes comprobaciones antes de proceder a la eliminación:
     * - Verifica que la oportunidad esté en estado "PENDING", ya que las oportunidades ganadas o perdidas no pueden eliminarse.
     * - Comprueba que no existan documentos adjuntos a la oportunidad. Si la oportunidad tiene documentos, estos deben ser borrados antes de
     * eliminar la oportunidad.
     * Si ambas condiciones son satisfactorias, la oportunidad se elimina de la base de datos.
     *
     * @param opportunityId - El identificador de la oportunidad que se desea eliminar.
     *
     * @returns Un mensaje de éxito si la eliminación es exitosa.
     * @throws {AppError} Si la oportunidad no puede ser eliminada debido a su estado o si contiene documentos adjuntos (403).
     * @throws {AppError} Si ocurre un error al intentar eliminar la oportunidad (500).
     */
    async deleteOpportunity(opportunityId) {
        const opportunity = await this.getById(opportunityId, ['documents']);
        if (opportunity.status !== OpportunityStatus_1.OpportunityStatus.PENDING) {
            throw new AppError_1.AppError('Las oportunidades ganadas o perdidas no pueden ser eliminadas', 403);
        }
        else if (opportunity.documents && opportunity.documents.length > 0) {
            throw new AppError_1.AppError('La oportunidad no puede ser eliminada mientras contenga documentos adjuntos', 403);
        }
        const deleteResult = await opportunity_repository_1.opportunityRepo.delete(opportunity.id);
        if (deleteResult.affected && deleteResult.affected > 0) {
            return { message: `Se ha eliminado con éxito la oportunidad: '${opportunity.name}'` };
        }
        else {
            throw new AppError_1.AppError(`No se ha podido eliminar la oportunidad: '${opportunity.name}'`, 500);
        }
    }
    /**
     * Actualiza los detalles de una oportunidad comercial existente.
     *
     * La función permite actualizar uno o varios de los siguientes atributos de la oportunidad:
     * - Nombre de la oportunidad.
     * - Requisitos asociados a la oportunidad.
     *
     * La oportunidad se obtiene por su identificador y, si se proporcionan valores para los campos correspondientes,
     * estos se asignan a la oportunidad. Después de realizar las modificaciones, la oportunidad se guarda en la base de datos.
     *
     * @param id - El identificador de la oportunidad que se desea actualizar.
     * @param name - (Opcional) El nuevo nombre de la oportunidad.
     * @param requirements - (Opcional) Los nuevos requisitos asociados a la oportunidad.
     *
     * @returns Una instancia del DTO de la oportunidad actualizada.
     * @throws {AppError} Si ocurre un error al intentar actualizar la oportunidad (500).
     */
    async updateOpportunity(id, name, requirements) {
        // Obtener oportunidad y desencriptar id
        const opportunityEntity = await this.getById(id);
        // Asignacion de  nombre
        if (name) {
            opportunityEntity.name = name;
        }
        // Asignación de requisitos
        if (requirements) {
            opportunityEntity.requirements = requirements;
        }
        const updatedOpportunity = await opportunity_repository_1.opportunityRepo.save(opportunityEntity);
        // Comprobación de actualización de oportunidad y error inesperado
        if (!updatedOpportunity) {
            throw new AppError_1.AppError('Ha ocurrido un error al modificar los datos de la oportunidad', 500);
        }
        return (0, class_transformer_1.plainToClass)(opportunity_dto_1.OpportunityDTO, updatedOpportunity);
    }
    /**
     * Obtiene las estimaciones asociadas a una oportunidad comercial.
     *
     * La función obtiene una oportunidad comercial por su identificador y recupera las estimaciones asociadas
     * a través de las propuestas relacionadas. Luego, utiliza un servicio para obtener las estimaciones detalladas
     * asociadas a la oportunidad.
     *
     * @param opportunityId - El identificador de la oportunidad cuya estimación se desea obtener.
     *
     * @returns Una lista de DTOs de estimaciones asociadas a la oportunidad.
     * @throws {AppError} Si ocurre un error al obtener la oportunidad o las estimaciones (500).
     */
    async getOpportunityEstimations(opportunityId) {
        const opportunity = await this.getById(opportunityId, ['proposals.estimation']);
        const estimations = await estimation_service_1.estimationService.getEstimationsByOpportunity(opportunity);
        return estimations;
    }
    /**
    * Obtiene las propuestas asociadas a una oportunidad comercial.
    *
    * La función obtiene una oportunidad comercial por su identificador y recupera las propuestas asociadas
    * junto con sus estimaciones.
    *
    * @param opportunityId - El identificador de la oportunidad cuyas propuestas se desean obtener.
    *
    * @returns Una lista de DTOs de propuestas asociadas a la oportunidad.
    * @throws {AppError} Si ocurre un error al obtener la oportunidad o las propuestas (500).
    */
    async getOpportunityProposals(opportunityId) {
        const opportunity = await this.getById(opportunityId, ['proposals', 'proposals.estimation']);
        const proposals = (0, class_transformer_1.plainToInstance)(proposal_dto_1.ProposalDTO, opportunity.proposals);
        return proposals;
    }
    /**
     * Actualiza el estado de una oportunidad comercial.
     *
     * Esta función permite actualizar el estado de una oportunidad comercial.
     * Si la oportunidad no está en estado "PENDING", solo los usuarios con el permiso "manage opportunity" pueden
     * realizar la actualización. En caso de que el estado se cambie a "WON", se verifica si la propiedad isCustomer
     * de la cuenta asociada a la oportunidad debe ser actualizada a "true". Si la oportunidad no tiene ninguna propuesta asociada finalizada,
     * no será posible actualizar el estado.
     *
     * @param opportunityId - El identificador de la oportunidad que se desea actualizar.
     * @param status - El nuevo estado de la oportunidad.
     * @param user - El usuario que está intentando realizar la actualización.
     *
     * @returns El DTO de la oportunidad actualizada.
     * @throws {AppError} Si el estado proporcionado no es válido (400).
     * @throws {AppError} Si el usuario no tiene permisos para actualizar el estado de la oportunidad (403).
     */
    async updateStatus(opportunityId, status, user) {
        const opportunityEntity = await this.getById(opportunityId, ['proposals']);
        const opportunity = (0, class_transformer_1.plainToInstance)(Opportunity_1.Opportunity, opportunityEntity);
        if (!Object.values(OpportunityStatus_1.OpportunityStatus).includes(status)) {
            throw new AppError_1.AppError('El status proporcionado no es válido', 400);
        }
        // Comprobamos que el estado de la oportunidad no se haya definido previamente. En cuyo caso solo podrá actualizar su estado usuario con permisos manage opportuntiy
        if (!opportunity.isPending() && !await (0, authorization_utility_1.checkAuthorization)(user, 'manage', 'opportunity')) {
            throw new AppError_1.AppError('No tienes los permisos necesarios para actualizar una oportundidad definida', 403);
        }
        // Comprobamos que la oportunidad tenga al menos una propuesta finalizada
        if (!opportunity.proposals.some(p => { return p.status === ProposalStatus_1.ProposalStatus.DONE; })) {
            throw new AppError_1.AppError('No es posible determinar el estado de una oportunidad sin una propuesta finalizada', 400);
        }
        opportunity.status = status;
        // Guardar la oportunidad actualizada
        await opportunity_repository_1.opportunityRepo.save(opportunity);
        // Si el opportunity status es WON, comprobamos si la cuenta asociada es prospecto para saber si cambiarla
        if (opportunity.status === OpportunityStatus_1.OpportunityStatus.WON) {
            const account = await account_repository_1.accountRepo.findOne({
                where: {
                    opportunities: {
                        id: opportunity.id
                    }
                },
                relations: ['opportunities']
            });
            if (account && !account.isCustomer) {
                account.isCustomer = true;
                await account_repository_1.accountRepo.save(account);
            }
        }
        return (0, class_transformer_1.plainToInstance)(opportunity_dto_1.OpportunityDTO, opportunity);
    }
    /**
     * Obtiene una lista de oportunidades para un usuario, aplicando filtros según los permisos del usuario.
     *
     * La función verifica los permisos del usuario para determinar a que oportunidades y propuestas puede acceder.
     * Los permisos son verificados para las oportunidades y las propuestas asociadas, y los campos sensibles
     * de las propuestas son filtrados antes de ser devueltas.
     *
     * @param user - El usuario que solicita las oportunidades, utilizado para verificar sus permisos.
     * @param offset - Número de registro a partir del cual se devuelven los resultados
     * @param limit - Número de registros devueltos a partir del offset
     * @returns Una lista de oportunidades filtradas con sus respectivas propuestas, según los permisos del usuario.
     * @throws {AppError} Si ocurre un error al verificar los permisos o al recuperar las oportunidades.
     *
     */
    async getOpportunities(user, offset, limit) {
        const offsetNum = offset ? parseInt(offset, 10) : undefined;
        const limitNum = limit ? parseInt(limit, 10) : undefined;
        let opportunities = await opportunity_repository_1.opportunityRepo.findOrderedByStatus(offsetNum, limitNum);
        // Cargamos permisos
        const hasReadProposal = await (0, authorization_utility_1.checkAuthorization)(user, 'read', 'proposal');
        const hasReadSelfProposal = await (0, authorization_utility_1.checkAuthorization)(user, 'readSelf', 'proposal');
        const hasReadOpportunity = await (0, authorization_utility_1.checkAuthorization)(user, 'read', 'opportunity');
        // Filtramos oportunidades en funcion de permisos de usuario
        if (!hasReadOpportunity) {
            opportunities = (await Promise.all(opportunities.map(async (opportunity) => {
                const isValid = await exports.opportunityService.checkRelatedUser(user, opportunity.id);
                return isValid ? opportunity : null;
            }))).filter(opportunity => opportunity !== null);
        }
        // Comprobamos si el usuario tiene algún acceso de lectura a Propuestas
        // En caso de ser no tener readProposal, comprobamos si existe alguna propuesta que pueda leer el usuario
        if (!hasReadProposal) {
            await Promise.all(opportunities.map(async (opportunity) => {
                opportunity.proposals = (await Promise.all(opportunity.proposals.map(async (proposal) => {
                    const isValid = await proposal_service_1.proposalService.checkRelatedUser(user, proposal.id);
                    return isValid ? proposal : null;
                }))).filter(proposal => proposal !== null);
            }));
        }
        // Filtramos datos sensibles de propuestas en el envío
        await Promise.all(opportunities.map(async (opportunity) => {
            if (opportunity.proposals && opportunity.proposals.length > 0) {
                const filteredProposals = await proposal_service_1.proposalService.filterSpecialFields(user, opportunity.proposals);
                opportunity.proposals = Array.isArray(filteredProposals) ? filteredProposals : [filteredProposals];
            }
        }));
        const opportunitiesDTO = (0, class_transformer_1.plainToInstance)(opportunity_dto_1.OpportunityDTO, opportunities);
        // Si el usuario no tiene ningún permiso read proposal se eliminan del DTO
        if (!hasReadProposal && !hasReadSelfProposal) {
            opportunitiesDTO.forEach(opportunity => {
                delete opportunity.proposals;
            });
        }
        return opportunitiesDTO;
    }
    /**
     * Comprueba si un usuario está relacionado con una oportunidad comercial.
     *
     * Esta función verifica si un usuario es responsable técnico o comercial de la oportunidad o de la cuenta asociada.
     * También se comprueba si el usuario está asignado a una estimación asociada a la propuesta de la oportunidad.
     * La función devuelve un valor booleano que indica si el usuario tiene alguna relación con la oportunidad.
     *
     * @param user - El usuario que se desea verificar si está relacionado con la oportunidad.
     * @param opportunityId - El identificador de la oportunidad que se desea comprobar.
     *
     * @returns `true` si el usuario es responsable técnico o comercial de la oportunidad o cuenta asociada,
     *          o si está asignado a alguna estimación de la propuesta asociada a la oportunidad.
     *          De lo contrario, devuelve `false`.
     */
    async checkRelatedUser(user, opportunityId) {
        const opportunity = await this.getById(opportunityId, ['commercialManager', 'technicalManager',
            'account.technicalManager', 'account.commercialManager', 'proposals.estimation.estimationUsers.user']);
        const account = opportunity.account;
        const isAccountManager = account.technicalManager.id === user.id || account.commercialManager.id === user.id;
        const isOpportunityManager = opportunity.technicalManager.id === user.id || opportunity.commercialManager.id === user.id;
        // Determinamos si esta relacionado con la estimación
        const proposal = opportunity.proposals.find(p => p.status !== ProposalStatus_1.ProposalStatus.DONE);
        const estimationUserIds = proposal?.estimation?.users.map(user => { return user.id; });
        let isAssigned = false;
        if (estimationUserIds && estimationUserIds.length > 0) {
            isAssigned = estimationUserIds.includes(user.id);
        }
        return isAccountManager || isOpportunityManager || isAssigned;
    }
    /**
    * Asigna un responsable comercial a una oportunidad comercial.
    *
    * Esta función permite asignar un nuevo responsable comercial a una oportunidad. Se verifica que la oportunidad y el
    * responsable comercial existan antes de realizar la asignación. Si se produce algún error durante el proceso,
    * se lanza una excepción.
    *
    * @param opportunityId - El identificador de la oportunidad a la que se le asignará un nuevo responsable comercial.
    * @param commercialManagerId - El identificador del usuario que se asignará como responsable comercial de la oportunidad.
    *
    * @throws {AppError} Si ocurre un error al intentar asignar al responsable comercial (500).
    */
    async assignCommercialManager(opportunityId, commercialManagerId) {
        try {
            const opportunity = await exports.opportunityService.getById(opportunityId, ['commercialManager', 'proposals.estimation']);
            // Asignamos responsable comercial de oportunidad
            const newCommercialManager = await user_service_1.userService.getUserById(commercialManagerId);
            opportunity.commercialManager = newCommercialManager;
            await opportunity_repository_1.opportunityRepo.save(opportunity);
        }
        catch (err) {
            throw new AppError_1.AppError('No ha sido posible asignar al responsable comercial de la oportunidad', 500);
        }
    }
    /**
    * Asigna un responsable técnico a una oportunidad comercial.
    *
    * Esta función permite asignar un nuevo responsable técnico a una oportunidad. Se verifica que la oportunidad y el
    * responsable técnico existan antes de realizar la asignación. Si se produce algún error durante el proceso,
    * se lanza una excepción.
    *
    * @param opportunityId - El identificador de la oportunidad a la que se le asignará un nuevo responsable técnico.
    * @param technicalManagerId - El identificador del usuario que se asignará como responsable técnico de la oportunidad.
    *
    * @throws {AppError} Si ocurre un error al intentar asignar al responsable técnico (500).
    */
    async assignTechnicalManager(opportunityId, technicalManagerId) {
        try {
            const opportunity = await exports.opportunityService.getById(opportunityId, ['technicalManager', 'proposals.estimation']);
            const newTechnicalManager = await user_service_1.userService.getUserById(technicalManagerId);
            opportunity.technicalManager = newTechnicalManager;
            await opportunity_repository_1.opportunityRepo.save(opportunity);
        }
        catch (err) {
            throw new AppError_1.AppError('No ha sido posible asignar al responsable técnico de la oportunidad', 500);
        }
    }
}
exports.OpportunityService = OpportunityService;
exports.opportunityService = new OpportunityService();
