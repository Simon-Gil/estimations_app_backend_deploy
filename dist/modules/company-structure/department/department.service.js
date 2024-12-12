"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentService = exports.DepartmentService = void 0;
const department_repository_1 = require("./department.repository");
/**
 * Servicio que maneja las operaciones relacionadas con los departamentos.
 *
 * Proporciona métodos para interactuar con la base de datos y obtener información de los departamentos.
 */
class DepartmentService {
    /**
     * Obtiene todos los departamentos disponibles en la base de datos.
     *
     * Este método consulta el repositorio de departamentos para recuperar todas las entradas en la tabla de departamentos.
     *
     * @returns Una promesa que resuelve un arreglo de objetos `DepartmentEntity`, que representan todos los departamentos en la base de datos.
     */
    async getAllDepartments() {
        const departments = await department_repository_1.departmentRepo.find();
        return departments;
    }
}
exports.DepartmentService = DepartmentService;
exports.departmentService = new DepartmentService();
