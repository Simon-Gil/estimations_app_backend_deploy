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
exports.FailedLoginAttemptEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/user.entity");
/**
 * @swagger
 * components:
 *   schemas:
 *     FailedLoginAttempt:
 *       type: object
 *       required:
 *         - attemptId
 *         - user
 *         - attemptTimestamp
 *       properties:
 *         attemptId:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *           description: ID único del intento de inicio de sesión fallido.
 *         user:
 *           $ref: '#/components/schemas/User'
 *           description: Usuario asociado al intento fallido.
 *         attemptTimestamp:
 *           type: string
 *           format: date-time
 *           example: "2024-12-06T14:00:00Z"
 *           description: Marca de tiempo del intento de inicio de sesión fallido.
 *         ipAddress:
 *           type: string
 *           nullable: true
 *           example: "192.168.1.1"
 *           description: Dirección IP desde donde se realizó el intento (puede ser nulo, no activo en funcionalidades de la aplicación).
 */
let FailedLoginAttemptEntity = class FailedLoginAttemptEntity {
};
exports.FailedLoginAttemptEntity = FailedLoginAttemptEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FailedLoginAttemptEntity.prototype, "attemptId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.id),
    __metadata("design:type", user_entity_1.UserEntity)
], FailedLoginAttemptEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], FailedLoginAttemptEntity.prototype, "attemptTimestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FailedLoginAttemptEntity.prototype, "ipAddress", void 0);
exports.FailedLoginAttemptEntity = FailedLoginAttemptEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'failed_login_attempts' })
], FailedLoginAttemptEntity);
