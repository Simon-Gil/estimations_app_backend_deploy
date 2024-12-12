"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_extension_1 = require("typeorm-extension");
const permission_seeder_1 = require("./permission.seeder");
const department_seeder_1 = require("./department.seeder");
const grade_seeder_1 = require("./grade.seeder");
const role_seeder_1 = require("./role.seeder");
const task_categories_seeder_1 = require("./task-categories.seeder");
const profile_seeder_1 = require("./profile.seeder");
const user_seeder_1 = require("./user.seeder");
const price_config_seeder_1 = require("./price-config.seeder");
const settings_seeder_1 = require("./settings.seeder");
class InitSeeder {
    async run(dataSource, factoryManager) {
        await (0, typeorm_extension_1.runSeeders)(dataSource, {
            seeds: [permission_seeder_1.PermissionSeeder, department_seeder_1.DepartmentSeeder, grade_seeder_1.GradeSeeder, role_seeder_1.RoleSeeder, task_categories_seeder_1.TaskCategoriesSeeder, profile_seeder_1.ProfileSeeder, price_config_seeder_1.PriceConfigSeeder, user_seeder_1.UserSeeder, settings_seeder_1.SettingsSeeder],
        });
    }
}
exports.default = InitSeeder;
