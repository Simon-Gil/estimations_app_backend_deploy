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
exports.OpportunityDTO = void 0;
const class_transformer_1 = require("class-transformer");
const user_dto_1 = require("./../user/dtos/user.dto");
const proposal_dto_1 = require("./../proposal/proposal.dto");
const account_basic_dto_1 = require("../accounts/dtos/account-basic.dto");
/**
 * DTO utilizado para el envío de oportunidades comerciales
 */
class OpportunityDTO {
}
exports.OpportunityDTO = OpportunityDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], OpportunityDTO.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], OpportunityDTO.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], OpportunityDTO.prototype, "requirements", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => user_dto_1.UserDTO),
    __metadata("design:type", user_dto_1.UserDTO)
], OpportunityDTO.prototype, "technicalManager", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => user_dto_1.UserDTO),
    __metadata("design:type", user_dto_1.UserDTO)
], OpportunityDTO.prototype, "commercialManager", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => proposal_dto_1.ProposalDTO),
    __metadata("design:type", Array)
], OpportunityDTO.prototype, "proposals", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], OpportunityDTO.prototype, "typology", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => account_basic_dto_1.AccountBasicDTO),
    __metadata("design:type", account_basic_dto_1.AccountBasicDTO)
], OpportunityDTO.prototype, "account", void 0);
