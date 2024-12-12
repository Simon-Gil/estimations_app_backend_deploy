"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleSeeder = void 0;
const Role_1 = require("../../modules/roles_and_permissions/role/Role");
const role_entity_1 = require("../../modules/roles_and_permissions/role/role.entity");
const permission_entity_1 = require("../../modules/roles_and_permissions/permission/permission.entity");
const permission_utility_1 = require("../../modules/roles_and_permissions/permission/permission.utility");
const grade_entity_1 = require("../../modules/company-structure/grade/grade.entity");
const department_entity_1 = require("../../modules/company-structure/department/department.entity");
// Seeder para Niveles
class RoleSeeder {
    async run(dataSource, factoryManager) {
        const repository = dataSource.getRepository(role_entity_1.RoleEntity);
        const existingRoles = await repository.find();
        if (existingRoles.length > 0) {
            return;
        }
        // Obtenemos niveles y departamentos
        const gradeRepository = dataSource.getRepository(grade_entity_1.GradeEntity);
        const director = await gradeRepository.findOne({
            where: {
                name: 'Director'
            }
        });
        const coordinador = await gradeRepository.findOne({
            where: {
                name: 'Coordinador'
            }
        });
        const tecnico = await gradeRepository.findOne({
            where: {
                name: 'Técnico'
            }
        });
        const departmentRepository = dataSource.getRepository(department_entity_1.DepartmentEntity);
        const commercial = await departmentRepository.findOne({
            where: {
                name: 'Comercial'
            }
        });
        const software = await departmentRepository.findOne({
            where: {
                name: 'Software'
            }
        });
        const marketing = await departmentRepository.findOne({
            where: {
                name: 'Marketing'
            }
        });
        // Obtenemos los permisos y definimos función para encontrarlos
        const permissionRepository = dataSource.getRepository(permission_entity_1.PermissionEntity);
        const permissions = await permissionRepository.find();
        function find(action, subject) {
            const permission = permissions.find(p => {
                return p.action === action && p.subject === subject;
            });
            if (!permission) {
                throw new Error(`Permiso con action '${action}' y subject '${subject}' no encontrado`);
            }
            return permission;
        }
        // DEFINICIÓN DE ROLES Y PERMISOS POR DEFECTO
        // Director de Software
        const directorSoftware = new Role_1.Role('Director de Software', software, director, [
            find('read', 'user'), find('block', 'user'), find('updateSelf', 'user'), find('read', 'account'),
            find('assignTechnicalManager', 'account'), find('read', 'opportunity'), find('manageDocument', 'opportunity'),
            find('createTypology', 'settings'), find('update', 'opportunity'), find('assignTechnicalManager', 'opportunity'),
            find('read', 'proposal'), find('create', 'proposal'), find('update', 'proposal'), find('manage', 'estimation'), find('manage', 'task'),
        ]);
        // Coordinador de Software    
        const coordinadorSoftware = new Role_1.Role('Coordinador de Software', software, coordinador, [
            find('readSelf', 'user'), find('updateSelf', 'user'), find('readSelf', 'account'),
            find('read', 'opportunity'), find('manageDocument', 'opportunity'),
            find('update', 'opportunity'), find('assignTechnicalManager', 'opportunity'), find('read', 'proposal'),
            find('create', 'proposal'), find('manage', 'estimation'), find('manage', 'task')
        ]);
        // Técnico de Software
        const tecnicoSoftware = new Role_1.Role('Técnico de Software', software, tecnico, [
            find('readSelf', 'user'), find('updateSelf', 'user'), find('readSelf', 'account'),
            find('readSelf', 'opportunity'), find('downloadDocument', 'opportunity'), find('readSelf', 'proposal'),
            find('readSelf', 'estimation'), find('updateTasksProfiles', 'task')
        ]);
        // Director Comercial
        const directorComercial = new Role_1.Role('Director Comercial', commercial, director, [
            find('read', 'user'), find('block', 'user'), find('updateSelf', 'user'), find('read', 'account'), find('create', 'account'),
            find('update', 'account'), find('delete', 'account'), find('assignCommercialManager', 'account'), find('managePriceConfig', 'account'),
            find('read', 'opportunity'), find('update', 'opportunity'), find('create', 'opportunity'), find('delete', 'opportunity'),
            find('assignCommercialManager', 'opportunity'), find('manageDocument', 'opportunity'), find('updateStatus', 'opportunity'),
            find('manage', 'proposal'), find('read', 'estimation'),
        ]);
        // Coordinador Comercial
        const coordinadorComercial = new Role_1.Role('Coordinador Comercial', commercial, coordinador, [
            find('readSelf', 'user'), find('updateSelf', 'user'), find('read', 'account'), find('create', 'account'), find('readPriceConfig', 'account'),
            find('assignCommercialManager', 'account'), find('read', 'opportunity'), find('update', 'opportunity'), find('create', 'opportunity'),
            find('assignCommercialManager', 'opportunity'), find('manageDocument', 'opportunity'), find('updateStatus', 'opportunity'),
            find('read', 'proposal'), find('create', 'proposal'), find('update', 'proposal'), find('readSpecialFields', 'proposal'),
            find('read', 'estimation')
        ]);
        // Técnico Comercial
        const tecnicoComercial = new Role_1.Role('Técnico Comercial', commercial, tecnico, [
            find('readSelf', 'user'), find('updateSelf', 'user'), find('read', 'account'), find('readPriceConfig', 'account'),
            find('readSelf', 'opportunity'), find('create', 'opportunity'), find('update', 'opportunity'), find('updateStatus', 'opportunity'),
            find('downloadDocument', 'opportunity'), find('readSelf', 'proposal'), find('create', 'proposal'), find('update', 'proposal'),
            find('readSpecialFields', 'proposal'), find('readSelf', 'estimation')
        ]);
        // Director de Marketing
        const directorMarketing = new Role_1.Role('Director de Marketing', marketing, director);
        // Coordinador de Marketing
        const coordinadorMarketing = new Role_1.Role('Coordinador de Marketing', marketing, coordinador);
        // Tecnico de Marketing
        const tecnicoMarketing = new Role_1.Role('Técnico de Marketing', marketing, tecnico);
        // Admin
        const admin = new Role_1.Role('Admin', undefined, undefined, [
            find('manage', 'user'), find('manage', 'settings'), find('manage', 'account'), find('manage', 'roles_and_permissions'),
            find('manage', 'opportunity'), find('manage', 'proposal'), find('manage', 'estimation'), find('manage', 'task'),
        ]);
        const savedRoles = await repository.save([
            directorSoftware, coordinadorSoftware, tecnicoSoftware, directorComercial,
            coordinadorComercial, tecnicoComercial, directorMarketing, coordinadorMarketing,
            tecnicoMarketing, admin
        ]);
        ;
        // Mantenemos la estructura de permisos activando los hijos de permisos asignados
        for (const role of savedRoles) {
            await permission_utility_1.PermissionUtility.maintainPermissionStructure(role);
        }
        console.log('Datos seed de Roles y permisos por defecto introducidos.');
    }
}
exports.RoleSeeder = RoleSeeder;
