"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralStatus = void 0;
/**
 * Enum que define los posibles estados de las entidades en la aplicación.
 *
 * Se utiliza para representar el estado de diversas entidades,
 * que pueden estar en espera (PENDING) o completadas (DONE).
 */
var GeneralStatus;
(function (GeneralStatus) {
    GeneralStatus["PENDING"] = "pending";
    GeneralStatus["DONE"] = "done";
})(GeneralStatus || (exports.GeneralStatus = GeneralStatus = {}));
