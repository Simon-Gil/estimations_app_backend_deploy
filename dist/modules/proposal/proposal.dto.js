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
exports.ProposalDTO = void 0;
const class_transformer_1 = require("class-transformer");
const estimation_dto_1 = require("./../estimations/dtos/estimation.dto");
const opportunity_dto_1 = require("./../opportunity/opportunity.dto");
class ProposalDTO {
}
exports.ProposalDTO = ProposalDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProposalDTO.prototype, "techProposal", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProposalDTO.prototype, "goalAndContext", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", estimation_dto_1.EstimationDTO)
], ProposalDTO.prototype, "estimation", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ProposalDTO.prototype, "total", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ProposalDTO.prototype, "estimatedMonths", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], ProposalDTO.prototype, "expDate", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", opportunity_dto_1.OpportunityDTO)
], ProposalDTO.prototype, "opportunity", void 0);
