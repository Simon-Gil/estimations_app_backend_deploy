"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleRepo = void 0;
const typeorm_1 = require("typeorm");
const role_entity_1 = require("./role.entity");
const database_config_1 = __importDefault(require("../../../config/database.config"));
class RoleRepository extends typeorm_1.Repository {
    constructor() {
        super(role_entity_1.RoleEntity, database_config_1.default.createEntityManager());
    }
    // Obtener roles por id
    async findRolesByIds(roleIdArray) {
        const roles = await exports.roleRepo.findBy({ id: (0, typeorm_1.In)(roleIdArray) });
        if (!roles.length) {
            throw new Error('Roles not found');
        }
        return roles;
    }
}
exports.roleRepo = new RoleRepository();
