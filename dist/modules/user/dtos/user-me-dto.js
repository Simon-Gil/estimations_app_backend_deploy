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
exports.UserMeDTO = void 0;
const class_transformer_1 = require("class-transformer");
const grade_dto_1 = require("../../company-structure/grade/grade.dto");
const department_dto_1 = require("../../company-structure/department/department.dto");
const permissions_basic_dto_1 = require("../../roles_and_permissions/permission/dtos/permissions-basic.dto");
const role_basic_dto_1 = require("../../roles_and_permissions/role/role-basic-dto");
/**
 * DTO utilizado para transferir datos de usuarios cuando se obtiene el usuario actual del sistema
 */
class UserMeDTO {
}
exports.UserMeDTO = UserMeDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserMeDTO.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserMeDTO.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserMeDTO.prototype, "lastname", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserMeDTO.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => department_dto_1.DepartmentDTO),
    __metadata("design:type", department_dto_1.DepartmentDTO)
], UserMeDTO.prototype, "department", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => grade_dto_1.GradeDTO),
    __metadata("design:type", grade_dto_1.GradeDTO)
], UserMeDTO.prototype, "grade", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", permissions_basic_dto_1.PermissionBasicDTO)
], UserMeDTO.prototype, "permissions", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => role_basic_dto_1.RoleBasicDTO),
    __metadata("design:type", Array)
], UserMeDTO.prototype, "roles", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], UserMeDTO.prototype, "estimationUsers", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], UserMeDTO.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], UserMeDTO.prototype, "technicalManagedAccounts", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], UserMeDTO.prototype, "tasks", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], UserMeDTO.prototype, "commercialManagedAccounts", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], UserMeDTO.prototype, "technicalManagedOpportunities", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], UserMeDTO.prototype, "commercialManagedOpportunities", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], UserMeDTO.prototype, "hrsTaskProfiles", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], UserMeDTO.prototype, "passwordResetTokens", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], UserMeDTO.prototype, "notifications", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], UserMeDTO.prototype, "estimations", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], UserMeDTO.prototype, "isBlocked", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], UserMeDTO.prototype, "blockedUntil", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], UserMeDTO.prototype, "failedLoginAttempts", void 0);
