"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hrsTaskProfileService = exports.HrsTaskProfileService = void 0;
const hrs_task_profile_entity_1 = require("./hrs-task-profile.entity");
const hrs_task_profile_repository_1 = require("./hrs-task-profile.repository");
const profile_service_1 = require("../../../company-structure/profile/profile.service");
const task_service_1 = require("../task.service");
const AppError_1 = require("../../../../common/utils/AppError");
const class_transformer_1 = require("class-transformer");
const GeneralStatus_1 = require("../../../../common/utils/GeneralStatus");
const hrs_task_profile_dto_1 = require("./hrs-task-profile.dto");
/**
 * Servicio para gestionar las relaciones entre tareas y perfiles estimables, con horas mínimas y máximas.
 */
class HrsTaskProfileService {
    /**
     * Crea un nuevo HrsTaskProfile.
     * @param taskId - ID de la tarea a la que se asociará el perfil.
     * @param profileId - ID del perfil estimable que se asociará a la tarea.
     * @returns La entidad `HrsTaskProfileEntity` creada y guardada en la base de datos.
     * @throws {AppError} - Lanza error si la tarea asociada está finalizada
     */
    async createHrsTaskProfile(taskId, profileId) {
        const profile = await profile_service_1.profileService.getById(profileId);
        const task = await task_service_1.taskService.getById(taskId);
        if (task.status === GeneralStatus_1.GeneralStatus.DONE) {
            throw new AppError_1.AppError('No es posible asignar un perfil estimable a una tarea finalizada', 400);
        }
        const hrsTaskProfile = new hrs_task_profile_entity_1.HrsTaskProfileEntity();
        hrsTaskProfile.profile = profile;
        hrsTaskProfile.task = task;
        const savedHrsTaskProfile = await hrs_task_profile_repository_1.hrsTaskProfileRepo.save(hrsTaskProfile);
        return savedHrsTaskProfile;
    }
    /**
     * Actualiza las horas mínimas y máximas asignadas a un perfil estimable en una tarea.
     * El estado de la entidad se actualiza a 'done'.
     * @param taskId - ID de la tarea asociada.
     * @param profileId - ID del perfil estimable asociado.
     * @param hMin - Cantidad mínima de horas estimadas.
     * @param hMax - Cantidad máxima de horas estimadas.
     * @returns Un objeto `HrsTaskProfileDTO` con los datos actualizados del perfil estimable.
     * @throws AppError - Si los valores de horas son inválidos, si no se encuentra la relación, o si la tarea está finalizada.
     */
    async updateHrsTaskProfile(taskId, profileId, hMin, hMax) {
        // Validaciones iniciales
        if (hMin === undefined || hMax === undefined) {
            throw new AppError_1.AppError('No se han recibido las horas mínimas y máximas para la estimación', 400);
        }
        if (hMin > hMax) {
            throw new AppError_1.AppError('Las horas mínimas no pueden superar las horas máximas asignadas al perfil estimable', 400);
        }
        if (hMin < 0 || hMax < 0) {
            throw new AppError_1.AppError('No se admiten valores negativos en horas mínimas y máximas', 400);
        }
        const task = await task_service_1.taskService.getById(taskId);
        if (task.status === GeneralStatus_1.GeneralStatus.DONE) {
            throw new AppError_1.AppError('No es posible actualizar un perfil estimable de una tarea finalizada', 400);
        }
        // Obtenemos el objeto y actualizamos
        const hrsTaskProfile = await this.getByIds(taskId, profileId);
        hrsTaskProfile.hMin = hMin;
        hrsTaskProfile.hMax = hMax;
        hrsTaskProfile.status = GeneralStatus_1.GeneralStatus.DONE;
        const savedHrsTaskProfile = await hrs_task_profile_repository_1.hrsTaskProfileRepo.save(hrsTaskProfile);
        return (0, class_transformer_1.plainToInstance)(hrs_task_profile_dto_1.HrsTaskProfileDTO, savedHrsTaskProfile);
    }
    /**
     * Elimina una relación existente entre una tarea y un perfil estimable.
     * @param taskId - ID de la tarea asociada.
     * @param profileId - ID del perfil estimable asociado.
     * @returns Un mensaje confirmando la eliminación exitosa.
     * @throws AppError - Si no se encuentra o no se puede eliminar la relación.
     */
    async deleteHrsTaskProfile(taskId, profileId) {
        const task = await task_service_1.taskService.getById(taskId);
        if (task.status === GeneralStatus_1.GeneralStatus.DONE) {
            throw new AppError_1.AppError('No es posible eliminar un perfil estimable de una tarea finalizada', 400);
        }
        const hrsTaskProfile = await this.getByIds(taskId, profileId, ['task', 'profile']);
        const deleteResult = await hrs_task_profile_repository_1.hrsTaskProfileRepo.delete({ taskId: hrsTaskProfile.taskId, profileId: hrsTaskProfile.profileId });
        if (deleteResult.affected && deleteResult.affected > 0) {
            return { message: `Se ha eliminado con éxito la estimación para el perfil '${hrsTaskProfile.profile.name}' en la tarea '${hrsTaskProfile.task.description}'` };
        }
        else {
            throw new AppError_1.AppError('No se ha podido eliminar el perfil estimable de la tarea', 500);
        }
    }
    /**
     * Obtiene una relación específica entre una tarea y un perfil estimable.
     * @param taskId - ID de la tarea asociada.
     * @param profileId - ID del perfil estimable asociado.
     * @param relations - Relaciones adicionales a cargar.
     * @returns La entidad `HrsTaskProfileEntity` correspondiente.
     * @throws AppError - Si no se encuentra la relación o ocurre un error en la consulta.
     */
    async getByIds(taskId, profileId, relations) {
        try {
            const hrsTaskProfile = await hrs_task_profile_repository_1.hrsTaskProfileRepo.findOne({
                where: { profileId: profileId, taskId: taskId },
                relations: relations
            });
            if (!hrsTaskProfile) {
                throw new AppError_1.AppError('La estimación de horas por perfil no ha sido encontrada', 404);
            }
            return hrsTaskProfile;
        }
        catch (err) {
            throw new AppError_1.AppError('Error al obtener la estimación de horas por perfil', 500);
        }
    }
}
exports.HrsTaskProfileService = HrsTaskProfileService;
exports.hrsTaskProfileService = new HrsTaskProfileService;
