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
exports.TypologyEntity = void 0;
const typeorm_1 = require("typeorm");
const opportunity_entity_1 = require("../../opportunity/opportunity.entity");
/**
 * @swagger
 * components:
 *   schemas:
 *     Typology:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - opportunities
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
 *           description: ID único de la tipología.
 *         name:
 *           type: string
 *           example: "Tipo A"
 *           description: Nombre de la tipología.
 *         opportunities:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Opportunity'  # Asegúrate de que el esquema Opportunity esté definido
 *           description: Lista de oportunidades asociadas a esta tipología.
 */
let TypologyEntity = class TypologyEntity {
};
exports.TypologyEntity = TypologyEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'typology_id' }),
    __metadata("design:type", String)
], TypologyEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'typology_name', unique: true }),
    __metadata("design:type", String)
], TypologyEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => opportunity_entity_1.OpportunityEntity, opportunity => opportunity.typology),
    __metadata("design:type", Array)
], TypologyEntity.prototype, "opportunities", void 0);
exports.TypologyEntity = TypologyEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'typology' })
], TypologyEntity);
