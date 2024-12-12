"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const authorization_middleware_1 = require("./../../common/middlewares/authorization.middleware");
const settings_controller_1 = require("../../modules/settings/settings.controller");
// Rutas Settings
const router = (0, express_1.Router)();
/**
 * @swagger
 * /settings/email-config:
 *   patch:
 *     summary: Actualiza la configuración de notificaciones por correo.
 *     description: Permite configurar las notificaciones automáticas enviadas por correo electrónico, como finalización de estimaciones, tareas o asignación de usuarios. Requiere permiso 'updateEmailConfig settings'.
 *     tags:
 *       - Settings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos necesarios para actualizar la configuración de notificaciones por correo.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sendUserFinishedEmail:
 *                 type: boolean
 *                 description: Habilitar o deshabilitar el envío de correos al finalizar una tarea de estimación.
 *               sendDoneEstimationEmail:
 *                 type: boolean
 *                 description: Habilitar o deshabilitar el envío de correos al completar una estimación.
 *               sendAssignedUserEmail:
 *                 type: boolean
 *                 description: Habilitar o deshabilitar el envío de correos al asignar un usuario a una estimación.
 *     responses:
 *       200:
 *         description: Configuración de correo actualizada con éxito.
 *       400:
 *         description: Solicitud malformada o datos incompletos.
 *       500:
 *         description: Error interno del servidor.
 *       403:
 *         description: No autorizado
 *       401:
 *         description: No autenticado
 */
router.patch('/email-config', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('updateEmailConfig', 'settings'), settings_controller_1.settingsController.updateEmailConfig);
/**
 * @swagger
 * /settings/security-config:
 *   patch:
 *     summary: Actualiza la configuración de seguridad.
 *     description: Configura parámetros relacionados con intentos fallidos de inicio de sesión, bloqueo temporal, y expiración de tokens. Requiere permiso 'updateSecurityConfig settings'.
 *     tags:
 *       - Settings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos necesarios para actualizar la configuración de seguridad.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maxLoginAttempts:
 *                 type: integer
 *                 description: Número máximo de intentos fallidos antes de bloquear el acceso.
 *               blockDurationMinutes:
 *                 type: integer
 *                 description: Duración del bloqueo en minutos.
 *               expirationAuthTokenHours:
 *                 type: integer
 *                 description: Horas de validez del token de autenticación.
 *               expirationResetTokenHours:
 *                 type: integer
 *                 description: Horas de validez del token para restablecimiento de contraseña.
 *     responses:
 *       200:
 *         description: Configuración de seguridad actualizada con éxito.
 *       400:
 *         description: Solicitud malformada o datos incompletos.
 *       500:
 *         description: Error interno del servidor.
 *       403:
 *         description: No autorizado
 *       401:
 *         description: No autenticado
 */
router.patch('/security-config', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('updateSecurityConfig', 'settings'), settings_controller_1.settingsController.updateSecurityConfig);
/**
 * @swagger
 * /settings/proposal-expiration:
 *   patch:
 *     summary: Actualiza los días de validez de las propuestas.
 *     description: Define cuántos días una propuesta será válida antes de expirar. Requiere permiso 'updateProposalExpiration settings'
 *     tags:
 *       - Settings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos necesarios para actualizar los días de validez de las propuestas.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               expirationProposalDays:
 *                 type: integer
 *                 description: Días de validez de una propuesta.
 *     responses:
 *       200:
 *         description: Configuración de días de validez de propuestas actualizada con éxito.
 *       400:
 *         description: Solicitud malformada o datos incompletos.
 *       500:
 *         description: Error interno del servidor.
 *       403:
 *         description: No autorizado
 *       401:
 *         description: No autenticado
 */
router.patch('/proposal-expiration', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('updateProposalExpiration', 'settings'), settings_controller_1.settingsController.updateExpirationProposalDays);
/**
 * @swagger
 * /settings/default-price-config:
 *   patch:
 *     summary: Actualiza la configuración de precios predeterminados.
 *     description: Define los precios predeterminados para diferentes perfiles de usuario. Rquiere permiso 'updateDefaultPriceConfig settings'
 *     tags:
 *       - Settings
 *     security:
 *       - bearerAuth: []
  *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profilePrices:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     profile:
 *                       type: string
 *                       example: "ID Perfil"
 *                     priceH:
 *                       type: number
 *                       example: 10
 *             example:
 *               profilePrices:
 *                 - profile: "ID perfil"
 *                   priceH: 10
 *                 - profile: "ID perfil"
 *                   priceH: 20
 *     responses:
 *       '200':
 *         description: Configuración de precios por defecto actualizada con éxito
 *       '404':
 *         description: Configuración de precios no encontrada
 *       '403':
 *         description: No autorizado
 *       '401':
 *         description: No autenticado
 */
router.patch('/default-price-config', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('updateDefaultPriceConfig', 'settings'), settings_controller_1.settingsController.updateDefaultPriceConfig);
/**
 * @swagger
 * /settings:
 *   get:
 *     summary: Obtiene la configuración actual del sistema.
 *     description: Recupera todos los ajustes configurados, incluyendo seguridad, notificaciones, plazos, y precios predeterminados. Requiere permiso 'read settings'.
 *     tags:
 *       - Settings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Configuración obtenida con éxito.
 *       403:
 *         description: No autorizado
 *       401:
 *         description: No autenticado
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('read', 'settings'), settings_controller_1.settingsController.getSettings);
/**
 * @swagger
 * /settings/default-price-config:
 *   get:
 *     summary: Obtiene la configuración de precios predeterminados.
 *     description: Recupera la lista de precios predeterminados configurados para los perfiles. Requiere permiso 'updateDefaultPriceConfig settings'
 *     tags:
 *       - Settings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Configuración de precios predeterminados obtenida con éxito.
 *       403:
 *         description: No autorizado
 *       401:
 *         description: No autenticado
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/default-price-config', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('updateDefaultPriceConfig', 'settings'), settings_controller_1.settingsController.getDefaultPriceConfig);
exports.default = router;
