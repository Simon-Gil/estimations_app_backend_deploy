"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterRetrievedFields = exports.checkAuthorization = void 0;
const ability_1 = require("@casl/ability");
const abilities_1 = require("../../config/abilities");
/**
 * Función para comprobar si un usuario tiene permisos para realizar una acción sobre un recurso determinado.
 * Utiliza las habilidades definidas en la configuración de CASL (Code Access Security Language).
 *
 * @param user - El usuario para el cual se verifican los permisos.
 * @param action - La acción que se desea realizar (por ejemplo, 'create', 'update', 'delete').
 * @param subject - El recurso o entidad sobre el cual se quiere realizar la acción (por ejemplo, 'estimation', 'user').
 * @returns `true` si el usuario tiene permisos para realizar la acción sobre el recurso, `false` en caso contrario.
 */
const checkAuthorization = async (user, action, subject) => {
    const ability = await (0, abilities_1.defineAbilitiesFor)(user);
    try {
        ability_1.ForbiddenError.from(ability).throwUnlessCan(action, subject);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.checkAuthorization = checkAuthorization;
/**
 * Función para filtrar los campos de los datos recuperados según los permisos del usuario.
 * Solo los campos que el usuario tiene permiso de ver serán devueltos.
 *
 * @param user - El usuario para el cual se verifican los permisos.
 * @param action - La acción que se desea realizar (por ejemplo, 'read').
 * @param subject - El recurso o entidad sobre el cual se quiere realizar la acción (por ejemplo, 'estimation', 'user').
 * @param data - Los datos a los cuales se les aplicará el filtro (puede ser un objeto o un array de objetos).
 * @param specialFields - Lista de campos especiales que deben ser evaluados según los permisos del usuario.
 * @returns Los datos filtrados, con solo los campos visibles según los permisos del usuario.
 */
const filterRetrievedFields = async (user, action, subject, data, specialFields) => {
    const ability = await (0, abilities_1.defineAbilitiesFor)(user);
    const dataArray = Array.isArray(data) ? data : [data];
    const filteredDataArray = dataArray.map((item) => {
        const visibleFields = Object.keys(item).filter((field) => {
            if (specialFields.includes(field)) {
                return ability.can(action, subject);
            }
            return true;
        });
        return visibleFields.reduce((filtered, field) => {
            filtered[field] = item[field];
            return filtered;
        }, {});
    });
    return Array.isArray(data) ? filteredDataArray : filteredDataArray[0];
};
exports.filterRetrievedFields = filterRetrievedFields;
