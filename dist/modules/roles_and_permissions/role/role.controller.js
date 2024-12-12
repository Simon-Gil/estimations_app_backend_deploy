"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleController = void 0;
const role_service_1 = require("./role.service");
class RoleController {
    async getRoles(req, res) {
        try {
            const roles = await role_service_1.roleService.getAllRoles();
            res.status(200).json(roles);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error al obtener roles', err });
        }
    }
    async getRolePermissions(req, res, next) {
        const roleId = req.params.id;
        try {
            const permissions = await role_service_1.roleService.getPermissionsByRole(roleId);
            res.status(200).json(permissions);
        }
        catch (err) {
            next(err);
        }
    }
    async updatePermissions(req, res, next) {
        const roleId = req.params.id;
        const revokedPermissions = req.body.revoked;
        const grantedPermissions = req.body.granted;
        try {
            const role = await role_service_1.roleService.updateRolePermissions(roleId, revokedPermissions, grantedPermissions);
            res.status(200).json({ message: "Permisos actualizados", rolePermissions: role.permissions });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.roleController = new RoleController();
