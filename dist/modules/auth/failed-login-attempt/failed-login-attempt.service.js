"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failedLoginAttemptService = exports.FailedLoginAttemptService = void 0;
const failed_login_attempt_entity_1 = require("./failed-login-attempt.entity");
const failed_login_attempt_repository_1 = require("./failed-login-attempt.repository");
/**
 * Servicio para gestionar intentos fallidos de inicio de sesión de usuarios.
 */
class FailedLoginAttemptService {
    /**
     * Obtiene la cantidad de intentos fallidos de inicio de sesión registrados para un usuario específico.
     *
     * @param userId - ID del usuario para el cual se cuentan los intentos fallidos.
     * @returns Una promesa que resuelve con el número de intentos fallidos registrados.
     */
    async getFailedLoginAttemptsByUser(userId) {
        const failedLoginAttempts = await failed_login_attempt_repository_1.failedLoginAttemptRepo.count({
            where: {
                user: { id: userId }
            }
        });
        return failedLoginAttempts;
    }
    /**
     * Registra un nuevo intento fallido de inicio de sesión para un usuario.
     *
     * @param user - Instancia del usuario asociado al intento fallido.
     * @returns Una promesa que resuelve cuando el intento fallido ha sido registrado.
     */
    async createFailedLoginAttempt(user) {
        const failedLoginAttempt = new failed_login_attempt_entity_1.FailedLoginAttemptEntity();
        failedLoginAttempt.user = user;
        await failed_login_attempt_repository_1.failedLoginAttemptRepo.save(failedLoginAttempt);
    }
    /**
     * Elimina todos los registros de intentos fallidos de inicio de sesión asociados a un usuario.
     * Se utiliza para reestablecer la cuenta una vez hay un inicio de sesión exitoso o finaliza un bloqueo
     *
     * @param userId - ID del usuario cuyos intentos fallidos serán eliminados.
     * @returns Una promesa que resuelve cuando los registros han sido eliminados.
     */
    async clearOldFailedAttempts(userId) {
        await failed_login_attempt_repository_1.failedLoginAttemptRepo.delete({ user: { id: userId } });
    }
}
exports.FailedLoginAttemptService = FailedLoginAttemptService;
exports.failedLoginAttemptService = new FailedLoginAttemptService();
