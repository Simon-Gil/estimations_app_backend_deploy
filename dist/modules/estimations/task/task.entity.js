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
exports.TaskEntity = void 0;
const typeorm_1 = require("typeorm");
const second_level_category_entity_1 = require("../../company-structure/task-categories/second-level-category/second-level-category.entity");
const estimation_entity_1 = require("../estimation.entity");
const hrs_task_profile_entity_1 = require("./hrs-task-profile/hrs-task-profile.entity");
const user_entity_1 = require("../../user/user.entity");
const GeneralStatus_1 = require("../../../common/utils/GeneralStatus");
/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - id
 *         - description
 *         - status
 *         - secondLevelCategory
 *         - estimation
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "f1e2d3c4-b5a6-7c8d-9e0f-g1h2i3j4k5l6"
 *           description: ID único de la tarea.
 *         description:
 *           type: string
 *           example: "Realizar la estimación del proyecto."
 *           description: Descripción de la tarea.
 *         status:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, COMPLETED]
 *           default: PENDING
 *           description: Estado de la tarea, puede ser PENDING, IN_PROGRESS o COMPLETED.
 *         secondLevelCategory:
 *           $ref: '#/components/schemas/SecondLevelCategory'  # Asegúrate de que el esquema SecondLevelCategory esté definido
 *           description: Categoría de segundo nivel a la que pertenece esta tarea.
 *         estimation:
 *           $ref: '#/components/schemas/Estimation'  # Asegúrate de que el esquema Estimation esté definido
 *           description: Estimación asociada a esta tarea.
 *         hrsTaskProfiles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/HrsTaskProfile'  # Asegúrate de que el esquema HrsTaskProfile esté definido
 *           description: Lista de perfiles de horas asociados a esta tarea.
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'  # Asegúrate de que el esquema User esté definido
 *           description: Lista de usuarios asociados a esta tarea.
 */
let TaskEntity = class TaskEntity {
};
exports.TaskEntity = TaskEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'task_id' }),
    __metadata("design:type", String)
], TaskEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TaskEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: GeneralStatus_1.GeneralStatus,
        default: GeneralStatus_1.GeneralStatus.PENDING
    }),
    __metadata("design:type", String)
], TaskEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => second_level_category_entity_1.SecondLevelCategoryEntity, secondLevelCategory => secondLevelCategory.tasks),
    (0, typeorm_1.JoinColumn)({ name: 'second_level_category_id' }),
    __metadata("design:type", second_level_category_entity_1.SecondLevelCategoryEntity)
], TaskEntity.prototype, "secondLevelCategory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => estimation_entity_1.EstimationEntity, estimation => estimation.tasks, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'estimation_id' }),
    __metadata("design:type", estimation_entity_1.EstimationEntity)
], TaskEntity.prototype, "estimation", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => hrs_task_profile_entity_1.HrsTaskProfileEntity, hrsTaskProfile => hrsTaskProfile.task, { cascade: true }),
    __metadata("design:type", Array)
], TaskEntity.prototype, "hrsTaskProfiles", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.UserEntity, user => user.tasks),
    __metadata("design:type", Array)
], TaskEntity.prototype, "users", void 0);
exports.TaskEntity = TaskEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'task' })
], TaskEntity);
