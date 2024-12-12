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
exports.ProfilePriceEntity = void 0;
const typeorm_1 = require("typeorm");
const price_config_entity_1 = require("../price-config.entity");
const profile_entity_1 = require("../../../company-structure/profile/profile.entity");
/**
 * @swagger
 * components:
 *   schemas:
 *     ProfilePrice:
 *       type: object
 *       required:
 *         - priceConfigId
 *         - profileId
 *         - priceH
 *       properties:
 *         priceConfigId:
 *           type: string
 *           format: uuid
 *           example: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
 *           description: ID único de la configuración de precios asociada.
 *         profileId:
 *           type: string
 *           format: uuid
 *           example: "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7"
 *           description: ID único del perfil asociado.
 *         priceH:
 *           type: number
 *           format: decimal
 *           example: 100.50
 *           description: Precio por hora.
 *         priceConfig:
 *           $ref: '#/components/schemas/PriceConfig'  # Asegúrate de que el esquema PriceConfig esté definido
 *           description: Configuración de precios asociada a esta entrada.
 *         profile:
 *           $ref: '#/components/schemas/Profile'  # Asegúrate de que el esquema Profile esté definido
 *           description: Perfil asociado a esta entrada.
 */
let ProfilePriceEntity = class ProfilePriceEntity {
};
exports.ProfilePriceEntity = ProfilePriceEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'price_config_id' }),
    __metadata("design:type", String)
], ProfilePriceEntity.prototype, "priceConfigId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'profile_id' }),
    __metadata("design:type", String)
], ProfilePriceEntity.prototype, "profileId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'price_h', type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], ProfilePriceEntity.prototype, "priceH", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => price_config_entity_1.PriceConfigEntity, priceConfig => priceConfig.profilePrices),
    (0, typeorm_1.JoinColumn)({ name: 'price_config_id' }),
    __metadata("design:type", price_config_entity_1.PriceConfigEntity)
], ProfilePriceEntity.prototype, "priceConfig", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => profile_entity_1.ProfileEntity, profile => profile.profilePrices),
    (0, typeorm_1.JoinColumn)({ name: 'profile_id' }),
    __metadata("design:type", profile_entity_1.ProfileEntity)
], ProfilePriceEntity.prototype, "profile", void 0);
exports.ProfilePriceEntity = ProfilePriceEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'profile_price' })
], ProfilePriceEntity);
