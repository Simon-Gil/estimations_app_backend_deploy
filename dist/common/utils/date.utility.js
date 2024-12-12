"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateUtility = exports.DateUtility = void 0;
/**
 * Clase utilitaria para trabajar con fechas.
 */
class DateUtility {
    /**
     * Devuelve la fecha actual formateada en el formato 'YYYY-MM-DD'.
     *
     * @returns La fecha actual en formato 'YYYY-MM-DD'.
     */
    getFormattedCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    /**
     * Devuelve la fecha de expiración de una propuesta, calculada a partir de los ajustes de la aplicación.
     * La fecha de expiración se determina sumando los días configurados en `expirationProposalDays` a la fecha actual.
     *
     * @param settings - Los ajustes de la aplicación que contienen la configuración del número de días de expiración.
     * @returns La fecha de expiración de la propuesta.
     */
    getProposalExpDate(settings) {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + settings.expirationProposalDays);
        return newDate;
    }
}
exports.DateUtility = DateUtility;
exports.dateUtility = new DateUtility();
