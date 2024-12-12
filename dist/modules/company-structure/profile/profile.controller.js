"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileController = void 0;
const profile_service_1 = require("./profile.service");
class ProfileController {
    async getAllProfiles(req, res, next) {
        try {
            const profiles = await profile_service_1.profileService.getAllProfiles();
            res.status(200).json(profiles);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.profileController = new ProfileController();
