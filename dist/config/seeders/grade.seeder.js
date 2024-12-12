"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeSeeder = void 0;
const grade_entity_1 = require("../../modules/company-structure/grade/grade.entity");
const Grade_1 = require("../../modules/company-structure/grade/Grade");
// Seeder para Niveles
class GradeSeeder {
    async run(dataSource, factoryManager) {
        const repository = dataSource.getRepository(grade_entity_1.GradeEntity);
        const existingGrades = await repository.find();
        if (existingGrades.length > 0) {
            return;
        }
        const director = new Grade_1.Grade('Director');
        const coordinador = new Grade_1.Grade('Coordinador');
        const tecnico = new Grade_1.Grade('Técnico');
        await repository.upsert([
            director, coordinador, tecnico
        ], ['name']);
        console.log('Datos seed de Niveles introducidos');
    }
}
exports.GradeSeeder = GradeSeeder;
