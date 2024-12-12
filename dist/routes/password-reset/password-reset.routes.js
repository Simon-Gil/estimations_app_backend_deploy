"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const password_reset_controller_1 = require("../../modules/auth/password-reset/password-reset.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /reset-password:
 *   post:
 *     tags:
 *       - Password Reset  # Etiqueta para agrupar rutas relacionadas con el restablecimiento de contraseñas
 *     summary: Reestablece contraseña de usuario
 *     description: Permite al usuario reestablecer su contraseña utilizando un token de reestablecimiento.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de reestablecimiento
 *                 example: '123456abcdef'
 *               password:
 *                 type: string
 *                 description: Nueva contraseña de usuario
 *                 example: 'NewStrongPassword123!'
 *     responses:
 *       '200':
 *         description: Contraseña actualizada con éxito
 *       '400':
 *         description: Token no válido, expirado, o ya utilizado.
 *       '500':
 *         description: Error interno del servidor
 */
router.post('/', password_reset_controller_1.passwordResetController.resetPassword);
/**
 * @swagger
 * /reset-password/request:
 *   post:
 *     tags:
 *       - Password Reset
 *     summary: Solicita envío de email para cambio de contraseña
 *     description: Permite a un usuario cambiar contraseña a través de enlace recibido por email. No se notifica si existe un usuario con el email especificado, excepto errores, el mensaje devuelto siempre será de éxito.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *                 example: 'email@example.com'
 *     responses:
 *       '200':
 *         description: Email enviado con éxito
 *       '500':
 *         description: Error interno del servidor.
 */
router.post('/request', password_reset_controller_1.passwordResetController.requestResetPassword);
exports.default = router;
