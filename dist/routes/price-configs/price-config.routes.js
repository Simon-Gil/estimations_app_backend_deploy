"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const authorization_middleware_1 = require("./../../common/middlewares/authorization.middleware");
const price_config_controller_1 = require("../../modules/accounts/price-config/price-config.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /price-configs/{id}:
 *   put:
 *     tags:
 *       - PriceConfig
 *     summary: Actualiza una configuración de precio
 *     description: Actualiza una configuración de precio existente. Requiere permiso 'assignCustomPrices account'. Requiere que se envíen precios para todos los perfiles disponibles en el sistema.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la configuración de precios
 *         schema:
 *           type: string
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
 *         description: Configuración de precio actualizada con éxito
 *       '404':
 *         description: Configuración de precio no encontrada
 *       '403':
 *         description: No autorizado
 *       '401':
 *         description: No autenticado
 */
router.put('/:id', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('assignCustomPrices', 'account'), price_config_controller_1.priceConfigController.updatePriceConfig);
exports.default = router;
