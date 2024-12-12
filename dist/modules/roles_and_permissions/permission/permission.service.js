"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionService = exports.PermissionService = void 0;
const typeorm_1 = require("typeorm");
const permission_repository_1 = require("./permission.repository");
const user_repository_1 = require("../../user/user.repository");
const permission_utility_1 = require("./permission.utility");
/**
 * Servicio para gestionar permisos de usuarios .
 */
class PermissionService {
    constructor() {
        this.permissionRepo = permission_repository_1.permissionRepo;
        this.userRepo = user_repository_1.userRepo;
    }
    /**
     * Obtiene los permisos asociados a un usuario.
     * @param userId - El ID del usuario para obtener sus permisos.
     * @returns Un array de objetos que contiene el `subject` y `action` de los permisos del usuario.
     * @throws Error - Si el usuario no es encontrado en la base de datos.
     */
    async getUserPermissions(userId) {
        const user = await this.userRepo.findOne({
            where: { id: userId },
            relations: ['roles', 'roles.permissions'],
        });
        if (!user) {
            throw new Error('User not found');
        }
        const permissions = user.roles.flatMap(role => role.permissions.map(permission => ({
            subject: permission.subject,
            action: permission.action,
        })));
        return permissions;
    }
    /**
     * Obtiene los permisos asociados a los roles del array recibido.
     * @param roles - Un array de entidades de roles para obtener sus permisos.
     * @returns Un array de permisos asociados a los roles proporcionados.
     */
    async getPermissionsByRoles(roles) {
        const roleIds = roles.map(role => role.id);
        return await permission_repository_1.permissionRepo.find({
            where: {
                roles: {
                    id: (0, typeorm_1.In)(roleIds)
                }
            }
        });
    }
    /**
     * Obtiene todos los permisos existentes en la aplicación.
     * @returns Un objeto con todos los permisos formateados de acuerdo con la estructura definida.
     */
    async getPermissions() {
        const permissions = await this.permissionRepo.find({
            relations: ['parentPermission', 'childPermissions'],
        });
        return permission_utility_1.PermissionUtility.buildPermissionResponse(permissions);
    }
}
exports.PermissionService = PermissionService;
exports.permissionService = new PermissionService();
