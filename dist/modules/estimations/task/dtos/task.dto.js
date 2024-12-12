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
exports.TaskDTO = void 0;
const class_transformer_1 = require("class-transformer");
const GeneralStatus_1 = require("../../../../common/utils/GeneralStatus");
const hrs_task_profile_dto_1 = require("../hrs-task-profile/hrs-task-profile.dto");
const second_level_category_dto_1 = require("../../../company-structure/task-categories/second-level-category/second-level-category.dto");
/**
 * DTO para el envío de tareas
 */
class TaskDTO {
}
exports.TaskDTO = TaskDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], TaskDTO.prototype, "maxCost", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], TaskDTO.prototype, "minCost", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], TaskDTO.prototype, "hMax", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], TaskDTO.prototype, "hMin", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TaskDTO.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TaskDTO.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], TaskDTO.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], TaskDTO.prototype, "users", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => hrs_task_profile_dto_1.HrsTaskProfileDTO),
    __metadata("design:type", Array)
], TaskDTO.prototype, "hrsTaskProfiles", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Object)
], TaskDTO.prototype, "estimation", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => second_level_category_dto_1.SecondLevelCategoryDTO),
    __metadata("design:type", second_level_category_dto_1.SecondLevelCategoryDTO)
], TaskDTO.prototype, "secondLevelCategory", void 0);
