"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grade = void 0;
const grade_entity_1 = require("./grade.entity");
class Grade extends grade_entity_1.GradeEntity {
    constructor(name) {
        super();
        this.name = name;
    }
}
exports.Grade = Grade;
