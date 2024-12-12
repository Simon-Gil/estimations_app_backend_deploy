"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const AppError_1 = require("../../common/utils/AppError");
const Errors_1 = require("../../common/utils/Errors");
const user_service_1 = require("../user/user.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const failed_login_attempt_service_1 = require("./failed-login-attempt/failed-login-attempt.service");
const settings_service_1 = require("../settings/settings.service");
const user_repository_1 = require("../user/user.repository");
const user_login_dto_1 = require("./user-login.dto");
const class_transformer_1 = require("class-transformer");
class AuthService {
    /**
       * Realiza el login de un usuario.
       * @param email - Email del usuario.
       * @param password - Contraseña del usuario.
       * @returns Un objeto con el usuario y el token generado.
       * @throws {AppError} Si el usuario no existe, está bloqueado o las credenciales son incorrectas.
       */
    async login(email, password) {
        const user = await user_service_1.userService.getUserByEmail(email);
        // Validaciones
        if (!user) {
            throw new AppError_1.AppError(Errors_1.ErrorCodes.INVALID_EMAIL_OR_PASSWORD, 404);
        }
        else if (user.isBlocked) {
            throw new AppError_1.AppError('Se ha denegado el acceso por bloqueo del usuario', 401);
        }
        else if (user.blockedUntil && user.blockedUntil > new Date()) {
            throw new AppError_1.AppError(`El usuario ha sido bloqueado temporalmente`, 401);
        }
        else if (await bcrypt_1.default.compare(password, user.password)) {
            // Generamos el token con las horas de caducidad establecidas en la configuración
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || 'secret_key', { expiresIn: `${(await settings_service_1.settingsService.getSettings()).expirationAuthTokenHours}h` });
            // Eliminamos intentos fallidos anteriores
            await failed_login_attempt_service_1.failedLoginAttemptService.clearOldFailedAttempts(user.id);
            const userDTO = (0, class_transformer_1.plainToInstance)(user_login_dto_1.UserLoginDTO, user);
            return { user: userDTO, token: token };
        }
        else {
            // Agregamos un nuevo intento fallido
            await failed_login_attempt_service_1.failedLoginAttemptService.createFailedLoginAttempt(user);
            const failedAttempts = await failed_login_attempt_service_1.failedLoginAttemptService.getFailedLoginAttemptsByUser(user.id);
            // Cargamos configuración de la aplicación y bloqueamos al usuario si excede el número máximo de intentos fallidos
            const settings = await settings_service_1.settingsService.getSettings();
            if (failedAttempts >= settings.maxLoginAttempts) {
                user.blockedUntil = new Date(new Date().getTime() + settings.blockDurationMinutes * 60 * 1000);
                await user_repository_1.userRepo.save(user);
                // Eliminamos los intentos de inicio de sesión fallidos tras establecer el bloqueo
                await failed_login_attempt_service_1.failedLoginAttemptService.clearOldFailedAttempts(user.id);
                throw new AppError_1.AppError(`Has superado el número de intentos de inicio de sesión, vuelve a intentarlo en ${settings.blockDurationMinutes} minutos`, 401);
            }
            throw new AppError_1.AppError(Errors_1.ErrorCodes.INVALID_EMAIL_OR_PASSWORD, 401);
        }
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
