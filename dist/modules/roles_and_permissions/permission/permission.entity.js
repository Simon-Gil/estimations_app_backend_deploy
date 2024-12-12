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
exports.PermissionEntity = void 0;
const typeorm_1 = require("typeorm");
const role_entity_1 = require("../role/role.entity");
/**
 * @swagger
 * components:
 *   schemas:
 *     Permission:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - subject
 *         - action
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
 *           description: ID único del permiso.
 *         name:
 *           type: string
 *           example: "view_reports"
 *           description: Nombre del permiso.
 *         subject:
 *           type: string
 *           example: "report"
 *           description: Sujeto sobre el cual se aplica el permiso.
 *         action:
 *           type: string
 *           example: "read"
 *           description: Acción que el permiso permite realizar.
 *         description:
 *           type: string
 *           example: "Permiso para ver reportes."
 *           description: Descripción del permiso.
 *         roles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Role'  # Suponiendo que tienes un esquema Role definido
 *           description: Lista de roles que tienen este permiso.
 *         parentPermission:
 *           type: object
 *           $ref: '#/components/schemas/Permission'  # Referencia a sí mismo para permisos anidados
 *           nullable: true
 *           description: Permiso padre, si existe.
 *         childPermissions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Permission'  # Referencia a sí mismo para permisos anidados
 *           description: Lista de permisos hijos que dependen de este permiso.
 */
let PermissionEntity = class PermissionEntity {
};
exports.PermissionEntity = PermissionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'permission_id' }),
    __metadata("design:type", String)
], PermissionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'permission_name' }),
    __metadata("design:type", String)
], PermissionEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PermissionEntity.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PermissionEntity.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PermissionEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => role_entity_1.RoleEntity, role => role.permissions),
    __metadata("design:type", Array)
], PermissionEntity.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PermissionEntity, permission => permission.childPermissions, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'parent_permission_id' }),
    __metadata("design:type", Object)
], PermissionEntity.prototype, "parentPermission", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PermissionEntity, permission => permission.parentPermission),
    __metadata("design:type", Array)
], PermissionEntity.prototype, "childPermissions", void 0);
exports.PermissionEntity = PermissionEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'permissions' })
    // La combinación subject-action debe ser única
    ,
    (0, typeorm_1.Unique)(['subject', 'action'])
], PermissionEntity);
