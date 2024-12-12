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
exports.HrsTaskProfileDTO = void 0;
const class_transformer_1 = require("class-transformer");
const GeneralStatus_1 = require("../../../../common/utils/GeneralStatus");
const profile_dto_1 = require("../../../company-structure/profile/profile.dto");
const user_dto_1 = require("../../../user/dtos/user.dto");
const task_dto_1 = require("../dtos/task.dto");
/**
 * DTO para el envío de relaciones tarea-perfil
 */
class HrsTaskProfileDTO {
}
exports.HrsTaskProfileDTO = HrsTaskProfileDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], HrsTaskProfileDTO.prototype, "maxCost", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], HrsTaskProfileDTO.prototype, "minCost", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => profile_dto_1.ProfileDTO),
    __metadata("design:type", profile_dto_1.ProfileDTO)
], HrsTaskProfileDTO.prototype, "profile", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], HrsTaskProfileDTO.prototype, "hMin", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], HrsTaskProfileDTO.prototype, "hMax", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], HrsTaskProfileDTO.prototype, "taskId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], HrsTaskProfileDTO.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", task_dto_1.TaskDTO)
], HrsTaskProfileDTO.prototype, "task", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], HrsTaskProfileDTO.prototype, "profileId", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", user_dto_1.UserDTO)
], HrsTaskProfileDTO.prototype, "user", void 0);
