"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
/**
 * Clase que proporciona métodos estáticos para la validación de diferentes tipos de datos.
 */
class Validator {
    /**
     * Verifica si el valor dado es un precio válido (mayor que cero).
     * @param n - El valor que se va a verificar.
     * @returns `true` si el valor es mayor que cero, de lo contrario `false`.
     */
    static IsValidPrice(n) {
        return n > 0;
    }
    /**
     * Valida contraseñas
     * La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.
     * @param str - La cadena de texto que representa la contraseña.
     * @returns `true` si la contraseña es válida, de lo contrario `false`.
     */
    static isValidPassword(str) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.-])[A-Za-z\d@$!%*?&.-]{8,}$/;
        return passwordRegex.test(str);
    }
    /**
     * Verifica si el valor dado es un número entero y positivo.
     * @param n - El valor que se va a verificar.
     * @returns `true` si el valor es un número entero y mayor que cero, de lo contrario `false`.
     */
    static isIntegerAndPositive(n) {
        return Number.isInteger(n) && n > 0;
    }
    /**
     * Verifica si el valor dado es un número entero no negativo.
     * @param n - El valor que se va a verificar.
     * @returns `true` si el valor es un número entero y mayor que cero, de lo contrario `false`.
     */
    static isIntegerNonNegative(n) {
        return Number.isInteger(n) && n >= 0;
    }
}
exports.Validator = Validator;
