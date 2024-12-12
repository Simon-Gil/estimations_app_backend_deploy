"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const authorization_middleware_1 = require("./../../common/middlewares/authorization.middleware");
const typology_controller_1 = require("../../modules/company-structure/typology/typology.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /typologies:
 *   get:
 *     summary: Obtener tipologías
 *     description: Obtiene la lista de tipologías asignables a oportunidades comerciales. Requiere autenticación.
 *     tags:
 *       - Typologies
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tipologías
 *       401:
 *         description: No autenticado
 *       500:
 *         description: Error interno del servidor
 *
 */
router.get('/', auth_middleware_1.authenticate, typology_controller_1.typologyController.getAllTypologies);
/**
 * @swagger
 * /typologies:
 *   post:
 *     summary: Crea una nueva tipología
 *     description: Crea una tipología asignable a oportunidad. Requiere permiso 'assignNewTipology opportunity'.
 *     tags:
 *       - Typologies
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nombre de tipología"
 *             required:
 *               - name  # Asegura que el nombre es un campo obligatorio
 *     responses:
 *       200:
 *         description: Typology created successfully
 *       400:
 *         description: Petición no válida
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('createTypology', 'settings'), typology_controller_1.typologyController.createTypology);
exports.default = router;
