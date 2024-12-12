"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentController = void 0;
const department_service_1 = require("./department.service");
class DepartmentController {
    async getDepartments(req, res) {
        try {
            const departments = await department_service_1.departmentService.getAllDepartments();
            res.status(200).json(departments);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error al obtener departamentos', err });
        }
    }
}
exports.departmentController = new DepartmentController();
