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
exports.SecondLevelCategoryDTO = void 0;
const class_transformer_1 = require("class-transformer");
const FirstLevelCategory_1 = require("../first-level-category/FirstLevelCategory");
const SecondLevelCategory_1 = require("./SecondLevelCategory");
const task_dto_1 = require("../../../estimations/task/dtos/task.dto");
class SecondLevelCategoryDTO extends SecondLevelCategory_1.SecondLevelCategory {
}
exports.SecondLevelCategoryDTO = SecondLevelCategoryDTO;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SecondLevelCategoryDTO.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SecondLevelCategoryDTO.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Exclude)() // Excluyendo la propiedad
    ,
    __metadata("design:type", FirstLevelCategory_1.FirstLevelCategory)
], SecondLevelCategoryDTO.prototype, "firstLevelCategory", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], SecondLevelCategoryDTO.prototype, "maxCost", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], SecondLevelCategoryDTO.prototype, "minCost", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], SecondLevelCategoryDTO.prototype, "hMax", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], SecondLevelCategoryDTO.prototype, "hMin", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => task_dto_1.TaskDTO),
    __metadata("design:type", Array)
], SecondLevelCategoryDTO.prototype, "tasks", void 0);
