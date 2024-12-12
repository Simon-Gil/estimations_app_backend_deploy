"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetTokenEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/user.entity");
/**
 * @swagger
 * components:
 *   schemas:
 *     PasswordResetToken:
 *       type: object
 *       required:
 *         - id
 *         - token
 *         - createdAt
 *         - expiresAt
 *         - used
 *         - user
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
 *           description: ID único del token de restablecimiento de contraseña.
 *         token:
 *           type: string
 *           example: "abc123xyz456"
 *           description: Token único generado para el restablecimiento de contraseña.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-10-21T12:34:56Z"
 *           description: Fecha y hora en que se creó el token.
 *         expiresAt:
 *           type: string
 *           format: date-time
 *           example: "2024-10-22T12:34:56Z"
 *           description: Fecha y hora en que expira el token.
 *         used:
 *           type: boolean
 *           example: false
 *           description: Indica si el token ha sido utilizado.
 *         user:
 *           type: object
 *           $ref: '#/components/schemas/User'  # Suponiendo que tienes un esquema User definido
 *           description: Usuario al que pertenece el token de restablecimiento.
 */
let PasswordResetTokenEntity = class PasswordResetTokenEntity {
};
exports.PasswordResetTokenEntity = PasswordResetTokenEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'password_reset_token_id' }),
    __metadata("design:type", String)
], PasswordResetTokenEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], PasswordResetTokenEntity.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PasswordResetTokenEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', name: 'expires_at' }),
    __metadata("design:type", Date)
], PasswordResetTokenEntity.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], PasswordResetTokenEntity.prototype, "used", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.passwordResetTokens, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], PasswordResetTokenEntity.prototype, "user", void 0);
exports.PasswordResetTokenEntity = PasswordResetTokenEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'password_reset_token' })
], PasswordResetTokenEntity);
