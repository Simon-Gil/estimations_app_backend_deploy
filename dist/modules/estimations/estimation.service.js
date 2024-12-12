"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimationService = exports.EstimationService = void 0;
const class_transformer_1 = require("class-transformer");
const estimation_entity_1 = require("./estimation.entity");
const AppError_1 = require("./../../common/utils/AppError");
const estimation_repository_1 = require("./estimation.repository");
const settings_service_1 = require("./../settings/settings.service");
const EstimationStatus_1 = require("./EstimationStatus");
const estimation_utility_1 = require("./estimation.utility");
const estimation_detail_dto_1 = require("./dtos/estimation-detail.dto");
const task_dto_1 = require("./task/dtos/task.dto");
const estimation_dto_1 = require("./../estimations/dtos/estimation.dto");
const email_service_1 = require("../notifications/email.service");
const user_repository_1 = require("./../user/user.repository");
const GeneralStatus_1 = require("./../../common/utils/GeneralStatus");
const proposal_service_1 = require("./../proposal/proposal.service");
const authorization_utility_1 = require("./../../common/utils/authorization.utility");
const ProposalStatus_1 = require("./../proposal/ProposalStatus");
const proposal_repository_1 = require("./../proposal/proposal.repository");
/**
 * Servicio para gestionar las operaciones relacionadas con las estimaciones.
 */
