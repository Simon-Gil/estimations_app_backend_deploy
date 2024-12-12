"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
/**
 * Clase personalizada para manejar errores específicos de la aplicación.
 *
 * Extiende la clase estándar `Error` y agrega propiedades adicionales para manejar el estado y la operatividad del error.
 */
class AppError extends Error {
    constructor(message, statusCode, isOperational = true) {
        super(message);
        this.status = statusCode;
        this.isOperational = isOperational;
        // Asegúrate de que el nombre del error sea el correcto
        this.name = this.constructor.name;
        // Captura la pila de la función original
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
