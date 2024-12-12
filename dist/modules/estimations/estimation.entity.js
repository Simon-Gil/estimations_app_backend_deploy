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
exports.EstimationEntity = void 0;
const typeorm_1 = require("typeorm");
const EstimationStatus_1 = require("./EstimationStatus");
const task_entity_1 = require("./task/task.entity");
const estimation_user_entity_1 = require("./estimation-user/estimation-user.entity");
const proposal_entity_1 = require("./../proposal/proposal.entity");
/**
 * @swagger
 * components:
 *   schemas:
 *     Estimation:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - expDate
 *         - status
 *         - createdAt
 *         - updatedAt
 *         - opportunity
 *         - tasks
 *         - users
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "f1a34d1e-4b56-4b5b-bb5f-123456789abc"
 *           description: ID único de la estimación.
 *         name:
 *           type: string
 *           example: "Estimación de Proyecto"
 *           description: Nombre de la estimación.
 *         expDate:
 *           type: string
 *           format: date
 *           example: "2024-12-31"
 *           description: Fecha de expiración de la estimación.
 *         status:
 *           type: string
 *           enum: [pending, current, done]  # Enum de EstimationStatus
 *           example: "pending"
 *           description: Estado actual de la estimación.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T12:00:00Z"
 *           description: Fecha de creación de la estimación.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-02T12:00:00Z"
 *           description: Fecha de la última actualización de la estimación.
 *         proposal:
 *           type: object
 *           $ref: '#/components/schemas/Proposal'
 *           description: Propuesta asociada a esta estimación.
 *         tasks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Task'  # Suponiendo que tienes un esquema Task definido
 *           description: Lista de tareas asociadas a esta estimación.
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'  # Suponiendo que tienes un esquema User definido
 *           description: Lista de usuarios asociados a esta estimación.
 */
let EstimationEntity = class EstimationEntity {
    //Getter para acceder a Opportunity como propiedad
    get opportunity() {
        return this.proposal.opportunity;
    }
    // Getter y setter para acceder a users como propiedad
    get users() {
        return this.estimationUsers ? this.estimationUsers.map(eu => eu.user) : [];
    }
    set users(users) {
        this.estimationUsers = users.map(user => {
            const estimationUser = new estimation_user_entity_1.EstimationUserEntity();
            estimationUser.user = user;
            estimationUser.estimation = this;
            return estimationUser;
        });
    }
};
exports.EstimationEntity = EstimationEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'estimation_id' }),
    __metadata("design:type", String)
], EstimationEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EstimationStatus_1.EstimationStatus,
        default: EstimationStatus_1.EstimationStatus.PENDING
    }),
    __metadata("design:type", String)
], EstimationEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], EstimationEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], EstimationEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.TaskEntity, task => task.estimation),
    __metadata("design:type", Array)
], EstimationEntity.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => estimation_user_entity_1.EstimationUserEntity, estimationUser => estimationUser.estimation),
    __metadata("design:type", Array)
], EstimationEntity.prototype, "estimationUsers", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => proposal_entity_1.ProposalEntity, proposal => proposal.estimation, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'proposal_id' }),
    __metadata("design:type", proposal_entity_1.ProposalEntity)
], EstimationEntity.prototype, "proposal", void 0);
exports.EstimationEntity = EstimationEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'estimation' })
], EstimationEntity);
