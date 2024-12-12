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
exports.ProfileEntity = void 0;
const typeorm_1 = require("typeorm");
const profile_price_entity_1 = require("./../../accounts/price-config/price-profile/profile-price.entity");
const hrs_task_profile_entity_1 = require("../../estimations/task/hrs-task-profile/hrs-task-profile.entity");
/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
 *           description: ID único del perfil.
 *         name:
 *           type: string
 *           example: "Developer"
 *           description: Nombre del perfil, debe ser único.
 *         profilePrices:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProfilePrice'  # Asegúrate de que el esquema ProfilePrice esté definido
 *           description: Lista de precios asociados a este perfil.
 *         hrsTaskProfiles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/HrsTaskProfile'  # Asegúrate de que el esquema HrsTaskProfile esté definido
 *           description: Lista de perfiles de tarea asociados a este perfil.
 */
let ProfileEntity = class ProfileEntity {
};
exports.ProfileEntity = ProfileEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'profile_id' }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'profile_name', unique: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => profile_price_entity_1.ProfilePriceEntity, profilePrice => profilePrice.profile),
    __metadata("design:type", Array)
], ProfileEntity.prototype, "profilePrices", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => hrs_task_profile_entity_1.HrsTaskProfileEntity, hrsTaskProfile => hrsTaskProfile.profile),
    __metadata("design:type", Array)
], ProfileEntity.prototype, "hrsTaskProfiles", void 0);
exports.ProfileEntity = ProfileEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'profile' })
], ProfileEntity);
