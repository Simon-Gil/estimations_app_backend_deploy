"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const hrs_task_profile_service_1 = require("./hrs-task-profile/hrs-task-profile.service");
const task_service_1 = require("./task.service");
class TaskController {
    async createHrsTaskProfile(req, res, next) {
        try {
            const taskId = req.params.id;
            const profileId = req.body.profile;
            const savedHrsTaskProfile = await hrs_task_profile_service_1.hrsTaskProfileService.createHrsTaskProfile(taskId, profileId);
            res.status(200).json(savedHrsTaskProfile);
        }
        catch (err) {
            next(err);
        }
    }
    async updateTaskStatus(req, res, next) {
        try {
            const taskId = req.params.id;
            const status = req.body.status;
            const updatedTask = await task_service_1.taskService.updateTaskStatus(status, taskId);
            res.status(200).json(updatedTask);
        }
        catch (err) {
            next(err);
        }
    }
    async deleteTask(req, res, next) {
        try {
            const id = req.params.id;
            const deleteResult = await task_service_1.taskService.deleteTask(id);
            res.status(200).json(deleteResult);
        }
        catch (err) {
            next(err);
        }
    }
    async getTask(req, res, next) {
        try {
            const id = req.params.id;
            const task = await task_service_1.taskService.getTaskDetail(id, req.user);
            res.status(200).json(task);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.taskController = new TaskController();
