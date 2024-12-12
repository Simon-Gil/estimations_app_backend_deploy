"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionUtility = void 0;
const permission_entity_1 = require("./permission.entity");
const role_entity_1 = require("../role/role.entity");
const database_config_1 = __importDefault(require("../../../config/database.config"));
/**
 * Clase utilitaria que proporciona métodos estáticos para trabajar con permisos y roles en una estructura jerárquica.
 */
class PermissionUtility {
    /**
     * Construye una estructura de permisos agrupando por subjects y creando un árbol de actions.
     * @param permissions - Lista de permisos a procesar.
     * @returns Un objeto de tipo `PermissionResponseDTO` que contiene los subjects y sus respectivas actions.
     */
    static buildPermissionResponse(permissions) {
        const permissionMap = new Map();
        // Crear nodos de acción usando createActionNode
        permissions.forEach(permission => {
            const node = this.createActionNode(permission, false);
            permissionMap.set(permission.id, node);
        });
        const subjectsMap = new Map();
        // Agrupar por sujeto y construir el árbol de permisos
        permissions.forEach(permission => {
            const node = permissionMap.get(permission.id); // Usar el operador de aserción de no nulidad
            // Agrupar por sujeto
            if (!subjectsMap.has(permission.subject)) {
                subjectsMap.set(permission.subject, { subject: permission.subject, actions: [] });
            }
            const subject = subjectsMap.get(permission.subject);
            // Si tiene permiso padre, agregar al nodo hijo correspondiente
            if (permission.parentPermission) {
                const parentNode = permissionMap.get(permission.parentPermission.id);
                if (parentNode) {
                    if (parentNode.childActions)
                        parentNode.childActions.push(node);
                }
            }
            else {
                // Si no tiene permiso padre, agregar al nivel superior
                subject.actions.push(node);
            }
        });
        return {
            subjects: Array.from(subjectsMap.values()),
        };
    }
    /**
     * Rellena la respuesta global de permisos marcando como activos los que están asignados al rol.
     * @param permissions - La estructura de permisos que será modificada.
     * @param role - El rol cuyos permisos se utilizarán para marcar los permisos activos.
     * @returns La respuesta de permisos con los permisos activos correspondientes.
     */
    static async fillPermissionsWithRole(permissions, role) {
        const rolePermissionsIds = role.permissions.map(p => {
            return p.id;
        });
        permissions.subjects.forEach(subject => {
            this.comparePermissionsRecursively(subject.actions, rolePermissionsIds);
        });
        return permissions;
    }
    /**
     * Compara recursivamente las acciones de los permisos y marca aquellos que estén presentes en los permisos del rol.
     * @param actions - Las acciones que se compararán con los permisos del rol.
     * @param rolePermissionsIds - Los IDs de los permisos del rol que se están comparando.
     */
    static comparePermissionsRecursively(actions, rolePermissionsIds) {
        actions.forEach(action => {
            if (rolePermissionsIds.includes(action.id)) {
                action.isActive = true;
            }
            if (action.childActions && action.childActions.length > 0) {
                this.comparePermissionsRecursively(action.childActions, rolePermissionsIds);
            }
        });
    }
    /**
     * Crea un nodo de 'action' a partir de un permiso. Se utiliza en la generación de la estructura de permisos
     * @param permission - El permiso a partir del cual se crea el nodo de acción.
     * @param isActive - El estado de actividad del permiso (si está activo o no).
     * @returns Un objeto de tipo `ActionDTO` que representa la acción del permiso.
     */
    static createActionNode(permission, isActive) {
        return {
            id: permission.id,
            description: permission.description,
            action: permission.action,
            childActions: [],
            name: permission.name,
            isActive: isActive
        };
    }
    /**
     * Mantiene la estructura jerárquica de los permisos asignados a un rol, asegurándose de que los permisos hijos estén asignados si no lo están.
     * Se llama después de cada actualización de permisos para un rol determinado.
     * @param role - El rol al que se le verificarán los permisos y se le asignarán los permisos hijos necesarios.
     * @returns El rol con la estructura de permisos mantenida.
     */
    static async maintainPermissionStructure(role) {
        console.log('ESTAMOS AQUI 1');
        const permissionRepository = database_config_1.default.getRepository(permission_entity_1.PermissionEntity);
        const roleRepository = database_config_1.default.getRepository(role_entity_1.RoleEntity);
        // Si el rol no tiene permisos asignados devolvemos el rol
        if (!role.permissions || role.permissions.length === 0) {
            console.log('ESTAMOS AQUI 2');
            return role;
        }
        // Creamos un set para guardar todos los permisos ya asignados
        const assignedPermissions = new Set(role.permissions.map(p => p.id));
        // Función recursiva para verificar y asignar permisos hijos
        const assignChildPermissions = async (permissionId) => {
            const permissionWithChildren = await permissionRepository.findOne({
                where: { id: permissionId },
                relations: ['childPermissions'],
            });
            if (permissionWithChildren && permissionWithChildren.childPermissions) {
                // Verificamos si los permisos hijos están ya asignados
                for (const childPermission of permissionWithChildren.childPermissions) {
                    if (!assignedPermissions.has(childPermission.id)) {
                        // Si un permiso hijo no está asignado, lo añadimos al rol
                        console.log(`Añadiendo permiso hijo: ${childPermission.name} al rol`);
                        role.permissions.push(childPermission);
                        console.log(`ESTAMOS AQUI 4, asignando permiso ${childPermission.name}`);
                        assignedPermissions.add(childPermission.id);
                    }
                    // Llamar recursivamente para verificar los hijos del permiso hijo
                    await assignChildPermissions(childPermission.id);
                }
            }
        };
        for (const permission of role.permissions) {
            await assignChildPermissions(permission.id);
        }
        await roleRepository.save(role);
        return role;
    }
}
exports.PermissionUtility = PermissionUtility;
