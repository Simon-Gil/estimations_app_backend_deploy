"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const department_controller_1 = require("../../modules/company-structure/department/department.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /departments:
 *   get:
 *     tags:
 *       - Departments
 *     summary: Obtiene todos los departamentos
 *     description: Devuelve una lista con todos los departamentos.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: La lista de departamentos
 *       '401':
 *         description: No autenticado
 */
router.get('/', auth_middleware_1.authenticate, department_controller_1.departmentController.getDepartments);
exports.default = router;
