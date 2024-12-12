"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../modules/auth/auth.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login de usuario
 *     description: Autentica un usuario y devuelve token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: securePassword123
 *     responses:
 *       '200':
 *         description: Usuario autenticado correctamente
 *       '401':
 *         description: No autenticado
 */
router.post('/login', auth_controller_1.authController.login);
exports.default = router;
