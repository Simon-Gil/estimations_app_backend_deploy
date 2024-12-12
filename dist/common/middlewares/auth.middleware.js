"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const user_repository_1 = require("./../../modules/user/user.repository");
const AppError_1 = require("./../utils/AppError");
/**
 * Middleware de autenticación que valida el token JWT en la solicitud.
 * Verifica el token, decodifica el ID del usuario y lo adjunta a la solicitud si es válido.
 * Si el token es inválido o el usuario no existe, devuelve un error.
 *
 * @param req - Objeto de solicitud de Express.
 * @param res - Objeto de respuesta de Express.
 * @param next - Función para pasar al siguiente middleware o manejar errores.
 */
const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '').trim();
    if (!token) {
        return next(new AppError_1.AppError('No autorizado', 401));
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret_key');
        if (typeof decodedToken === 'object' && 'id' in decodedToken) {
            const userId = decodedToken.id;
            const user = await user_repository_1.userRepo.findOne({ where: { id: userId }, relations: ['roles', 'roles.permissions'] });
            if (!user) {
                return next(new AppError_1.AppError('Usuario no encontrado', 404));
            }
            req.user = user;
            next();
        }
        else {
            return next(new AppError_1.AppError('Token inválido', 401));
        }
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.TokenExpiredError) {
            return next(new AppError_1.AppError('Token expirado, por favor inicia sesión de nuevo', 401));
        }
        return next(err);
    }
};
exports.authenticate = authenticate;
