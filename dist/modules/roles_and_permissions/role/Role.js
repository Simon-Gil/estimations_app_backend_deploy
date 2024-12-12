"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const role_entity_1 = require("./role.entity");
class Role extends role_entity_1.RoleEntity {
    constructor(name, department, grade, permissions) {
        super();
        this.name = name;
        department ? this.department = department : null;
        grade ? this.grade = grade : null;
        permissions ? this.permissions = permissions : null;
    }
}
exports.Role = Role;
