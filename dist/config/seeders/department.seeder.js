"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentSeeder = void 0;
const department_entity_1 = require("../../modules/company-structure/department/department.entity");
const Department_1 = require("../../modules/company-structure/department/Department");
// Seeder para Departamentos
class DepartmentSeeder {
    async run(dataSource, factoryManager) {
        const repository = dataSource.getRepository(department_entity_1.DepartmentEntity);
        const software = new Department_1.Department('Software');
        const commercial = new Department_1.Department('Comercial');
        const marketing = new Department_1.Department('Marketing');
        await repository.upsert([
            software, commercial, marketing
        ], ['name']);
        console.log('Datos seed de Departamentos introducidos');
    }
}
exports.DepartmentSeeder = DepartmentSeeder;
