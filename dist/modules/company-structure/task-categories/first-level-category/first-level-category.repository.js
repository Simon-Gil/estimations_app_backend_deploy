"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstLevelCatRepo = void 0;
const typeorm_1 = require("typeorm");
const database_config_1 = __importDefault(require("../../../../config/database.config"));
const first_level_category_entity_1 = require("./first-level-category.entity");
class FirstLevelCategoryRepository extends typeorm_1.Repository {
    constructor() {
        super(first_level_category_entity_1.FirstLevelCategoryEntity, database_config_1.default.createEntityManager());
    }
}
exports.firstLevelCatRepo = new FirstLevelCategoryRepository();
