"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hrsTaskProfileController = void 0;
const hrs_task_profile_service_1 = require("./hrs-task-profile.service");
class HrsTaskProfileController {
    async updateHrsTaskProfile(req, res, next) {
        try {
            const taskId = req.params.taskId;
            const profileId = req.params.profileId;
            const data = req.body;
            const updatedHrsTaskProfile = await hrs_task_profile_service_1.hrsTaskProfileService.updateHrsTaskProfile(taskId, profileId, data.hMin, data.hMax);
            res.status(200).json(updatedHrsTaskProfile);
        }
        catch (err) {
            next(err);
        }
    }
    async deleteHrsTaskProfile(req, res, next) {
        try {
            const taskId = req.params.taskId;
            const profileId = req.params.profileId;
            const deleteResult = await hrs_task_profile_service_1.hrsTaskProfileService.deleteHrsTaskProfile(taskId, profileId);
            res.status(200).json(deleteResult);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.hrsTaskProfileController = new HrsTaskProfileController();
