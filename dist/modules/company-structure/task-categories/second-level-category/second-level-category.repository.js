"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secLevelCatRepo = void 0;
const typeorm_1 = require("typeorm");
const database_config_1 = __importDefault(require("../../../../config/database.config"));
const second_level_category_entity_1 = require("./second-level-category.entity");
class SecondLevelCategoryRepository extends typeorm_1.Repository {
    constructor() {
        super(second_level_category_entity_1.SecondLevelCategoryEntity, database_config_1.default.createEntityManager());
    }
}
exports.secLevelCatRepo = new SecondLevelCategoryRepository();
