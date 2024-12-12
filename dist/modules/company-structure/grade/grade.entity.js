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
exports.GradeEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/user.entity");
const role_entity_1 = require("../../roles_and_permissions/role/role.entity");
/**
 * @swagger
 * components:
 *   schemas:
 *     Grade:
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
 *           description: ID único del grado.
 *         name:
 *           type: string
 *           example: "Grado 10"
 *           description: Nombre del grado, debe ser único.
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'  # Suponiendo que tienes un esquema User definido
 *           description: Lista de usuarios asociados a este grado.
 *         roles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Role'  # Suponiendo que tienes un esquema Role definido
 *           description: Lista de roles asociados a este grado para automatizar su asignación.
 */
let GradeEntity = class GradeEntity {
};
exports.GradeEntity = GradeEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'grade_id' }),
    __metadata("design:type", String)
], GradeEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'grade_name', unique: true }),
    __metadata("design:type", String)
], GradeEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.UserEntity, user => user.grade),
    __metadata("design:type", Array)
], GradeEntity.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => role_entity_1.RoleEntity, role => role.grade),
    __metadata("design:type", Array)
], GradeEntity.prototype, "roles", void 0);
exports.GradeEntity = GradeEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'grade' })
], GradeEntity);
