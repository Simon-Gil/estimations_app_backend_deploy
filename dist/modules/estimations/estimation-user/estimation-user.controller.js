"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimationUserController = void 0;
const estimation_user_service_1 = require("./estimation-user.service");
class EstimationUserController {
    async finishEstimation(req, res, next) {
        try {
            const estimationId = req.params.id;
            const user = req.user;
            const estimationUser = await estimation_user_service_1.estimationUserService.finishEstimation(estimationId, user.id);
            res.status(200).json(estimationUser);
        }
        catch (err) {
            next(err);
        }
    }
    async assignUsersToEstimation(req, res, next) {
        try {
            const id = req.params.id;
            const users = req.body.users;
            const result = await estimation_user_service_1.estimationUserService.assignUsersToEstimation(users, id);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async deleteUsersFromEstimation(req, res, next) {
        try {
            const estimationId = req.params.estimationId;
            const userId = req.params.userId;
            const newUserList = await estimation_user_service_1.estimationUserService.deleteUsersFromEstimation(estimationId, userId);
            res.status(200).json(newUserList);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.estimationUserController = new EstimationUserController();
