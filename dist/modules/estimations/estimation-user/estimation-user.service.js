"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimationUserService = exports.EstimationUserService = void 0;
const class_transformer_1 = require("class-transformer");
const user_dto_1 = require("../../user/dtos/user.dto");
const estimation_user_entity_1 = require("./estimation-user.entity");
const AppError_1 = require("../../../common/utils/AppError");
const estimation_user_repository_1 = require("./estimation-user.repository");
const email_service_1 = require("../../notifications/email.service");
const estimation_service_1 = require("./../estimation.service");
const settings_service_1 = require("../../settings/settings.service");
const user_service_1 = require("../../user/user.service");
/**
 * Servicio para gestionar la relación entre usuarios y estimaciones.
 */
class EstimationUserService {
    /**
     * Marca como finalizada la estimación por parte de un usuario y, si está configurado, envía un correo
     * de notificación al responsable técnico de la estimación.
     *
     * @param estimationId - Identificador único de la estimación.
     * @param userId - Identificador único del usuario asociado a la estimación.
     * @returns Una promesa que resuelve con la entidad `EstimationUserEntity` actualizada.
     * @throws `AppError` si no se encuentra la relación entre usuario y estimación.
     */
    async finishEstimation(estimationId, userId) {
        const estimationUser = await this.getByIds(estimationId, userId);
        estimationUser.finished = true;
        const estimationUserFinished = await estimation_user_repository_1.estimationUserRepo.save(estimationUser);
        const sendEmail = (await settings_service_1.settingsService.getSettings()).sendUserFinishedEmail;
        // Enviar email en función de la configuración
        if (sendEmail) {
            const estimationTechManager = await estimation_service_1.estimationService.getTechnicalManager(estimationUser.estimationId);
            const user = await user_service_1.userService.getUserById(userId);
            const estimation = await estimation_service_1.estimationService.getById(estimationId, ['proposal']);
            await email_service_1.emailService.sendUserFinishedEstimation(estimationTechManager.email, estimationTechManager.name, user.name, estimation.proposal);
        }
        return estimationUserFinished;
    }
    /**
     * Obtiene la relación entre un usuario y una estimación mediante sus identificadores.
     *
     * @param estimationId - Identificador único de la estimación.
     * @param userId - Identificador único del usuario asociado a la estimación.
     * @returns Una promesa que resuelve con la entidad `EstimationUserEntity` correspondiente.
     * @throws `AppError` si no se encuentra la relación entre usuario y estimación.
     */
    async getByIds(estimationId, userId) {
        const estimationUser = await estimation_user_repository_1.estimationUserRepo.findOne({
            where: {
                userId: userId,
                estimationId: estimationId
            }
        });
        if (!estimationUser) {
            throw new AppError_1.AppError('No se ha encontrado la relación estimación-usuario solicitada', 404);
        }
        return estimationUser;
    }
    /**
 * Asigna una lista de usuarios a una estimación específica.
 * - Verifica si ya existe una relación previa entre la estimación y los usuarios.
 * - Crea nuevas relaciones si no existen previamente.
 * - Opcionalmente, envía un correo de notificación a los usuarios asignados dependiendo de la configuración.
 *
 * @param userIds - Lista de IDs de los usuarios que serán asignados a la estimación.
 * @param estimationId - ID de la estimación a la cual se asignarán los usuarios.
 * @returns Una promesa que resuelve con la estimación actualizada que incluye las relaciones asignadas.
 */
    async assignUsersToEstimation(userIds, estimationId) {
        let estimation = await estimation_service_1.estimationService.getById(estimationId, ['estimationUsers.user', 'proposal']);
        const estimationUsers = [];
        await Promise.all(userIds.map(async (userId) => {
            const user = await user_service_1.userService.getUserById(userId);
            // Verifica si la relación ya existe en la tabla de relación estimationUsers
            const existingRelation = await estimation_user_repository_1.estimationUserRepo.findOne({
                where: {
                    estimationId: estimation.id,
                    userId: user.id
                }
            });
            if (!existingRelation) {
                const estimationUser = new estimation_user_entity_1.EstimationUserEntity();
                estimationUser.estimationId = estimation.id;
                estimationUser.userId = user.id;
                estimationUser.user = user;
                estimationUser.estimation = estimation;
                estimationUser.finished = false;
                estimationUsers.push(estimationUser);
            }
            else {
                console.log('El usuario ya está asignado a esta estimación: ', user.name);
            }
        }));
        await estimation_user_repository_1.estimationUserRepo.save(estimationUsers);
        // Comprobamos configuracion email para determinar si se envía
        const sendEmail = (await settings_service_1.settingsService.getSettings()).sendAssignedUserEmail;
        if (sendEmail) {
            await Promise.all(estimationUsers.map(eu => email_service_1.emailService.sendAssignedToEstimationEmail(eu.user.email, estimation.proposal, eu.user.name, eu.user.lastname)));
        }
        return estimation;
    }
    /**
     * Elimina la relación entre un usuario y una estimación específica.
     * - Actualiza la lista de usuarios asignados a la estimación.
     * - Lanza un error si la nueva lista no puede ser guardada correctamente.
     *
     * @param estimationId - ID de la estimación de la que se eliminará la relación.
     * @param userId - ID del usuario cuya relación con la estimación será eliminada.
     * @returns Una promesa que resuelve con un array de `UserDTO` que representa los usuarios actualizados en la estimación.
     */
    async deleteUsersFromEstimation(estimationId, userId) {
        const estimation = await estimation_service_1.estimationService.getById(estimationId, ['estimationUsers.user']);
        await estimation_user_repository_1.estimationUserRepo.delete({
            estimationId: estimation.id,
            userId: userId
        });
        const updatedEstimation = await estimation_service_1.estimationService.getById(estimationId, ['estimationUsers.user']);
        if (!updatedEstimation) {
            throw new AppError_1.AppError('Error en el guardado de la nueva lista de usuarios', 500);
        }
        return (0, class_transformer_1.plainToInstance)(user_dto_1.UserDTO, updatedEstimation.users);
    }
}
exports.EstimationUserService = EstimationUserService;
exports.estimationUserService = new EstimationUserService();
