"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetService = exports.PasswordResetService = void 0;
const uuid_1 = require("uuid");
const password_reset_token_entity_1 = require("./password-reset-token.entity");
const password_reset_token_repository_1 = require("./password-reset-token.repository");
const settings_service_1 = require("./../../settings/settings.service");
const AppError_1 = require("./../../../common/utils/AppError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_repository_1 = require("./../../user/user.repository");
const user_service_1 = require("./../../user/user.service");
const email_service_1 = require("../../notifications/email.service");
const validator_utility_1 = require("./../../../common/utils/validator.utility");
/**
 * Servicio para gestionar los tokens de restablecimiento de contraseñas y la lógica asociada.
 */
class PasswordResetService {
    /**
     * Crea un token de restablecimiento de contraseña para un usuario
     * @param user - Usuario para el cual se genera el token.
     * @returns El token de restablecimiento de contraseña recién creado.
     */
    async createPasswordResetToken(user) {
        const token = (0, uuid_1.v4)();
        const passwordResetToken = new password_reset_token_entity_1.PasswordResetTokenEntity();
        passwordResetToken.token = token;
        passwordResetToken.user = user;
        // Cálculo de tiempo de expiración en función del valor configurado en la aplicación
        const settings = await settings_service_1.settingsService.getSettings();
        const date = new Date();
        date.setHours(date.getHours() + settings.expirationResetTokenHours);
        passwordResetToken.expiresAt = date;
        return await password_reset_token_repository_1.passwordResetTokenRepo.save(passwordResetToken);
    }
    /**
     * Restablece la contraseña del usuario usando el token de restablecimiento.
     * @param token - El token de restablecimiento de contraseña.
     * @param password - La nueva contraseña del usuario.
     * @returns La nueva contraseña, si se restablece correctamente.
     * @throws AppError - Si el token no es válido, ha expirado o ya ha sido usado.
     */
    async resetPassword(token, password) {
        // Validamos contraseña
        if (!validator_utility_1.Validator.isValidPassword(password)) {
            throw new AppError_1.AppError('La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial', 400);
        }
        const tokenRecord = await password_reset_token_repository_1.passwordResetTokenRepo.findOne({
            where: {
                token: token
            },
            relations: ['user']
        });
        if (!tokenRecord) {
            throw new AppError_1.AppError('El token de reestablecimiento de contraseña no es válido', 400);
        }
        if (tokenRecord.expiresAt < new Date()) {
            throw new AppError_1.AppError('El token de reestablecimiento de contraseña ha expirado', 400);
        }
        if (tokenRecord.used) {
            throw new AppError_1.AppError('El token de reestablecimiento de contraseña ya ha sido usado', 400);
        }
        const user = tokenRecord.user;
        user.password = await bcrypt_1.default.hash(password, 10);
        await user_repository_1.userRepo.save(user);
        tokenRecord.used = true;
        await password_reset_token_repository_1.passwordResetTokenRepo.save(tokenRecord);
        return password;
    }
    /**
     * Solicita el restablecimiento de la contraseña para un usuario por email.
     * @param email - El correo electrónico del usuario que solicita el restablecimiento.
     */
    async requestResetPassword(email) {
        const user = await user_service_1.userService.getUserByEmail(email);
        // Si existe usuario, enviamos el mail, de lo contrario no se notifica de su no existencia
        if (user) {
            const passwordResetToken = await this.createPasswordResetToken(user);
            const settings = await settings_service_1.settingsService.getSettings();
            await email_service_1.emailService.sendRequestPasswordEmail(user, passwordResetToken.token, settings.expirationResetTokenHours);
        }
    }
}
exports.PasswordResetService = PasswordResetService;
exports.passwordResetService = new PasswordResetService();
