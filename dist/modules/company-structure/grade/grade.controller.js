"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradeController = void 0;
const grade_service_1 = require("./../grade/grade.service");
class GradeController {
    async getGrades(req, res) {
        try {
            const grades = await grade_service_1.gradeService.getAllGrades();
            res.status(200).json(grades);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error al obtener niveles', err });
        }
    }
}
exports.gradeController = new GradeController();
