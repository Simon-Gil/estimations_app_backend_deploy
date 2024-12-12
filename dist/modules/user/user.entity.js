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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const department_entity_1 = require("../company-structure/department/department.entity");
const grade_entity_1 = require("../company-structure/grade/grade.entity");
const role_entity_1 = require("../roles_and_permissions/role/role.entity");
const account_entity_1 = require("./../accounts/account.entity");
const task_entity_1 = require("../estimations/task/task.entity");
const opportunity_entity_1 = require("./../opportunity/opportunity.entity");
const hrs_task_profile_entity_1 = require("../estimations/task/hrs-task-profile/hrs-task-profile.entity");
const password_reset_token_entity_1 = require("./../auth/password-reset/password-reset-token.entity");
const notification_entity_1 = require("../notifications/notification.entity");
const failed_login_attempt_entity_1 = require("../auth/failed-login-attempt/failed-login-attempt.entity");
const estimation_user_entity_1 = require("./../estimations/estimation-user/estimation-user.entity");
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - password
 *         - name
 *         - lastname
 *         - department
 *         - grade
 *         - roles
 *         - tasks
 *         - technicalManagedAccounts
 *         - commercialManagedAccounts
 *         - technicalManagedOpportunities
 *         - commercialManagedOpportunities
 *         - hrsTaskProfiles
 *         - passwordResetTokens
 *         - notifications
 *         - estimations
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
 *           description: ID único del usuario.
 *         email:
 *           type: string
 *           example: "user@example.com"
 *           description: Correo electrónico del usuario (debe ser único).
 *         password:
 *           type: string
 *           example: "securePassword123"
 *           description: Contraseña del usuario.
 *         name:
 *           type: string
 *           example: "John"
 *           description: Nombre del usuario.
 *         lastname:
 *           type: string
 *           example: "Doe"
 *           description: Apellido del usuario.
 *         department:
 *           $ref: '#/components/schemas/Department'  # Asegúrate de que el esquema Department esté definido
 *           description: Departamento al que pertenece el usuario.
 *         grade:
 *           $ref: '#/components/schemas/Grade'  # Asegúrate de que el esquema Grade esté definido
 *           description: Grado asociado al usuario.
 *         roles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Role'  # Asegúrate de que el esquema Role esté definido
 *           description: Roles asignados al usuario.
 *         tasks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Task'  # Asegúrate de que el esquema Task esté definido
 *           description: Tareas asignadas al usuario.
 *         technicalManagedAccounts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Account'  # Asegúrate de que el esquema Account esté definido
 *           description: Cuentas gestionadas técnicamente por el usuario.
 *         commercialManagedAccounts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Account'  # Asegúrate de que el esquema Account esté definido
 *           description: Cuentas gestionadas comercialmente por el usuario.
 *         technicalManagedOpportunities:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Opportunity'  # Asegúrate de que el esquema Opportunity esté definido
 *           description: Oportunidades gestionadas técnicamente por el usuario.
 *         commercialManagedOpportunities:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Opportunity'  # Asegúrate de que el esquema Opportunity esté definido
 *           description: Oportunidades gestionadas comercialmente por el usuario.
 *         hrsTaskProfiles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/HrsTaskProfile'  # Asegúrate de que el esquema HrsTaskProfile esté definido
 *           description: Perfiles de tareas asociados al usuario.
 *         passwordResetTokens:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PasswordResetToken'  # Asegúrate de que el esquema PasswordResetToken esté definido
 *           description: Tokens de restablecimiento de contraseña asociados al usuario.
 *         notifications:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Notification'  # Asegúrate de que el esquema Notification esté definido
 *           description: Notificaciones asociadas al usuario.
 *         estimations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Estimation'  # Asegúrate de que el esquema Estimation esté definido
 *           description: Estimaciones asociadas al usuario.
 */
let UserEntity = class UserEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'user_id' }),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_name' }),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_blocked', default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isBlocked", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'blocked_until', nullable: true, default: null }),
    __metadata("design:type", Date
    // Foreign keys
    //Relacion con tabla Department
    )
], UserEntity.prototype, "blockedUntil", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.DepartmentEntity, department => department.users),
    (0, typeorm_1.JoinColumn)({ name: 'department_id' }),
    __metadata("design:type", department_entity_1.DepartmentEntity)
], UserEntity.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => grade_entity_1.GradeEntity, grade => grade.users),
    (0, typeorm_1.JoinColumn)({ name: 'grade_id' }),
    __metadata("design:type", grade_entity_1.GradeEntity)
], UserEntity.prototype, "grade", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => role_entity_1.RoleEntity, role => role.users),
    (0, typeorm_1.JoinTable)({
        name: 'user_roles',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id'
        }
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => task_entity_1.TaskEntity, task => task.users),
    (0, typeorm_1.JoinTable)({
        name: 'user_task',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'task_id',
            referencedColumnName: 'id'
        }
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => account_entity_1.AccountEntity, account => account.technicalManager),
    __metadata("design:type", Array)
], UserEntity.prototype, "technicalManagedAccounts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => account_entity_1.AccountEntity, account => account.commercialManager),
    __metadata("design:type", Array)
], UserEntity.prototype, "commercialManagedAccounts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => opportunity_entity_1.OpportunityEntity, opportunity => opportunity.technicalManager),
    __metadata("design:type", Array)
], UserEntity.prototype, "technicalManagedOpportunities", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => opportunity_entity_1.OpportunityEntity, opportunity => opportunity.commercialManager),
    __metadata("design:type", Array)
], UserEntity.prototype, "commercialManagedOpportunities", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => hrs_task_profile_entity_1.HrsTaskProfileEntity, hrsTaskProfile => hrsTaskProfile.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "hrsTaskProfiles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => password_reset_token_entity_1.PasswordResetTokenEntity, passwordResetToken => passwordResetToken.user),
    __metadata("design:type", password_reset_token_entity_1.PasswordResetTokenEntity)
], UserEntity.prototype, "passwordResetTokens", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.NotificationEntity, notification => notification.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => estimation_user_entity_1.EstimationUserEntity, estimationUser => estimationUser.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "estimationUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => failed_login_attempt_entity_1.FailedLoginAttemptEntity, failedLoginAttempt => failedLoginAttempt.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "failedLoginAttempts", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], UserEntity);
