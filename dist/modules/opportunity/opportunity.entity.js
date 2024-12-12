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
exports.OpportunityEntity = void 0;
const typeorm_1 = require("typeorm");
const OpportunityStatus_1 = require("./OpportunityStatus");
const account_entity_1 = require("./../accounts/account.entity");
const typology_entity_1 = require("../company-structure/typology/typology.entity");
const user_entity_1 = require("../user/user.entity");
const document_entity_1 = require("./opportunity-documents/document.entity");
const proposal_entity_1 = require("./../proposal/proposal.entity");
/**
 * @swagger
 * components:
 *   schemas:
 *     Opportunity:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - requirements
 *         - status
 *         - createdAt
 *         - updatedAt
 *         - account
 *         - typology
 *         - technicalManager
 *         - commercialManager
 *         - proposals
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "f2c5d4b3-a1c2-4e5e-b6d7-8c9f0e1a2b3c"
 *           description: ID único de la oportunidad.
 *         name:
 *           type: string
 *           example: "Oportunidad de Venta"
 *           description: Nombre único de la oportunidad.
 *         requirements:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Requerimiento 1", "Requerimiento 2"]
 *           description: Lista de requisitos asociados a la oportunidad.
 *         status:
 *           type: string
 *           enum: [pending, in_progress, won, lost]
 *           description: Estado actual de la oportunidad.
 *           example: "pending"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-10-21T12:34:56Z"
 *           description: Fecha y hora en que se creó la oportunidad.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-10-21T12:34:56Z"
 *           description: Fecha y hora de la última actualización de la oportunidad.
 *         account:
 *           type: object
 *           $ref: '#/components/schemas/Account'
 *           description: Cuenta asociada a la oportunidad.
 *         typology:
 *           type: object
 *           $ref: '#/components/schemas/Typology'
 *           description: Tipología asociada a la oportunidad.
 *         technicalManager:
 *           type: object
 *           $ref: '#/components/schemas/User'
 *           description: Usuario responsable técnico de la oportunidad.
 *         commercialManager:
 *           type: object
 *           $ref: '#/components/schemas/User'
 *           description: Usuario responsable comercial de la oportunidad.
 *         proposals:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/Proposal'
 *           description: Lista de propuestas asociadas a la oportunidad.
 */
let OpportunityEntity = class OpportunityEntity {
    // Get para estimations a través de Proposals
    get estimations() {
        return this.proposals.map((proposal) => proposal.estimation).filter((e) => e !== undefined);
    }
    storeTypology() {
        this.originalTypo == this.typology;
    }
    checkTypoUpdate() {
        if (this.typology !== this.originalTypo) {
            throw new Error('El campo "typology_id" no puede ser actualizado.');
        }
    }
};
exports.OpportunityEntity = OpportunityEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'opportunity_id' }),
    __metadata("design:type", String)
], OpportunityEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, name: 'opportunity_name' }),
    __metadata("design:type", String)
], OpportunityEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true }),
    __metadata("design:type", Array)
], OpportunityEntity.prototype, "requirements", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: OpportunityStatus_1.OpportunityStatus,
        default: OpportunityStatus_1.OpportunityStatus.PENDING
    }),
    __metadata("design:type", String)
], OpportunityEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], OpportunityEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], OpportunityEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.AccountEntity, account => account.opportunities),
    (0, typeorm_1.JoinColumn)({ name: 'account_id' }),
    __metadata("design:type", account_entity_1.AccountEntity)
], OpportunityEntity.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => typology_entity_1.TypologyEntity, typology => typology.opportunities) // La columna no es actualizable
    ,
    __metadata("design:type", typology_entity_1.TypologyEntity
    // Relación con User para responsable técnico
    )
], OpportunityEntity.prototype, "typology", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.technicalManagedOpportunities),
    (0, typeorm_1.JoinColumn)({ name: 'technical_manager_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], OpportunityEntity.prototype, "technicalManager", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.commercialManagedOpportunities),
    (0, typeorm_1.JoinColumn)({ name: 'commercial_manager_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], OpportunityEntity.prototype, "commercialManager", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => proposal_entity_1.ProposalEntity, proposal => proposal.opportunity),
    __metadata("design:type", Array)
], OpportunityEntity.prototype, "proposals", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_entity_1.DocumentEntity, document => document.opportunity),
    __metadata("design:type", Array)
], OpportunityEntity.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OpportunityEntity.prototype, "storeTypology", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OpportunityEntity.prototype, "checkTypoUpdate", null);
exports.OpportunityEntity = OpportunityEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'opportunity' })
], OpportunityEntity);
