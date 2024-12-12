"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirstLevelCategory = void 0;
const first_level_category_entity_1 = require("./first-level-category.entity");
class FirstLevelCategory extends first_level_category_entity_1.FirstLevelCategoryEntity {
    constructor(name) {
        super();
        this.name = name;
    }
}
exports.FirstLevelCategory = FirstLevelCategory;
