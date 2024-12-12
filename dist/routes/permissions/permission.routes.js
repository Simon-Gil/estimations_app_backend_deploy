"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const authorization_middleware_1 = require("./../../common/middlewares/authorization.middleware");
const permission_controller_1 = require("../../modules/roles_and_permissions/permission/permission.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /permissions:
 *   get:
 *     tags:
 *       - Permissions
 *     summary: Obtiene lista de permisos
 *     description: Obtiene la lista de permisos del sistema. Requiere permiso 'manage roles_and_permissions'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de permisos obtenida con éxito
 *       '403':
 *         description: No autorizado
 *       '401':
 *         description: No autenticado
 */
router.get('/', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('manage', 'roles_and_permissions'), permission_controller_1.permissionController.getPermissions);
exports.default = router;
