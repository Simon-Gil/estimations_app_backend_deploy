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
exports.FirstLevelCategoryEntity = void 0;
const typeorm_1 = require("typeorm");
const second_level_category_entity_1 = require("../second-level-category/second-level-category.entity");
/**
 * @swagger
 * components:
 *   schemas:
 *     FirstLevelCategory:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - secondLevelCategories
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
 *           description: ID único de la categoría de primer nivel.
 *         name:
 *           type: string
 *           example: "Tecnología"
 *           description: Nombre de la categoría de primer nivel, debe ser único.
 *         secondLevelCategories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SecondLevelCategory'  # Suponiendo que tienes un esquema SecondLevelCategory definido
 *           description: Lista de categorías de segundo nivel asociadas a esta categoría.
 */
let FirstLevelCategoryEntity = class FirstLevelCategoryEntity {
};
exports.FirstLevelCategoryEntity = FirstLevelCategoryEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'first_level_category_id' }),
    __metadata("design:type", String)
], FirstLevelCategoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'first_level_category_name', unique: true }),
    __metadata("design:type", String)
], FirstLevelCategoryEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => second_level_category_entity_1.SecondLevelCategoryEntity, secondLevelCategory => secondLevelCategory.firstLevelCategory),
    __metadata("design:type", Array)
], FirstLevelCategoryEntity.prototype, "secondLevelCategories", void 0);
exports.FirstLevelCategoryEntity = FirstLevelCategoryEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'first_level_category' })
], FirstLevelCategoryEntity);
