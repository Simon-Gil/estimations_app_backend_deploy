"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
const permission_entity_1 = require("./permission.entity");
class Permission extends permission_entity_1.PermissionEntity {
    constructor(name, subject, action, description, parentPermission, childPermissions) {
        super();
        this.name = name;
        this.subject = subject;
        this.action = action;
        this.description = description;
        this.parentPermission = parentPermission;
        this.childPermissions ? childPermissions : null;
    }
}
exports.Permission = Permission;
