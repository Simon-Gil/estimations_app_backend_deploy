"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const Errors_1 = require("../../common/utils/Errors");
class AuthController {
    async login(req, res, next) {
        const { email, password } = req.body;
        try {
            const { user, token } = await auth_service_1.authService.login(email, password);
            if (!token) {
                res.status(401).json({ message: Errors_1.ErrorCodes.INVALID_EMAIL_OR_PASSWORD });
                return;
            }
            res.status(200).json({ user: user, token: token });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