class EstimationService {
    /**
     * Crea una nueva estimación asociada a una propuesta específica.
     *
     * @param proposalId - Identificador único de la propuesta para la cual se creará la estimación.
     * @returns Una promesa que resuelve con un objeto `FinalEstimationDTO` que representa la estimación creada.
     * @throws `AppError` si ya existe una estimación asociada a la propuesta.
     */
    async createEstimation(proposalId) {
        // Obtenemos la oportunidad
        const proposal = await proposal_service_1.proposalService.getById(proposalId, [
            'estimation', 'opportunity.commercialManager', 'opportunity.technicalManager', 'opportunity.account', 'opportunity.account.technicalManager', 'opportunity.account.commercialManager'
        ]);
        if (proposal.estimation) {
            throw new AppError_1.AppError('Ya existe una estimación para la propuesta', 403);
        }
        let estimation = new estimation_entity_1.EstimationEntity();
        // Propuesta
        estimation.proposal = proposal;
        //Guardado de la estimacion
        const savedEstimation = await estimation_repository_1.estimationRepo.save(estimation);
        return (0, class_transformer_1.plainToInstance)(estimation_detail_dto_1.EstimationDetailDTO, savedEstimation);
    }
    /**
     * Marca una estimación como completada, actualizando su estado y el de la propuesta asociada.
     * Si está configurado, envía un correo electrónico al Director Comercial notificando el cambio.
     *
     * @param estimationId - Identificador único de la estimación a completar.
     * @returns Una promesa que resuelve con un objeto `EstimationDTO` que representa la estimación completada.
     * @throws `AppError` si existen tareas pendientes en la estimación.
     */
    async completeEstimation(estimationId) {
        const estimation = await this.getById(estimationId, ['tasks', 'proposal']);
        // Comprobamos que la estimación no haya sido ya finalizada
        if (estimation.status === EstimationStatus_1.EstimationStatus.DONE) {
            throw new AppError_1.AppError('La estimación ya ha sido finalizada', 400);
        }
        // Comprobamos que no haya tareas sin finalizar antes de actualizar estado de estimación
        const unfinishedTasks = estimation.tasks.some(task => task.status === GeneralStatus_1.GeneralStatus.PENDING);
        if (unfinishedTasks) {
            throw new AppError_1.AppError('No es posible finalizar la estimación mientras haya tareas pendientes', 404);
        }
        // Actualizamos status de estimation y proposal
        estimation.status = EstimationStatus_1.EstimationStatus.DONE;
        estimation.proposal.status = ProposalStatus_1.ProposalStatus.READY_FOR_VALIDATION;
        await proposal_repository_1.proposalRepo.save(estimation.proposal);
        const doneEstimation = await estimation_repository_1.estimationRepo.save(estimation);
        const commercialDirector = await user_repository_1.userRepo.createQueryBuilder('user')
            .leftJoinAndSelect('user.department', 'department')
            .leftJoinAndSelect('user.grade', 'grade')
            .leftJoinAndSelect('user.roles', 'roles')
            .where('department.name = :departmentName', { departmentName: 'Comercial' })
            .andWhere('grade.name = :gradeName', { gradeName: 'Director' })
            .andWhere('roles.name = :roleName', { roleName: 'Director Comercial' })
            .getOne();
        // Comprobamos configuración de email
        const sendEmail = (await settings_service_1.settingsService.getSettings()).sendDoneEstimationEmail;
        if (commercialDirector && sendEmail) {
            await email_service_1.emailService.sendDoneEstimationEmail(commercialDirector.email, estimation.proposal, commercialDirector.name, commercialDirector.lastname);
        }
        const estimationDTO = (0, class_transformer_1.plainToClass)(estimation_dto_1.EstimationDTO, doneEstimation);
        return estimationDTO;
    }
    /**
     * Obtiene una lista de estimaciones.
     * - Si se proporciona un usuario, se retornan las estimaciones en las que el usuario está implicado.
     * - Si no se proporciona un usuario, se retornan todas las estimaciones.
     *
     * @param user - (Opcional) Usuario para filtrar las estimaciones asociadas a este.
     * @returns Una promesa que resuelve con un array de objetos `EstimationDTO` que representan las estimaciones.
     */
    async getEstimations(user) {
        let estimations;
        if (user) {
            estimations = await estimation_repository_1.estimationRepo.find({
                where: {
                    estimationUsers: {
                        user: {
                            id: user.id,
                        },
                    },
                },
                relations: ['estimationUsers.user'],
            });
        }
        else {
            estimations = await estimation_repository_1.estimationRepo.find();
        }
        return (0, class_transformer_1.plainToInstance)(estimation_dto_1.EstimationDTO, estimations);
    }
    /**
     * Obtiene los detalles de una estimación específica sin incluir información sobre los costes.
     * - Procesa los datos de la estimación para estructurarlos antes de retornarlos.
     *
     * @param estimationId - ID de la estimación a obtener.
     * @returns Una promesa que resuelve con los detalles estructurados de la estimación como `FinalEstimationDTO`.
     */
    async getEstimationDetail(estimationId, user) {
        let estimation;
        let processedEstimation;
        if (await (0, authorization_utility_1.checkAuthorization)(user, 'readPriceConfig', 'account')) {
            estimation = await this.getById(estimationId, [
                'proposal.opportunity.account.priceConfig.profilePrices',
                'tasks.hrsTaskProfiles.profile',
                'tasks.secondLevelCategory.firstLevelCategory',
                'estimationUsers.user',
                'proposal.opportunity.technicalManager',
                'proposal.opportunity.commercialManager',
            ]);
            processedEstimation = await estimation_utility_1.estimationUtility.processEstimation(estimation, true);
        }
        else {
            estimation = await this.getById(estimationId, [
                'tasks',
                'tasks.hrsTaskProfiles',
                'estimationUsers.user',
                'tasks.hrsTaskProfiles.profile',
                'tasks.secondLevelCategory.firstLevelCategory',
                'proposal', 'proposal.opportunity.commercialManager',
                'proposal.opportunity.technicalManager'
            ]);
            processedEstimation = await estimation_utility_1.estimationUtility.processEstimation(estimation, false);
        }
        return (0, class_transformer_1.plainToInstance)(estimation_detail_dto_1.EstimationDetailDTO, processedEstimation);
    }
    /**
     * Obtiene una estimación por su ID, incluyendo las relaciones opcionales especificadas.
     * - Lanza un error si no se encuentra la estimación.
     *
     * @param id - ID de la estimación.
     * @param relations - (Opcional) Lista de relaciones a incluir en la consulta.
     * @returns Una promesa que resuelve con la estimación encontrada.
     */
    async getById(id, relations) {
        try {
            const estimation = await estimation_repository_1.estimationRepo.findOne({
                where: { id: id },
                relations: relations
            });
            if (!estimation) {
                throw new AppError_1.AppError('La estimación no ha sido encontrada', 404);
            }
            return estimation;
        }
        catch (err) {
            console.log('ERRROR AQUI:', err);
            throw new AppError_1.AppError('Error al obtener la estimación', 500);
        }
    }
    /**
     * Obtiene una lista de estimaciones asociadas a una oportunidad específica.
     * - Convierte las estimaciones en su representación `EstimationDTO`.
     *
     * @param opportunity - Instancia de la entidad `OpportunityEntity` relacionada con las estimaciones.
     * @returns Una promesa que resuelve con un array de estimaciones como `EstimationDTO[]`.
     */
    async getEstimationsByOpportunity(opportunity) {
        const estimations = opportunity.estimations;
        const estimationsDTO = (0, class_transformer_1.plainToInstance)(estimation_dto_1.EstimationDTO, estimations);
        return estimationsDTO;
    }
    /**
     * Obtiene las tareas asociadas a una estimación específica, verificando los permisos del usuario.
     * - Si el usuario no tiene permisos generales, se valida su relación con la estimación.
     * - Lanza un error si el usuario no tiene autorización.
     *
     * @param estimationId - ID de la estimación.
     * @param user - Usuario actual cuya autorización será verificada.
     * @returns Una promesa que resuelve con las tareas de la estimación como `TaskDTO[]`.
     */
    async getEstimationTasks(estimationId, user) {
        const estimation = await this.getById(estimationId, ['tasks.hrsTaskProfiles.profile', 'estimationUsers']);
        if (!(0, authorization_utility_1.checkAuthorization)(user, 'read', 'estimation')) {
            const relatedUserIds = estimation.estimationUsers.map(eu => {
                return eu.userId;
            });
            const isRelated = relatedUserIds.includes(user.id);
            if (!isRelated) {
                throw new AppError_1.AppError('No tienes los permisos necesarios para realizar esta acción', 403);
            }
        }
        return (0, class_transformer_1.plainToInstance)(task_dto_1.TaskDTO, estimation.tasks);
    }
    /**
 * Obtiene el responsable técnico asociado a una estimación específica.
 * - Lanza un error si la estimación no es encontrada.
 *
 * @param estimationId - ID de la estimación.
 * @returns Una promesa que resuelve con el usuario responsable técnico (`UserEntity`).
 */
    async getTechnicalManager(estimationId) {
        const estimation = await this.getById(estimationId, [
            'proposal.opportunity.technicalManager'
        ]);
        if (!estimation) {
            throw new AppError_1.AppError('No se ha encontrado la estimación', 404);
        }
        return estimation.proposal.opportunity.technicalManager;
    }
    /**
     * Elimina una estimación específica.
     * - Lanza un error si la estimación está en un estado no eliminable.
     * - Verifica que la eliminación sea exitosa antes de retornar un mensaje de éxito.
     *
     * @param estimationId - ID de la estimación a eliminar.
     * @returns Una promesa que resuelve con un mensaje de confirmación.
     */
    async deleteEstimation(estimationId) {
        const estimation = await this.getById(estimationId);
        if (estimation.status !== EstimationStatus_1.EstimationStatus.PENDING) {
            throw new AppError_1.AppError('Las estimaciones finalizadas o listas para validación no pueden ser eliminadas', 403);
        }
        const deleteResult = await estimation_repository_1.estimationRepo.delete(estimation.id);
        if (deleteResult.affected && deleteResult.affected > 0) {
            return { message: `La estimación ha sido eliminada con éxito` };
        }
        else {
            throw new AppError_1.AppError(`No se ha podido eliminar la estimación'`, 500);
        }
    }
}
exports.EstimationService = EstimationService;
exports.estimationService = new EstimationService();
