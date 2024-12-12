"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecondLevelCategory = void 0;
const second_level_category_entity_1 = require("./second-level-category.entity");
class SecondLevelCategory extends second_level_category_entity_1.SecondLevelCategoryEntity {
    constructor(name, firstLevelCategory) {
        super();
        this.name = name;
        this.firstLevelCategory = firstLevelCategory;
    }
}
exports.SecondLevelCategory = SecondLevelCategory;
