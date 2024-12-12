"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineAbilitiesFor = defineAbilitiesFor;
const ability_1 = require("@casl/ability");
// Configuración CASL
/**
 * Función que define lo permisos de un usuario basado en sus roles y permisos asociados.
 *
 *
 * @param user - El usuario para el cual se definen las habilidades y permisos. Este objeto contiene los roles
 *               que a su vez contienen los permisos.
 *
 * @returns Un objeto de habilidades que describe las acciones permitidas para el usuario en función de sus roles y permisos.
 */
async function defineAbilitiesFor(user) {
    const roles = user.roles;
    return (0, ability_1.defineAbility)((can, cannot) => {
        roles.forEach(role => {
            const permissions = role.permissions;
            permissions.forEach(permission => {
                can(permission.action, permission.subject);
            });
        });
    });
}
