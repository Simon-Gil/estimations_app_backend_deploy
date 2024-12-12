"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const grade_controller_1 = require("../../modules/company-structure/grade/grade.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /grades:
 *   get:
 *     tags:
 *       - Grades  # Etiqueta para agrupar rutas relacionadas con grados
 *     summary: Obtiene los niveles de la empresa
 *     description: Obtiene la estructura de niveles de la empresa.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de niveles obtenida con éxito
 *       '401':
 *         description: No autenticado
 */
router.get('/', auth_middleware_1.authenticate, grade_controller_1.gradeController.getGrades);
exports.default = router;
