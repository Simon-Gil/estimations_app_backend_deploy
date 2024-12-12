"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const excel_controller_1 = require("../../modules/file-generators/excel/excel.controller");
const authorization_middleware_1 = require("../../common/middlewares/authorization.middleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /excel/estimations/{id}/download:
 *   get:
 *     tags:
 *       - Excel
 *     summary: Descarga archivo xlsx con desglose de horas.
 *     description: Descarga un archivo xslx que contiene el desglose de horas por tareas categorías y perfiles de una estimación.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la estimación.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Fichero recibido con éxito
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       '401':
 *         description: No autenticado
 *       '404':
 *         description: Estimación no encontrada
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/estimations/:id/download', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'estimation'), excel_controller_1.excelController.downloadExcel);
exports.default = router;
