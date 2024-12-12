"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleService = exports.RoleService = void 0;
const role_repository_1 = require("./role.repository");
const user_repository_1 = require("../../user/user.repository");
const permission_repository_1 = require("../permission/permission.repository");
const permission_utility_1 = require("../permission/permission.utility");
const AppError_1 = require("../../../common/utils/AppError");
const permission_service_1 = require("../permission/permission.service");
/**
 * Servicio encargado de gestionar roles de usuario.
 */
class RoleService {
    /**
     * Obtiene todos los roles de la base de datos.
     * @returns Una lista de todos los roles existentes en la base de datos.
     */
    async getAllRoles() {
        const roles = await role_repository_1.roleRepo.find();
        return roles;
    }
    /**
     * Obtiene un rol específico según el departamento y el grado proporcionados.
     * @param departmentId - ID del departamento al cual pertenece el rol.
     * @param gradeId - ID del grado asociado al rol.
     * @returns El rol correspondiente o null si no se encuentra.
     */
    async getRoleByDepartmentAndGrade(departmentId, gradeId) {
        const role = await role_repository_1.roleRepo.findOne({
            where: {
                department: { id: departmentId },
                grade: { id: gradeId }
            }
        });
        return role || null;
    }
    /**
     * Obtiene los roles asignados a un usuario específico.
     * @param userId - ID del usuario para obtener los roles asociados.
     * @returns Una lista de roles asignados al usuario.
     */
    async getUserRoles(userId) {
        const user = await user_repository_1.userRepo.findOne({
            where: { id: userId },
            relations: ['roles']
        });
        return user ? user.roles : [];
    }
    /**
     * Concede permisos a un rol específico.
     * @param role - El rol al cual se le agregarán los permisos.
     * @param permissionIds - Lista de IDs de los permisos a agregar.
     * @returns El rol actualizado con los permisos agregados.
     * @throws {AppError} Si ocurre un error al agregar los permisos.
     */
    async addPermissionsToRole(role, permissionIds) {
        try {
            if (!role)
                throw new AppError_1.AppError('Rol no encontrado', 404);
            const permissions = await permission_repository_1.permissionRepo.findByIds(permissionIds);
            role.permissions = [...role.permissions, ...permissions];
            return await role_repository_1.roleRepo.save(role);
        }
        catch (err) {
            console.log("Error al conceder permisos al rol: ", err);
            throw new AppError_1.AppError("Se ha producido un error al guardar los permisos concedidos", 500);
        }
    }
    /**
     * Elimina permisos de un rol específico.
     * @param role - El rol del cual se eliminarán los permisos.
     * @param permissionIds - Lista de IDs de los permisos a eliminar.
     * @returns El rol actualizado con los permisos eliminados.
     * @throws {AppError} Si ocurre un error al eliminar los permisos.
     */
    async removePermissionsFromRole(role, permissionIds) {
        try {
            role.permissions = role.permissions.filter(permission => !permissionIds.includes(permission.id));
            return await role_repository_1.roleRepo.save(role);
        }
        catch (err) {
            console.log("Error al revocar permisos al rol:", err);
            throw new AppError_1.AppError('Se ha producido un error al guardar los permisos revocados', 500);
        }
    }
    /**
     * Obtiene un rol específico por su ID.
     * @param id - ID del rol a obtener.
     * @param relations - Relaciones adicionales a cargar (opcional).
     * @returns El rol correspondiente.
     * @throws {AppError} Si no se encuentra el rol.
     */
    async getById(id, relations) {
        try {
            const role = await role_repository_1.roleRepo.findOne({
                where: { id: id },
                relations: relations
            });
            if (!role) {
                throw new AppError_1.AppError('El rol no ha sido encontrado', 404);
            }
            return role;
        }
        catch (err) {
            throw new AppError_1.AppError('Error al obtener el rol', 500);
        }
    }
    /**
     * Actualiza los permisos de un rol, agregando y eliminando permisos según sea necesario.
     * @param roleId - ID del rol a actualizar.
     * @param revokedPermissions - Lista de IDs de los permisos a revocar.
     * @param grantedPermissions - Lista de IDs de los permisos a conceder.
     * @returns El rol actualizado con los cambios de permisos.
     * @throws {AppError} Si no se encuentra el rol o ocurre un error al actualizar los permisos.
     */
    async updateRolePermissions(roleId, revokedPermissions, grantedPermissions) {
        const role = await role_repository_1.roleRepo.findOne({ where: { id: roleId }, relations: ['permissions'] });
        if (!role)
            throw new AppError_1.AppError('Rol no encontrado', 500);
        await this.addPermissionsToRole(role, grantedPermissions);
        await this.removePermissionsFromRole(role, revokedPermissions);
        await permission_utility_1.PermissionUtility.maintainPermissionStructure(role);
        return role;
    }
    /**
     * Obtiene los permisos asociados a un rol específico.
     * @param roleId - ID del rol para obtener los permisos.
     * @returns Los permisos asociados al rol en formato DTO.
     * @throws {AppError} Si el rol no se encuentra.
     */
    async getPermissionsByRole(roleId) {
        const role = await role_repository_1.roleRepo.findOne({
            where: { id: roleId },
            relations: ['permissions']
        });
        const permissions = await permission_service_1.permissionService.getPermissions();
        if (role) {
            return await permission_utility_1.PermissionUtility.fillPermissionsWithRole(permissions, role);
        }
        else {
            throw new AppError_1.AppError('Rol no encontrado', 404);
        }
    }
}
exports.RoleService = RoleService;
exports.roleService = new RoleService();
