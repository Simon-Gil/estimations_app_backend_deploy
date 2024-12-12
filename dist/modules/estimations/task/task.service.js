"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = void 0;
const class_transformer_1 = require("class-transformer");
const hrs_task_profile_entity_1 = require("./hrs-task-profile/hrs-task-profile.entity");
const task_entity_1 = require("./task.entity");
const AppError_1 = require("../../../common/utils/AppError");
const task_repository_1 = require("./task.repository");
const estimation_service_1 = require("../estimation.service");
const profile_service_1 = require("../../company-structure/profile/profile.service");
const second_level_category_service_1 = require("../../company-structure/task-categories/second-level-category/second-level-category.service");
const task_dto_1 = require("./dtos/task.dto");
const GeneralStatus_1 = require("../../../common/utils/GeneralStatus");
const authorization_utility_1 = require("../../../common/utils/authorization.utility");
const estimation_utility_1 = require("../estimation.utility");
const EstimationStatus_1 = require("../EstimationStatus");
/**
 * Servicio encargado de gestionar las tareas de estimación.
 */
class TaskService {
    /**
     * Crea una nueva tarea asociada a una estimación y categoría de segundo nivel.
     * @param estimationId - ID de la estimación a la que se asociará la tarea.
     * @param description - Descripción de la tarea.
     * @param categoryId - ID de la categoría de segundo nivel a la que se asociará la tarea.
     * @param profiles - Perfiles asociados a la tarea (opcional).
     * @returns La tarea creada, transformada en DTO.
     * @throws {AppError} Si ya existe una tarea con la misma descripción en la estimación o si la estimación ya ha sido finalizada.
     */
    async createTask(estimationId, description, categoryId, profiles) {
        const estimation = await estimation_service_1.estimationService.getById(estimationId, ['tasks']);
        const secLevelCat = await second_level_category_service_1.secLevelCatService.getById(categoryId);
        // Lanzamos error en caso de que la estimación esté finalizada
        if (estimation.status === EstimationStatus_1.EstimationStatus.DONE) {
            throw new AppError_1.AppError('No es posible crear tareas en una estimación finalizada', 400);
        }
        // Lanzamos error en caso de existir una tarea con la misma descripción en la estimación
        if (await task_repository_1.taskRepo.findOne({
            where: {
                description: description, estimation: {
                    id: estimation.id,
                }
            }
        })) {
            throw new AppError_1.AppError('Ya existe una tarea con la misma descripción en esta estimación', 409);
        }
        const task = new task_entity_1.TaskEntity();
        // Inicializamos hrsTaskProfiles y asignamos los perfiles
        if (profiles && profiles.length > 0) {
            task.hrsTaskProfiles = [];
            for (const profile of profiles) {
                const hrsTaskProfile = new hrs_task_profile_entity_1.HrsTaskProfileEntity();
                hrsTaskProfile.profile = await profile_service_1.profileService.getById(profile);
                hrsTaskProfile.task = task;
                task.hrsTaskProfiles.push(hrsTaskProfile);
            }
        }
        task.description = description;
        task.secondLevelCategory = secLevelCat;
        task.estimation = estimation;
        const savedTask = await task_repository_1.taskRepo.save(task);
        // Transformamos en DTO 
        const taskDTO = (0, class_transformer_1.plainToInstance)(task_dto_1.TaskDTO, savedTask);
        return taskDTO;
    }
    /**
     * Obtiene una tarea por su ID.
     * @param id - ID de la tarea a obtener.
     * @param relations - Relaciones opcionales para cargar junto con la tarea.
     * @returns La tarea solicitada.
     * @throws {AppError} Si no se encuentra la tarea.
     */
    async getById(id, relations) {
        try {
            const task = await task_repository_1.taskRepo.findOne({
                where: { id: id },
                relations: relations
            });
            if (!task) {
                throw new AppError_1.AppError('La tarea no ha sido encontrada', 404);
            }
            return task;
        }
        catch (err) {
            throw new AppError_1.AppError('Error al obtener la tarea', 500);
        }
    }
    /**
     * Obtiene el detalle de una tarea, calculando su precio si el usuario tiene permisos.
     * @param taskId - ID de la tarea.
     * @param user - Usuario que solicita el detalle de la tarea.
     * @returns El detalle de la tarea en formato DTO.
     */
    async getTaskDetail(taskId, user) {
        let task;
        if (await (0, authorization_utility_1.checkAuthorization)(user, 'readPriceConfig', 'account')) {
            task = await estimation_utility_1.estimationUtility.calculateTask(taskId);
        }
        else {
            const taskEntity = await this.getById(taskId, ['hrsTaskProfiles.profile']);
            task = (0, class_transformer_1.plainToInstance)(task_dto_1.TaskDTO, taskEntity);
        }
        return task;
    }
    /**
     * Actualiza el estado de una tarea.
     * @param status - El nuevo estado de la tarea.
     * @param taskId - ID de la tarea a actualizar.
     * @returns La tarea actualizada en formato DTO.
     * @throws {AppError} Si el estado no es válido o si se intenta finalizar una tarea con perfiles pendientes de valorar.
     */
    async updateTaskStatus(status, taskId) {
        const task = await this.getById(taskId, ['hrsTaskProfiles', 'estimation']);
        if (task.estimation.status === EstimationStatus_1.EstimationStatus.DONE) {
            throw new AppError_1.AppError('No es posible actualizar el estado de las tareas en una estimación finalizada', 400);
        }
        const pendingHrsTaskProfiles = task.hrsTaskProfiles.some(hrsTaskProfile => hrsTaskProfile.status === GeneralStatus_1.GeneralStatus.PENDING);
        if (pendingHrsTaskProfiles && status === "done") {
            throw new AppError_1.AppError('No es posible finalizar una tarea con perfiles estimables pendientes', 400);
        }
        const statusEnumValue = Object.values(GeneralStatus_1.GeneralStatus).find((enumValue) => enumValue === status);
        if (!statusEnumValue) {
            throw new AppError_1.AppError(`El estado '${status}' no es válido`, 400);
        }
        task.status = statusEnumValue;
        const updatedTask = await task_repository_1.taskRepo.save(task);
        return (0, class_transformer_1.plainToInstance)(task_dto_1.TaskDTO, updatedTask);
    }
    /**
     * Elimina una tarea por su ID.
     * @param taskId - ID de la tarea a eliminar.
     * @returns Un mensaje indicando si la tarea fue eliminada con éxito.
     * @throws {AppError} Si no se pudo eliminar la tarea.
     */
    async deleteTask(taskId) {
        const task = await this.getById(taskId, ['estimation']);
        if (task.estimation.status === EstimationStatus_1.EstimationStatus.DONE) {
            throw new AppError_1.AppError('No es posible eliminar tareas de una estimación finalizada', 400);
        }
        const deleteResult = await task_repository_1.taskRepo.delete(task.id);
        if (deleteResult.affected && deleteResult.affected > 0) {
            return { message: `Se ha eliminado con éxito la tarea: '${task.description}'` };
        }
        else {
            throw new AppError_1.AppError(`No se ha podido eliminar la tarea: '${task.description}'`, 500);
        }
    }
}
exports.taskService = new TaskService();
