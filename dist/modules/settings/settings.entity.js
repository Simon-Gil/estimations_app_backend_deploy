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
exports.SettingsEntity = void 0;
const typeorm_1 = require("typeorm");
/**
 * @swagger
 * components:
 *   schemas:
 *     Settings:
 *       type: object
 *       required:
 *         - id
 *         - tag
 *         - expirationProposalDays
 *         - maxLoginAttempts
 *         - blockDurationMinutes
 *         - expirationResetTokenHours
 *         - expirationAuthTokenHours
 *         - sendDoneEstimationEmail
 *         - sendAssignedUserEmail
 *         - sendUserFinishedEmail
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: "Identificador único de la configuración (UUID)"
 *           example: "b3a3f295-1cfa-477f-bb1e-093f251830dd"
 *         tag:
 *           type: string
 *           description: "Etiqueta asociada a la configuración"
 *           example: "default-settings"
 *         expirationProposalDays:
 *           type: integer
 *           description: "Número de días para la expiración de la propuesta estimada"
 *           default: 30
 *           example: 30
 *         maxLoginAttempts:
 *           type: integer
 *           description: "Número máximo de intentos de inicio de sesión antes de bloquear al usuario"
 *           default: 5
 *           example: 5
 *         blockDurationMinutes:
 *           type: integer
 *           description: "Duración del bloqueo en minutos después de superar los intentos máximos de inicio de sesión"
 *           default: 5
 *           example: 5
 *         expirationResetTokenHours:
 *           type: integer
 *           description: "Número de horas para la expiración del token de restablecimiento de contraseña"
 *           default: 24
 *           example: 24
 *         expirationAuthTokenHours:
 *           type: integer
 *           description: "Número de horas para la expiración del token de autenticación"
 *           default: 5
 *           example: 5
 *         sendDoneEstimationEmail:
 *           type: boolean
 *           description: "Indica si se debe enviar un correo electrónico cuando la estimación se complete"
 *           default: true
 *           example: true
 *         sendAssignedUserEmail:
 *           type: boolean
 *           description: "Indica si se debe enviar un correo electrónico al usuario asignado"
 *           default: true
 *           example: true
 *         sendUserFinishedEmail:
 *           type: boolean
 *           description: "Indica si se debe enviar un correo electrónico cuando el usuario termine"
 *           default: true
 *           example: true
 */
let SettingsEntity = class SettingsEntity {
};
exports.SettingsEntity = SettingsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'settings_id' }),
    __metadata("design:type", String)
], SettingsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], SettingsEntity.prototype, "tag", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expiration_estimation_days', default: 30 }),
    __metadata("design:type", Number)
], SettingsEntity.prototype, "expirationProposalDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_login_attempts', default: 5 }),
    __metadata("design:type", Number)
], SettingsEntity.prototype, "maxLoginAttempts", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'block_duration_minutes', default: 5 }),
    __metadata("design:type", Number)
], SettingsEntity.prototype, "blockDurationMinutes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expiration_reset_token_hours', default: 24 }),
    __metadata("design:type", Number)
], SettingsEntity.prototype, "expirationResetTokenHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expiration_auth_token_hours', default: 5 }),
    __metadata("design:type", Number)
], SettingsEntity.prototype, "expirationAuthTokenHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'send_done_estimation_email', default: true }),
    __metadata("design:type", Boolean)
], SettingsEntity.prototype, "sendDoneEstimationEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'send_assigned_user_email', default: true }),
    __metadata("design:type", Boolean)
], SettingsEntity.prototype, "sendAssignedUserEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'send_user_finish_email', default: true }),
    __metadata("design:type", Boolean)
], SettingsEntity.prototype, "sendUserFinishedEmail", void 0);
exports.SettingsEntity = SettingsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'settings' })
], SettingsEntity);
