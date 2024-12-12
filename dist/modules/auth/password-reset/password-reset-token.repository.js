"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetTokenRepo = void 0;
const typeorm_1 = require("typeorm");
const database_config_1 = __importDefault(require("./../../../config/database.config"));
const password_reset_token_entity_1 = require("./password-reset-token.entity");
class PasswordResetTokenRepository extends typeorm_1.Repository {
    constructor() {
        super(password_reset_token_entity_1.PasswordResetTokenEntity, database_config_1.default.createEntityManager());
    }
}
exports.passwordResetTokenRepo = new PasswordResetTokenRepository();
