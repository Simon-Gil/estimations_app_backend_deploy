"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionController = void 0;
const permission_service_1 = require("./permission.service");
class PermissionController {
    async getPermissions(req, res, next) {
        try {
            const permissions = await permission_service_1.permissionService.getPermissions();
            res.status(200).json(permissions);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.permissionController = new PermissionController();
