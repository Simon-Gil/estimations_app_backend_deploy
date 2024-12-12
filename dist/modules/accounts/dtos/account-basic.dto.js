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
exports.AccountBasicDTO = void 0;
const class_transformer_1 = require("class-transformer");
const user_dto_1 = require("./../../user/dtos/user.dto");
const price_config_dto_1 = require("../price-config/price-config.dto");
const opportunity_dto_1 = require("./../../opportunity/opportunity.dto");
/**
 * DTO básico que incluye solo id y nombre de  cuenta
 */
class AccountBasicDTO {
}
exports.AccountBasicDTO = AccountBasicDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AccountBasicDTO.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AccountBasicDTO.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], AccountBasicDTO.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Boolean)
], AccountBasicDTO.prototype, "isCustomer", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, class_transformer_1.Type)(() => price_config_dto_1.PriceConfigDTO),
    __metadata("design:type", price_config_dto_1.PriceConfigDTO)
], AccountBasicDTO.prototype, "priceConfig", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, class_transformer_1.Type)(() => user_dto_1.UserDTO),
    __metadata("design:type", user_dto_1.UserDTO)
], AccountBasicDTO.prototype, "technicalManager", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, class_transformer_1.Type)(() => user_dto_1.UserDTO),
    __metadata("design:type", user_dto_1.UserDTO)
], AccountBasicDTO.prototype, "commercialManager", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, class_transformer_1.Type)(() => opportunity_dto_1.OpportunityDTO),
    __metadata("design:type", Array)
], AccountBasicDTO.prototype, "opportunities", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], AccountBasicDTO.prototype, "cif", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], AccountBasicDTO.prototype, "legalName", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], AccountBasicDTO.prototype, "tlf", void 0);
