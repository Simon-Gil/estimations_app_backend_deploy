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
exports.EstimationDetailDTO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const EstimationStatus_1 = require("../EstimationStatus");
const opportunity_dto_1 = require("../../opportunity/opportunity.dto");
const user_dto_1 = require("../../user/dtos/user.dto");
const proposal_dto_1 = require("../../proposal/proposal.dto");
/**
 * DTO de estimación para estimaciones procesadas. Desglosado por categorías
 */
class EstimationDetailDTO {
}
exports.EstimationDetailDTO = EstimationDetailDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], EstimationDetailDTO.prototype, "maxCost", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], EstimationDetailDTO.prototype, "minCost", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], EstimationDetailDTO.prototype, "tasks", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EstimationDetailDTO.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EstimationDetailDTO.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], EstimationDetailDTO.prototype, "expDate", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEnum)(EstimationStatus_1.EstimationStatus),
    __metadata("design:type", String)
], EstimationDetailDTO.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], EstimationDetailDTO.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], EstimationDetailDTO.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => proposal_dto_1.ProposalDTO),
    __metadata("design:type", proposal_dto_1.ProposalDTO)
], EstimationDetailDTO.prototype, "proposal", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => opportunity_dto_1.OpportunityDTO),
    __metadata("design:type", opportunity_dto_1.OpportunityDTO)
], EstimationDetailDTO.prototype, "opportunity", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Type)(() => user_dto_1.UserDTO),
    __metadata("design:type", Array)
], EstimationDetailDTO.prototype, "users", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], EstimationDetailDTO.prototype, "hMax", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], EstimationDetailDTO.prototype, "hMin", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], EstimationDetailDTO.prototype, "estimationUsers", void 0);
