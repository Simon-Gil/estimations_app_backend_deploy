"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionRepo = void 0;
const typeorm_1 = require("typeorm");
const permission_entity_1 = require("./permission.entity");
const database_config_1 = __importDefault(require("../../../config/database.config"));
class PermissionRepository extends typeorm_1.Repository {
    constructor() {
        super(permission_entity_1.PermissionEntity, database_config_1.default.createEntityManager());
    }
    async findBySubject(subject) {
        return this.find({ where: { subject } });
    }
    async createPermission(subject, action, description) {
        const permission = this.create({ subject, action, description });
        return this.save(permission);
    }
    // Obtención de Subjects y su Actions asociadas 
    async findStoredSubjectsAndActions() {
        const result = await database_config_1.default.createQueryBuilder()
            .select('permission.subject AS subject')
            .addSelect('ARRAY_AGG(permision.action) AS actions')
            .from(permission_entity_1.PermissionEntity, 'permission')
            .groupBy('permission.subject')
            .getRawMany();
        return result.map(permission => ({
            subject: permission.subject,
            actions: permission.actions
        }));
    }
}
exports.permissionRepo = new PermissionRepository();
