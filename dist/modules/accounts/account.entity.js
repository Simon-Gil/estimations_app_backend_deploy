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
exports.AccountEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./../user/user.entity");
const opportunity_entity_1 = require("./../opportunity/opportunity.entity");
const price_config_entity_1 = require("./price-config/price-config.entity");
/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - name
 *         - isCustomer
 *         - technicalManager
 *         - commercialManager
 *         - opportunities
 *         - priceConfig
 *         - legalName
 *         - cif
 *         - tlf
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "b2a45f82-ea78-4f79-bf6f-8c8a2c168f3f"
 *           description: ID único de la cuenta.
 *         email:
 *           type: string
 *           example: "example@example.com"
 *           description: Correo electrónico asociado a la cuenta.
 *         name:
 *           type: string
 *           example: "Nombre de la Cuenta"
 *           description: Nombre de la cuenta.
 *         isCustomer:
 *           type: boolean
 *           example: false
 *           description: Indica si la cuenta es un cliente.
 *         legalName:
 *           type: string
 *           nullable: true
 *           example: "Nombre Legal de la Empresa"
 *           description: Nombre legal de la cuenta (puede ser nulo).
 *         cif:
 *           type: string
 *           nullable: true
 *           example: "B12345678"
 *           description: Código de Identificación Fiscal de la cuenta (puede ser nulo).
 *         tlf:
 *           type: string
 *           nullable: true
 *           example: 34912345678
 *           description: Número de teléfono de contacto de la cuenta (puede ser nulo).
 *         technicalManager:
 *           type: object
 *           nullable: true
 *           $ref: '#/components/schemas/User'
 *           description: Información del responsable técnico (puede ser nulo).
 *         commercialManager:
 *           type: object
 *           $ref: '#/components/schemas/User'
 *           description: Información del responsable comercial.
 *         opportunities:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Opportunity'
 *           description: Lista de oportunidades asociadas a la cuenta.
 *         priceConfig:
 *           type: object
 *           $ref: '#/components/schemas/PriceConfig'
 *           description: Configuración de precios asociada a la cuenta.
 */
let AccountEntity = class AccountEntity {
};
exports.AccountEntity = AccountEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'account_id' }),
    __metadata("design:type", String)
], AccountEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], AccountEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], AccountEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_customer', default: false }),
    __metadata("design:type", Boolean)
], AccountEntity.prototype, "isCustomer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'legal_name', nullable: true, unique: true }),
    __metadata("design:type", String)
], AccountEntity.prototype, "legalName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", String)
], AccountEntity.prototype, "cif", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", String)
], AccountEntity.prototype, "tlf", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.technicalManagedAccounts, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'technical_manager_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], AccountEntity.prototype, "technicalManager", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.commercialManagedAccounts),
    (0, typeorm_1.JoinColumn)({ name: 'commercial_manager_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], AccountEntity.prototype, "commercialManager", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => opportunity_entity_1.OpportunityEntity, opportunity => opportunity.account),
    __metadata("design:type", Array)
], AccountEntity.prototype, "opportunities", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => price_config_entity_1.PriceConfigEntity, priceConfig => priceConfig.accounts),
    (0, typeorm_1.JoinColumn)({ name: 'price_config_id' }),
    __metadata("design:type", price_config_entity_1.PriceConfigEntity)
], AccountEntity.prototype, "priceConfig", void 0);
exports.AccountEntity = AccountEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'account' })
], AccountEntity);
