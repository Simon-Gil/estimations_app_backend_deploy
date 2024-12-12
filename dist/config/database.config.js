"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../modules/user/user.entity");
const dotenv = __importStar(require("dotenv"));
const account_entity_1 = require("./../modules/accounts/account.entity");
const department_entity_1 = require("../modules/company-structure/department/department.entity");
const estimation_entity_1 = require("../modules/estimations/estimation.entity");
const first_level_category_entity_1 = require("../modules/company-structure/task-categories/first-level-category/first-level-category.entity");
const grade_entity_1 = require("../modules/company-structure/grade/grade.entity");
const hrs_task_profile_entity_1 = require("../modules/estimations/task/hrs-task-profile/hrs-task-profile.entity");
const opportunity_entity_1 = require("../modules/opportunity/opportunity.entity");
const proposal_entity_1 = require("../modules/proposal/proposal.entity");
const permission_entity_1 = require("../modules/roles_and_permissions/permission/permission.entity");
const profile_entity_1 = require("../modules/company-structure/profile/profile.entity");
const profile_price_entity_1 = require("./../modules/accounts/price-config/price-profile/profile-price.entity");
const role_entity_1 = require("../modules/roles_and_permissions/role/role.entity");
const second_level_category_entity_1 = require("../modules/company-structure/task-categories/second-level-category/second-level-category.entity");
const task_entity_1 = require("../modules/estimations/task/task.entity");
const typology_entity_1 = require("../modules/company-structure/typology/typology.entity");
const price_config_entity_1 = require("./../modules/accounts/price-config/price-config.entity");
const password_reset_token_entity_1 = require("../modules/auth/password-reset/password-reset-token.entity");
const notification_entity_1 = require("../modules/notifications/notification.entity");
const init_seeder_1 = __importDefault(require("./seeders/init.seeder"));
const settings_entity_1 = require("../modules/settings/settings.entity");
const estimation_user_entity_1 = require("./../modules/estimations/estimation-user/estimation-user.entity");
const failed_login_attempt_entity_1 = require("../modules/auth/failed-login-attempt/failed-login-attempt.entity");
const document_entity_1 = require("../modules/opportunity/opportunity-documents/document.entity");
// Carga de variables de entorno
dotenv.config({ path: ".env" });
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.dev";
dotenv.config({ path: envFile });
// Opciones de conexión y entidades TypeORM
const options = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [
        user_entity_1.UserEntity, account_entity_1.AccountEntity, department_entity_1.DepartmentEntity, estimation_entity_1.EstimationEntity, first_level_category_entity_1.FirstLevelCategoryEntity, grade_entity_1.GradeEntity, hrs_task_profile_entity_1.HrsTaskProfileEntity, opportunity_entity_1.OpportunityEntity, permission_entity_1.PermissionEntity, price_config_entity_1.PriceConfigEntity,
        profile_entity_1.ProfileEntity, profile_price_entity_1.ProfilePriceEntity, role_entity_1.RoleEntity, second_level_category_entity_1.SecondLevelCategoryEntity, task_entity_1.TaskEntity, typology_entity_1.TypologyEntity, password_reset_token_entity_1.PasswordResetTokenEntity, notification_entity_1.NotificationEntity, settings_entity_1.SettingsEntity, failed_login_attempt_entity_1.FailedLoginAttemptEntity,
        estimation_user_entity_1.EstimationUserEntity, document_entity_1.DocumentEntity, proposal_entity_1.ProposalEntity
    ],
    subscribers: [],
    migrations: [],
    seeds: [init_seeder_1.default]
};
const dataSource = new typeorm_1.DataSource(options);
exports.default = dataSource;
