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
exports.ProfilePriceDTO = exports.ReceiveProfilePriceDTO = void 0;
const class_transformer_1 = require("class-transformer");
const profile_dto_1 = require("../../../company-structure/profile/profile.dto");
/**
 * DTO para recibir asociaciones precio-perfil.
 *
 * Esta clase se utiliza para recibir datos relacionados con el perfil y su precio,
 * donde el precio aún no está vinculado a una configuración de precios.
 */
class ReceiveProfilePriceDTO {
}
exports.ReceiveProfilePriceDTO = ReceiveProfilePriceDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => profile_dto_1.ProfileDTO),
    __metadata("design:type", profile_dto_1.ProfileDTO)
], ReceiveProfilePriceDTO.prototype, "profile", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ReceiveProfilePriceDTO.prototype, "priceH", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], ReceiveProfilePriceDTO.prototype, "priceConfigId", void 0);
/**
 * DTO para enviar la relaciones precio-perfil.
 *
 * Esta clase se utiliza para representar un perfil con su precio en una configuración de precios determinada.
 *
 */
class ProfilePriceDTO {
}
exports.ProfilePriceDTO = ProfilePriceDTO;
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], ProfilePriceDTO.prototype, "priceConfig", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], ProfilePriceDTO.prototype, "priceConfigId", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], ProfilePriceDTO.prototype, "profileId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", profile_dto_1.ProfileDTO)
], ProfilePriceDTO.prototype, "profile", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, class_transformer_1.Transform)(({ obj }) => obj.profile.name),
    __metadata("design:type", String)
], ProfilePriceDTO.prototype, "profileName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ProfilePriceDTO.prototype, "priceH", void 0);
