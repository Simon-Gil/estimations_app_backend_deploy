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
exports.ProposalEntity = void 0;
const typeorm_1 = require("typeorm");
const estimation_entity_1 = require("../estimations/estimation.entity");
const opportunity_entity_1 = require("../opportunity/opportunity.entity");
const ProposalStatus_1 = require("./ProposalStatus");
/**
 * @swagger
 * components:
 *   schemas:
 *     Proposal:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: "Identificador único de la propuesta (UUID)"
 *           example: "e6b77d1e-b474-4d19-9c8f-e8a8cbec63b9"
 *         name:
 *           type: string
 *           description: "Nombre de la propuesta, solo asignado cuando la propuesta se finaliza"
 *           example: "Propuesta de software personalizado"
 *         techProposal:
 *           type: string
 *           description: "Descripción técnica de la propuesta"
 *           example: "Desarrollo de software en Python y React."
 *         goalAndContext:
 *           type: string
 *           description: "Objetivo y contexto de la propuesta"
 *           example: "El objetivo de este proyecto es crear una solución personalizada para gestionar inventarios."
 *         estimatedMonths:
 *           type: integer
 *           nullable: true
 *           description: "Cantidad estimada de meses para completar la propuesta"
 *           example: 6
 *         expDate:
 *           type: string
 *           format: date
 *           nullable: true
 *           description: "Fecha de expiración de la propuesta"
 *           example: "2025-12-31"
 *         total:
 *           type: number
 *           format: decimal
 *           nullable: true
 *           description: "Total estimado del valor de la propuesta"
 *           example: 10000.50
 *         status:
 *           type: string
 *           enum: [PENDING, APPROVED, REJECTED]
 *           description: "Estado de la propuesta"
 *           example: "PENDING"
 *         estimation:
 *           type: object
 *           description: "Estimación vinculada a la propuesta"
 *           properties:
 *             id:
 *               type: string
 *               description: "Identificador único de la estimación"
 *               example: "9f68be42-b03c-474d-b59a-f9bdbbc8de78"
 *         opportunity:
 *           type: object
 *           description: "Oportunidad asociada a la propuesta"
 *           properties:
 *             id:
 *               type: string
 *               description: "Identificador único de la oportunidad"
 *               example: "b7a19b77-56fa-42f4-8c7d-3baf1b710421"
 */
let ProposalEntity = class ProposalEntity {
};
exports.ProposalEntity = ProposalEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'proposal_id' }),
    __metadata("design:type", String)
], ProposalEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProposalEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tech_proposal' }),
    __metadata("design:type", String)
], ProposalEntity.prototype, "techProposal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'goal_and_context' }),
    __metadata("design:type", String)
], ProposalEntity.prototype, "goalAndContext", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estimated_months', nullable: true }),
    __metadata("design:type", Number)
], ProposalEntity.prototype, "estimatedMonths", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'exp_date', nullable: true }),
    __metadata("design:type", Date)
], ProposalEntity.prototype, "expDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total', nullable: true, type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], ProposalEntity.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProposalStatus_1.ProposalStatus,
        default: ProposalStatus_1.ProposalStatus.PENDING
    }),
    __metadata("design:type", String)
], ProposalEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => estimation_entity_1.EstimationEntity, estimation => estimation.proposal),
    __metadata("design:type", estimation_entity_1.EstimationEntity)
], ProposalEntity.prototype, "estimation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => opportunity_entity_1.OpportunityEntity, opportunity => opportunity.proposals, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'opportunity_id' }),
    __metadata("design:type", opportunity_entity_1.OpportunityEntity)
], ProposalEntity.prototype, "opportunity", void 0);
exports.ProposalEntity = ProposalEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'proposal' })
], ProposalEntity);
