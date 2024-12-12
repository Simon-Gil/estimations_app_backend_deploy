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
exports.SecondLevelCategoryEntity = void 0;
const typeorm_1 = require("typeorm");
const first_level_category_entity_1 = require("../first-level-category/first-level-category.entity");
const task_entity_1 = require("../../../estimations/task/task.entity");
/**
 * @swagger
 * components:
 *   schemas:
 *     SecondLevelCategory:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "f1e2d3c4-b5a6-7c8d-9e0f-g1h2i3j4k5l6"
 *           description: ID único de la categoría de segundo nivel.
 *         name:
 *           type: string
 *           example: "Subcategory A"
 *           description: Nombre de la categoría de segundo nivel, debe ser único.
 *         firstLevelCategory:
 *           $ref: '#/components/schemas/FirstLevelCategory'  # Asegúrate de que el esquema FirstLevelCategory esté definido
 *           description: Categoría de primer nivel asociada a esta categoría de segundo nivel.
 *         tasks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Task'  # Asegúrate de que el esquema Task esté definido
 *           description: Lista de tareas asociadas a esta categoría de segundo nivel.
 */
let SecondLevelCategoryEntity = class SecondLevelCategoryEntity {
};
exports.SecondLevelCategoryEntity = SecondLevelCategoryEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'second_level_category_id' }),
    __metadata("design:type", String)
], SecondLevelCategoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'second_level_category_name', unique: true }),
    __metadata("design:type", String)
], SecondLevelCategoryEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => first_level_category_entity_1.FirstLevelCategoryEntity, firstLevelCategory => firstLevelCategory.secondLevelCategories),
    (0, typeorm_1.JoinColumn)({ name: 'first_level_category_id' }),
    __metadata("design:type", first_level_category_entity_1.FirstLevelCategoryEntity
    // Relacion con Task
    )
], SecondLevelCategoryEntity.prototype, "firstLevelCategory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.TaskEntity, task => task.secondLevelCategory),
    __metadata("design:type", Array)
], SecondLevelCategoryEntity.prototype, "tasks", void 0);
exports.SecondLevelCategoryEntity = SecondLevelCategoryEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'second_level_category' })
], SecondLevelCategoryEntity);
