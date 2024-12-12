"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSeeder = void 0;
const user_entity_1 = require("../../modules/user/user.entity");
const User_1 = require("../../modules/user/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const role_entity_1 = require("../../modules/roles_and_permissions/role/role.entity");
const department_entity_1 = require("../../modules/company-structure/department/department.entity");
const grade_entity_1 = require("../../modules/company-structure/grade/grade.entity");
class UserSeeder {
    async run(dataSource, factoryManager) {
        const userRepository = dataSource.getRepository(user_entity_1.UserEntity);
        const alreadyCreatedAdmin = await userRepository.find({ where: {
                roles: {
                    name: 'Admin'
                }
            } });
        if (alreadyCreatedAdmin.length > 0) {
            return;
        }
        // Obtenemos rol, departamento y grado
        const roleRepository = dataSource.getRepository(role_entity_1.RoleEntity);
        const adminRole = await roleRepository.findOne({
            where: {
                name: 'Admin'
            }
        });
        const departmentRepository = dataSource.getRepository(department_entity_1.DepartmentEntity);
        const commercial = await departmentRepository.findOne({
            where: {
                name: 'Comercial'
            }
        });
        const gradeRepository = dataSource.getRepository(grade_entity_1.GradeEntity);
        const director = await gradeRepository.findOne({
            where: {
                name: 'Director'
            }
        });
        // Creación de usuario administrador
        const name = process.env.ADMIN_NAME || 'Initial';
        const lastName = process.env.ADMIN_LASTNAME || 'Admin';
        const email = process.env.ADMIN_EMAIL || 'admin@example.com';
        const password = process.env.ADMIN_PASSWORD || '12345678a';
        const hashedPass = await bcrypt_1.default.hash(password, 10);
        const initialAdmin = new User_1.User(name, lastName, commercial, director, [adminRole], email, hashedPass);
        await userRepository.save(initialAdmin);
        console.log('Datos de usuario administrador inicial introducidos');
    }
}
exports.UserSeeder = UserSeeder;
