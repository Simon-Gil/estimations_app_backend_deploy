"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimationController = void 0;
const estimation_service_1 = require("./estimation.service");
const task_service_1 = require("./task/task.service");
const authorization_utility_1 = require("./../../common/utils/authorization.utility");
const proposal_service_1 = require("./../proposal/proposal.service");
const task_dto_1 = require("./task/dtos/task.dto");
const class_transformer_1 = require("class-transformer");
class EstimationController {
    async getEstimations(req, res, next) {
        try {
            let estimations;
            // Obtenemos estimaciones en función de los permisos del rol asignado al usuario
            if (!await (0, authorization_utility_1.checkAuthorization)(req.user, 'read', 'estimation')) {
                estimations = await estimation_service_1.estimationService.getEstimations(req.user);
            }
            else {
                estimations = await estimation_service_1.estimationService.getEstimations();
            }
            res.status(200).json(estimations);
        }
        catch (err) {
            next(err);
        }
    }
    async createEstimationTask(req, res, next) {
        try {
            const id = req.params.id;
            const data = req.body;
            const createdTask = await task_service_1.taskService.createTask(id, data.description, data.secondLevelCategory, data.profiles);
            const taskDTO = (0, class_transformer_1.plainToInstance)(task_dto_1.TaskDTO, createdTask);
            res.status(200).json(taskDTO);
        }
        catch (err) {
            next(err);
        }
    }
    async getEstimationDetail(req, res, next) {
        try {
            const id = req.params.id;
            const user = req.user;
            // Si el usuario tiene permisos de lectura para configuraciones de precio, devolvemos la estimacion calculada, de lo contrario, detalle de estimacion
            const estimationDetail = await estimation_service_1.estimationService.getEstimationDetail(id, user);
            // Filtramos campos especiales de propuesta asociada a estimacion
            const filteredProposal = await proposal_service_1.proposalService.filterSpecialFields(req.user, estimationDetail.proposal);
            estimationDetail.proposal = Array.isArray(filteredProposal) ? filteredProposal[0] : filteredProposal;
            res.status(200).json(estimationDetail);
        }
        catch (err) {
            next(err);
        }
    }
    async deleteEstimation(req, res, next) {
        try {
            const id = req.params.id;
            const deleteResult = await estimation_service_1.estimationService.deleteEstimation(id);
            res.status(200).json(deleteResult);
        }
        catch (err) {
            next(err);
        }
    }
    async completeEstimation(req, res, next) {
        try {
            const id = req.params.id;
            const estimation = await estimation_service_1.estimationService.completeEstimation(id);
            res.status(200).json(estimation);
        }
        catch (err) {
            next(err);
        }
    }
    async getEstimationTasks(req, res, next) {
        try {
            const id = req.params.id;
            const estimationTasks = await estimation_service_1.estimationService.getEstimationTasks(id, req.user);
            res.status(200).json(estimationTasks);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.estimationController = new EstimationController;
