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
exports.NotificationEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - id
 *         - message
 *         - read
 *         - createdAt
 *         - updatedAt
 *         - user
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "d5c4f3b2-a1e0-4e3b-a3c4-5e6f7e8d9c0a"
 *           description: ID único de la notificación.
 *         message:
 *           type: string
 *           example: "Tienes una nueva tarea asignada."
 *           description: Mensaje de la notificación.
 *         read:
 *           type: boolean
 *           example: false
 *           description: Indica si la notificación ha sido leída o no.
 *         link:
 *           type: string
 *           nullable: true
 *           example: "https://example.com/task/1"
 *           description: Enlace relacionado con la notificación, si lo hay.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-10-21T12:34:56Z"
 *           description: Fecha y hora en que se creó la notificación.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-10-21T12:34:56Z"
 *           description: Fecha y hora de la última actualización de la notificación.
 *         user:
 *           type: object
 *           $ref: '#/components/schemas/User'  # Suponiendo que tienes un esquema User definido
 *           description: Usuario asociado a esta notificación.
 */
let NotificationEntity = class NotificationEntity {
};
exports.NotificationEntity = NotificationEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'notification_id' }),
    __metadata("design:type", String)
], NotificationEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NotificationEntity.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], NotificationEntity.prototype, "read", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], NotificationEntity.prototype, "link", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], NotificationEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], NotificationEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.notifications),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], NotificationEntity.prototype, "user", void 0);
exports.NotificationEntity = NotificationEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'notification' })
], NotificationEntity);
