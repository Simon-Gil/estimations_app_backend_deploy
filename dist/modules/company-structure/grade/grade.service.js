"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradeService = exports.GradeService = void 0;
const grade_repository_1 = require("./grade.repository");
/**
 * Servicio para gestionar los niveles  en el sistema.
 */
class GradeService {
    /**
     * Obtiene un nivel específico por su ID.
     * @param id - Identificador único del nivel.
     * @returns Una promesa que resuelve con la entidad del nivel encontrado o `null` si no existe.
     */
    async getGradeById(id) {
        const grade = grade_repository_1.gradeRepo.findOne({ where: { id: id } });
        return grade;
    }
    /**
     * Obtiene todos los niveles disponibles en el sistema.
     * @returns Una promesa que resuelve con un arreglo de todas las entidades de nivel.
     */
    async getAllGrades() {
        const grades = await grade_repository_1.gradeRepo.find();
        return grades;
    }
}
exports.GradeService = GradeService;
exports.gradeService = new GradeService();
