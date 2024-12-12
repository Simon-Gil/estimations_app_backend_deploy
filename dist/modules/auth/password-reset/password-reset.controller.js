"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetController = void 0;
const password_reset_service_1 = require("./password-reset.service");
class PasswordResetController {
    async resetPassword(req, res, next) {
        try {
            const token = req.body.token;
            const password = req.body.password;
            const newPassword = await password_reset_service_1.passwordResetService.resetPassword(token, password);
            res.status(200).json(newPassword);
        }
        catch (err) {
            next(err);
        }
    }
    async requestResetPassword(req, res, next) {
        try {
            const email = req.body.email;
            await password_reset_service_1.passwordResetService.requestResetPassword(email);
            res.status(200).json({ message: 'Email enviado con éxito' });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.passwordResetController = new PasswordResetController();
