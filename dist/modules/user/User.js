"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const user_entity_1 = require("./user.entity");
class User extends user_entity_1.UserEntity {
    constructor(name, lastname, department, grade, roles, email, password) {
        super();
        this.name = name;
        this.lastname = lastname;
        this.department = department;
        this.grade = grade;
        this.roles = roles;
        this.email = email;
        this.password = password;
    }
}
exports.User = User;
