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
exports.RoleEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/user.entity");
const permission_entity_1 = require("../permission/permission.entity");
const department_entity_1 = require("../../company-structure/department/department.entity");
const grade_entity_1 = require("../../company-structure/grade/grade.entity");
/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
 *           description: ID único del rol.
 *         name:
 *           type: string
 *           example: "Admin"
 *           description: Nombre del rol, debe ser único.
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'  # Asegúrate de que el esquema User esté definido
 *           description: Lista de usuarios asociados a este rol.
 *         permissions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Permission'  # Asegúrate de que el esquema Permission esté definido
 *           description: Lista de permisos asociados a este rol.
 *         department:
 *           $ref: '#/components/schemas/Department'  # Asegúrate de que el esquema Department esté definido
 *           description: Departamento asociado a este rol (opcional).
 *         grade:
 *           $ref: '#/components/schemas/Grade'  # Asegúrate de que el esquema Grade esté definido
 *           description: Grado asociado a este rol (opcional).
 */
let RoleEntity = class RoleEntity {
};
exports.RoleEntity = RoleEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'role_id' }),
    __metadata("design:type", String)
], RoleEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role_name', unique: true }),
    __metadata("design:type", String)
], RoleEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.UserEntity, user => user.roles),
    __metadata("design:type", Array)
], RoleEntity.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => permission_entity_1.PermissionEntity, permission => permission.roles),
    (0, typeorm_1.JoinTable)({
        name: 'role_permissions',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id'
        }
    }),
    __metadata("design:type", Array)
], RoleEntity.prototype, "permissions", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.DepartmentEntity, department => department.roles, { nullable: true }),
    __metadata("design:type", department_entity_1.DepartmentEntity)
], RoleEntity.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => grade_entity_1.GradeEntity, grade => grade.roles, { nullable: true }),
    __metadata("design:type", grade_entity_1.GradeEntity)
], RoleEntity.prototype, "grade", void 0);
exports.RoleEntity = RoleEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'roles' })
], RoleEntity);
