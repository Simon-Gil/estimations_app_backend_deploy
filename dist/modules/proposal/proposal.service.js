"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proposalService = exports.ProposalService = void 0;
const class_transformer_1 = require("class-transformer");
const proposal_dto_1 = require("./proposal.dto");
const proposal_entity_1 = require("./proposal.entity");
const AppError_1 = require("../../common/utils/AppError");
const proposal_repository_1 = require("./proposal.repository");
const opportunity_service_1 = require("../opportunity/opportunity.service");
const authorization_utility_1 = require("../../common/utils/authorization.utility");
const ProposalStatus_1 = require("./ProposalStatus");
const pdf_utility_1 = require("../file-generators/pdf.utility");
const OpportunityStatus_1 = require("../opportunity/OpportunityStatus");
const estimation_service_1 = require("./../estimations/estimation.service");
const date_utility_1 = require("../../common/utils/date.utility");
const settings_service_1 = require("../settings/settings.service");
const validator_utility_1 = require("../../common/utils/validator.utility");
const doc_utility_1 = require("../file-generators/doc.utility");
/**
 * Servicio encargado de gestionar las propuestas comerciales.
 */
class ProposalService {
    /**
     * Obtiene una propuesta comercial por su ID.
     * @param id - ID de la propuesta a buscar.
     * @param relations - Relaciones adicionales para cargar en la propuesta (opcional).
     * @returns La propuesta encontrada.
     * @throws {AppError} Si no se encuentra la propuesta o ocurre un error.
     */
    async getById(id, relations) {
        try {
            const proposal = await proposal_repository_1.proposalRepo.findOne({
                where: { id: id },
                relations: relations
            });
            if (!proposal) {
                throw new AppError_1.AppError('La propuesta no ha sido encontrada', 404);
            }
            return proposal;
        }
        catch (err) {
            throw new AppError_1.AppError('Error al obtener la propuesta comercial', 500);
        }
    }
    /**
     * Crea una nueva propuesta comercial asociada a una oportunidad.
     * @param opportunityId - ID de la oportunidad a la que se asociará la propuesta.
     * @param goalAndContext - Objetivo y contexto de la propuesta.
     * @param techProposal - Descripción de la propuesta tecnológica.
     * @returns La propuesta creada.
     * @throws {AppError} Si la oportunidad no está en estado pendiente o hay conflictos con propuestas existentes.
     */
    async createProposal(opportunityId, goalAndContext, techProposal) {
        const opportunity = await opportunity_service_1.opportunityService.getById(opportunityId, ['proposals']);
        // Validaciones 
        if (opportunity.status !== OpportunityStatus_1.OpportunityStatus.PENDING) {
            throw new AppError_1.AppError('Las propuestas solo pueden ser abiertas en oportunidades pendientes', 400);
        }
        opportunity.proposals.forEach(proposal => {
            if (proposal.techProposal === techProposal) {
                throw new AppError_1.AppError('El nombre de la propuesta tecnológica ya esta registrado en la oportunidad asociada', 400);
            }
            else if (proposal.status !== ProposalStatus_1.ProposalStatus.DONE) {
                throw new AppError_1.AppError('No es posible abrir otra propuesta mientras haya una activa en la oportunidad', 400);
            }
        });
        // Asignación de propiedades y guardado
        const proposal = new proposal_entity_1.ProposalEntity();
        proposal.name = opportunity.name;
        proposal.opportunity = opportunity;
        proposal.goalAndContext = goalAndContext;
        proposal.techProposal = techProposal;
        const savedProposal = await proposal_repository_1.proposalRepo.save(proposal);
        // Creación de estimación asociada a propuesta
        await estimation_service_1.estimationService.createEstimation(proposal.id); // Cambiar esto para que no se encripte cuando tengamos todo el cambio hecho
        return savedProposal;
    }
    /**
     * Obtiene todas las propuestas o las relacionadas con un usuario, si se proporciona el parámetro.
     * @param user - Usuario para el cual obtener las propuestas relacionadas (opcional).
     * @param offset - Número de registro a partir del cual se devuelven los resultados
     * @param limit - Número de registros devueltos a partir del offset
     * @returns Lista de propuestas relacionadas con el usuario o todas las propuestas si no se proporciona un usuario.
     */
    async getProposals(user, offset, limit) {
        const offsetNum = offset ? parseInt(offset, 10) : undefined;
        const limitNum = limit ? parseInt(limit, 10) : undefined;
        let proposals;
        if (user) {
            // Buscamos propuestas donde el usuario sea responsable técnico, comercial, o usuario asignado a estimación
            proposals = await proposal_repository_1.proposalRepo.findOrderedByStatus(user, offsetNum, limitNum);
        }
        else {
            proposals = await proposal_repository_1.proposalRepo.findOrderedByStatus(undefined, offsetNum, limitNum);
        }
        return (0, class_transformer_1.plainToInstance)(proposal_dto_1.ProposalDTO, proposals);
    }
    /**
     * Actualiza los detalles de una propuesta comercial.
     * @param proposalId - ID de la propuesta a actualizar.
     * @param techProposal - Nueva descripción de la propuesta tecnológica (opcional).
     * @param goalAndContext - Nuevo objetivo y contexto de la propuesta (opcional).
     * @returns La propuesta actualizada.
     */
    async updateProposal(proposalId, techProposal, goalAndContext) {
        const proposal = await this.getById(proposalId);
        proposal.techProposal = techProposal ? techProposal : proposal.techProposal;
        proposal.goalAndContext = goalAndContext ? goalAndContext : proposal.goalAndContext;
        const savedProposal = await proposal_repository_1.proposalRepo.save(proposal);
        return (0, class_transformer_1.plainToInstance)(proposal_dto_1.ProposalDTO, savedProposal);
    }
    /**
     * Finaliza una propuesta, cambiando su estado a 'DONE' y calculando la fecha de expiración.
     * @param proposalId - ID de la propuesta a finalizar.
     * @returns La propuesta finalizada.
     * @throws {AppError} Si la propuesta no está lista para validación o faltan campos necesarios.
     */
    async finishProposal(proposalId) {
        const proposal = await this.getById(proposalId, ['opportunity']);
        // Comprobamos que el estado de la propuesta sea ready for validation
        if (proposal.status !== ProposalStatus_1.ProposalStatus.READY_FOR_VALIDATION) {
            throw new AppError_1.AppError('Únicamente es posible finalizar una propuesta lista para validación', 400);
        }
        // Comprobamos que los campos especiales de propuesta tienen valor
        if (!proposal.estimatedMonths || proposal.estimatedMonths == null) {
            throw new AppError_1.AppError('Se requiere la estimación de meses para poder finalizar', 400);
        }
        else if (!proposal.total || proposal.total == null) {
            throw new AppError_1.AppError('Se requiere la estimación del monto total para poder finalizar', 400);
        }
        proposal.status = ProposalStatus_1.ProposalStatus.DONE;
        proposal.name = `${proposal.opportunity.name}_${date_utility_1.dateUtility.getFormattedCurrentDate()}`;
        // Calcular fecha de expiración 
        proposal.expDate = date_utility_1.dateUtility.getProposalExpDate(await settings_service_1.settingsService.getSettings());
        const savedProposal = await proposal_repository_1.proposalRepo.save(proposal);
        return (0, class_transformer_1.plainToInstance)(proposal_dto_1.ProposalDTO, savedProposal);
    }
    /**
     * Genera un PDF funcional para el cliente a partir de una propuesta.
     * @param proposalId - ID de la propuesta para generar el PDF.
     * @returns El PDF generado como un arreglo de bytes.
     * @throws {AppError} Si la propuesta no está finalizada.
     */
    async getClientFunctionalPDF(proposalId) {
        const proposal = await exports.proposalService.getById(proposalId, ['opportunity.account']);
        if (proposal.status !== ProposalStatus_1.ProposalStatus.DONE) {
            throw new AppError_1.AppError('No es posible generar el funcional de la propuesta mientras no se haya finalizado', 400);
        }
        const accountName = proposal.opportunity.account.name;
        const opportunityName = proposal.opportunity.name;
        const estimatedMonths = Math.round(proposal.estimatedMonths);
        const totalPrice = Math.round(proposal.total);
        const offerDate = new Date();
        const formattedOfferDate = `${offerDate.getDay()}.${offerDate.getMonth()}.${offerDate.getFullYear()}`;
        return (0, pdf_utility_1.generateClientFunctional)(totalPrice, estimatedMonths, accountName, opportunityName, formattedOfferDate, proposal.techProposal, proposal.goalAndContext);
    }
    /**
     * Genera un documento Word funcional para el cliente a partir de una propuesta.
     * @param proposalId - ID de la propuesta para generar el documento.
     * @returns El documento generado como un buffer o blob.
     * @throws {AppError} Si la propuesta no está finalizada.
     */
    async getClientFunctionalDOC(proposalId) {
        const proposal = await exports.proposalService.getById(proposalId, ['opportunity.account']);
        if (proposal.status !== ProposalStatus_1.ProposalStatus.DONE) {
            throw new AppError_1.AppError('No es posible generar el funcional de la propuesta mientras no se haya finalizado', 400);
        }
        const accountName = proposal.opportunity.account.name;
        const opportunityName = proposal.opportunity.name;
        const estimatedMonths = Math.round(proposal.estimatedMonths);
        const totalPrice = Math.round(proposal.total);
        const offerDate = new Date();
        const formattedOfferDate = `${offerDate.getDay()}.${offerDate.getMonth()}.${offerDate.getFullYear()}`;
        return await (0, doc_utility_1.generateDocx)(totalPrice, estimatedMonths, accountName, opportunityName, formattedOfferDate, proposal.techProposal, proposal.goalAndContext);
    }
    /**
     * Obtiene una propuesta por su ID y verifica los permisos del usuario para acceder a ella.
     * @param proposalId - ID de la propuesta a obtener.
     * @param user - Usuario que solicita la propuesta.
     * @returns La propuesta solicitada, o una excepción si el usuario no está autorizado.
     * @throws {AppError} Si el usuario no tiene acceso a la propuesta.
     */
    async relatedUserGetById(proposalId, user) {
        const proposal = await this.getById(proposalId, ['estimation.estimationUsers.user']);
        const proposalDTO = (0, class_transformer_1.plainToInstance)(proposal_dto_1.ProposalDTO, proposal);
        // Comprobamos autorizacion para obtener la propuesta
        if (!await (0, authorization_utility_1.checkAuthorization)(user, 'read', 'proposal')) {
            if (!await this.checkRelatedUser(user, proposalId)) {
                throw new AppError_1.AppError('No tienes acceso a la propuesta solicitada', 403);
            }
        }
        // Comprobamos autorización para obtener estimación de la propuesta
        if (!await (0, authorization_utility_1.checkAuthorization)(user, 'readSelf', 'estimation')) {
            delete proposalDTO.estimation;
        }
        // Eliminamos estimationUsers
        if (proposalDTO.estimation) {
            delete proposalDTO.estimation.estimationUsers;
        }
        return proposalDTO;
    }
    /**
     * Actualiza campos especiales de una propuesta, como el total y los meses estimados.
     * @param proposalId - ID de la propuesta a actualizar.
     * @param total - Nuevo monto total de la propuesta.
     * @param estimatedMonths - Nuevo número de meses estimados.
     * @returns La propuesta actualizada.
     * @throws {AppError} Si los valores recibidos son inválidos o la propuesta está pendiente.
     */
    async updateSpecialFields(proposalId, total, estimatedMonths) {
        const proposal = await this.getById(proposalId);
        // Validación de datos recibidos
        if (!validator_utility_1.Validator.isIntegerAndPositive(estimatedMonths)) {
            throw new AppError_1.AppError('Los meses introducidos deben ser un número entero positivo', 400);
        }
        if (!validator_utility_1.Validator.IsValidPrice(total)) {
            throw new AppError_1.AppError('Los el monto total introducido deben ser un número positivo', 400);
        }
        if (proposal.status === ProposalStatus_1.ProposalStatus.PENDING) {
            throw new AppError_1.AppError('No es posible actualizar campos especiales de una propuesta pendiente', 400);
        }
        proposal.total = total;
        if (total && total !== null) {
            proposal.total = total;
            ;
        }
        if (estimatedMonths && estimatedMonths !== null) {
            proposal.estimatedMonths = estimatedMonths;
        }
        const updatedProposal = await proposal_repository_1.proposalRepo.save(proposal);
        return (0, class_transformer_1.plainToInstance)(proposal_dto_1.ProposalDTO, updatedProposal);
    }
    /**
     * Deteremina si un usuario está relacionado con una propuesta.
     * @param user - Usuario a verificar.
     * @param proposalId - ID de la propuesta.
     * @returns true si el usuario está relacionado con la propuesta, false en caso contrario.
     */
    async checkRelatedUser(user, proposalId) {
        try {
            const proposal = await this.getById(proposalId, ['estimation.estimationUsers.user', 'opportunity.technicalManager', 'opportunity.commercialManager',
                'opportunity.account.technicalManager', 'opportunity.account.commercialManager'
            ]);
            let proposalUserIds;
            let isRelated = false;
            if (proposal.estimation && proposal.estimation.estimationUsers && proposal.estimation.estimationUsers.length > 0) {
                proposalUserIds = proposal.estimation.estimationUsers?.map(eu => { return eu.user.id; });
                isRelated = proposalUserIds.includes(user.id);
            }
            if (proposal.opportunity.technicalManager?.id === user.id || proposal.opportunity.commercialManager.id === user.id) {
                isRelated = true;
            }
            const account = proposal.opportunity.account;
            if (account.technicalManager?.id === user.id || account.commercialManager.id === user.id) {
                isRelated = true;
            }
            return isRelated;
        }
        catch (err) {
            console.log('Error en la comprobacion de relaciones entre el usuario y la propuesta evaluada', err);
            throw new AppError_1.AppError(`Error en la comprobación de relaciones entre el usuario y la propuesta evaluada`, 500);
        }
    }
    /**
     * Filtra los campos especiales de la propuesta en función de los permisos del usuario.
     * @param user - Usuario que solicita los datos.
     * @param data - Datos de la propuesta a filtrar.
     * @returns Los campos especiales filtrados.
     */
    async filterSpecialFields(user, data) {
        return await (0, authorization_utility_1.filterRetrievedFields)(user, 'readSpecialFields', 'proposal', data, ['total', 'estimatedMonths']);
    }
    /**
     * Elimina una propuesta si la oportunidad asociada está pendiente.
     * @param proposalId - ID de la propuesta a eliminar.
     * @returns Un mensaje de confirmación si se elimina la propuesta con éxito.
     * @throws {AppError} Si la propuesta no puede ser eliminada.
     */
    async deleteProposal(proposalId) {
        const proposal = await this.getById(proposalId, ['opportunity']);
        if (proposal.opportunity.status !== OpportunityStatus_1.OpportunityStatus.PENDING) {
            throw new AppError_1.AppError('Las propuestas asociadas a oportunidades ganadas o perdidas no pueden ser eliminadas', 400);
        }
        const deleteResult = await proposal_repository_1.proposalRepo.delete(proposal.id);
        if (deleteResult.affected && deleteResult.affected > 0) {
            return { message: `Se ha eliminado con éxito la propuesta: '${proposal.techProposal}'` };
        }
        else {
            throw new AppError_1.AppError(`No se ha podido eliminar la propuesta: '${proposal.techProposal}'`, 500);
        }
    }
}
exports.ProposalService = ProposalService;
exports.proposalService = new ProposalService();
