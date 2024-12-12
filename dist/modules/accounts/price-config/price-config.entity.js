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
exports.PriceConfigEntity = void 0;
const typeorm_1 = require("typeorm");
const profile_price_entity_1 = require("./price-profile/profile-price.entity");
const account_entity_1 = require("./../../accounts/account.entity");
/**
 * @swagger
 * components:
 *   schemas:
 *     PriceConfig:
 *       type: object
 *       required:
 *         - id
 *         - tag
 *         - createdAt
 *         - updatedAt
 *         - isDefault
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
 *           description: ID único de la configuración de precios.
 *         tag:
 *           type: string
 *           nullable: true
 *           example: "default"
 *           description: Etiqueta asociada a la configuración de precios.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-10-21T12:00:00Z"
 *           description: Fecha de creación de la configuración de precios.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-10-21T12:00:00Z"
 *           description: Fecha de la última actualización de la configuración de precios.
 *         isDefault:
 *           type: boolean
 *           example: false
 *           description: Indica si esta configuración es la predeterminada.
 *         profilePrices:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProfilePrice'
 *           description: Lista de precios asociados a los perfiles.
 *         accounts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Account'
 *           description: Lista de cuentas asociadas a esta configuración de precios.
 */
let PriceConfigEntity = class PriceConfigEntity {
};
exports.PriceConfigEntity = PriceConfigEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'price_config_id' }),
    __metadata("design:type", String)
], PriceConfigEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", String)
], PriceConfigEntity.prototype, "tag", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PriceConfigEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], PriceConfigEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_default', default: false }),
    __metadata("design:type", Boolean)
], PriceConfigEntity.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => profile_price_entity_1.ProfilePriceEntity, profilePrice => profilePrice.priceConfig),
    __metadata("design:type", Array)
], PriceConfigEntity.prototype, "profilePrices", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => account_entity_1.AccountEntity, account => account.priceConfig),
    __metadata("design:type", Array)
], PriceConfigEntity.prototype, "accounts", void 0);
exports.PriceConfigEntity = PriceConfigEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'price_config' })
], PriceConfigEntity);
