"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/user.entity");
const role_entity_1 = require("../../roles_and_permissions/role/role.entity");
/**
 * @swagger
 * components:
 *   schemas:
 *     Department:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - users
 *         - roles
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "f4e39a60-3a68-43b1-8a0e-7bc5a4babc64"
 *           description: ID único del departamento.
 *         name:
 *           type: string
 *           example: "Recursos Humanos"
 *           description: Nombre del departamento, debe ser único.
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'  # Suponiendo que tienes un esquema User definido
 *           description: Lista de usuarios pertenecientes a este departamento.
 *         roles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Role'  # Suponiendo que tienes un esquema Role definido
 *           description: Lista de roles asociados a este departamento para automatizar su asignación.
 */
let DepartmentEntity = class DepartmentEntity {
};
exports.DepartmentEntity = DepartmentEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'department_id' }),
    __metadata("design:type", String)
], DepartmentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'department_name', unique: true }),
    __metadata("design:type", String)
], DepartmentEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.UserEntity, user => user.department),
    __metadata("design:type", Array)
], DepartmentEntity.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => role_entity_1.RoleEntity, role => role.department),
    __metadata("design:type", Array)
], DepartmentEntity.prototype, "roles", void 0);
exports.DepartmentEntity = DepartmentEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'department' })
], DepartmentEntity);
