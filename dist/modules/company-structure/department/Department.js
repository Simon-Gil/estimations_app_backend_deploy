"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Department = void 0;
const department_entity_1 = require("./department.entity");
class Department extends department_entity_1.DepartmentEntity {
    constructor(name) {
        super();
        this.name = name;
    }
}
exports.Department = Department;
