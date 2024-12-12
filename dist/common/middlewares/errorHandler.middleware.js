"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
/**
 * Middleware para manejar errores en la aplicación.
 *
 * Captura los errores generados en otros middlewares o rutas y responde con un mensaje de error adecuado.
 *
 * @param err - El error que se ha producido.
 * @param req - El objeto de la solicitud (Request).
 * @param res - El objeto de la respuesta (Response).
 * @param next - La función que pasa el control al siguiente middleware.
 * @returns Responde con un código de estado y mensaje de error.
 */
const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    let message = err.message || 'Internal Server Error';
    if (err.code) {
        message = err.code; // Utiliza el código de error si está definido
    }
    console.error(err); // Registro del error
    res.status(statusCode).json({
        success: false,
        message: message,
    });
};
exports.errorHandler = errorHandler;
