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
exports.HrsTaskProfileEntity = void 0;
const typeorm_1 = require("typeorm");
const task_entity_1 = require("../task.entity");
const profile_entity_1 = require("../../../company-structure/profile/profile.entity");
const user_entity_1 = require("../../../user/user.entity");
const GeneralStatus_1 = require("../../../../common/utils/GeneralStatus");
/**
 * @swagger
 * components:
 *   schemas:
 *     HrsTaskProfile:
 *       type: object
 *       required:
 *         - profileId
 *         - taskId
 *         - hMin
 *         - hMax
 *         - status
 *         - task
 *         - profile
 *         - user
 *       properties:
 *         profileId:
 *           type: string
 *           description: ID del perfil asociado.
 *           example: "a1c3f3b4-e5c6-7d8e-9a0b-1c2d3e4f5g6"
 *         taskId:
 *           type: string
 *           description: ID de la tarea asociada.
 *           example: "b2c3f4d5-e6f7-8a9a-0b1c-2d3e4f5g6h7"
 *         hMin:
 *           type: number
 *           format: decimal
 *           example: 5.00
 *           description: Horas mínimas asignadas a la tarea del perfil.
 *         hMax:
 *           type: number
 *           format: decimal
 *           example: 10.00
 *           description: Horas máximas asignadas a la tarea del perfil.
 *         status:
 *           type: string
 *           enum: [pending, completed, canceled]  # Enum de GeneralStatus
 *           description: Estado actual del perfil en relación con la tarea.
 *           example: "pending"
 *         task:
 *           type: object
 *           $ref: '#/components/schemas/Task'  # Suponiendo que tienes un esquema Task definido
 *           description: Tarea asociada a este perfil.
 *         profile:
 *           type: object
 *           $ref: '#/components/schemas/Profile'  # Suponiendo que tienes un esquema Profile definido
 *           description: Perfil asociado a esta tarea.
 *         user:
 *           type: object
 *           $ref: '#/components/schemas/User'  # Suponiendo que tienes un esquema User definido
 *           description: Usuario que gestiona esta relación de tarea y perfil.
 */
let HrsTaskProfileEntity = class HrsTaskProfileEntity {
};
exports.HrsTaskProfileEntity = HrsTaskProfileEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'profile_id' }),
    __metadata("design:type", String)
], HrsTaskProfileEntity.prototype, "profileId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'task_id' }),
    __metadata("design:type", String)
], HrsTaskProfileEntity.prototype, "taskId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'h_min', type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], HrsTaskProfileEntity.prototype, "hMin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'h_max', type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], HrsTaskProfileEntity.prototype, "hMax", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: GeneralStatus_1.GeneralStatus,
        default: GeneralStatus_1.GeneralStatus.PENDING
    }),
    __metadata("design:type", String)
], HrsTaskProfileEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => task_entity_1.TaskEntity, task => task.hrsTaskProfiles, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'task_id' }),
    __metadata("design:type", task_entity_1.TaskEntity
    // Relación con Profile
    )
], HrsTaskProfileEntity.prototype, "task", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => profile_entity_1.ProfileEntity, profile => profile.hrsTaskProfiles),
    (0, typeorm_1.JoinColumn)({ name: 'profile_id' }),
    __metadata("design:type", profile_entity_1.ProfileEntity
    // Relación con User
    )
], HrsTaskProfileEntity.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.hrsTaskProfiles),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], HrsTaskProfileEntity.prototype, "user", void 0);
exports.HrsTaskProfileEntity = HrsTaskProfileEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'hrs_task_profile' })
], HrsTaskProfileEntity);
