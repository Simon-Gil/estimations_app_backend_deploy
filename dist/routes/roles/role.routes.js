"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const authorization_middleware_1 = require("./../../common/middlewares/authorization.middleware");
const role_controller_1 = require("../../modules/roles_and_permissions/role/role.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /roles:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Obtiene lista de roles
 *     description: Devuelve una lista con todos los roles del sistema.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     responses:
 *       '200':
 *         description: Lista de roles obtenida
 *       '401':
 *         description: No autenticado
 */
router.get('/', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('manage', 'roles_and_permissions'), role_controller_1.roleController.getRoles);
/**
 * @swagger
 * /roles/{id}/permissions:
 *   put:
 *     tags:
 *       - Roles
 *     summary: Actualiza los permisos asociados a un rol
 *     description: Actualiza los permisos asociados a un rol. Requiere permiso 'manage roles_and_permissions'.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del rol
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               granted:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["ID permiso 1", "ID permiso 2"]
 *               revoked:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["ID permiso 3", "ID permiso 4"]
 *     responses:
 *       '200':
 *         description: Permisos actualizados con éxito
 *       '404':
 *         description: Rol no encontrado
 *       '403':
 *         description: No autorizado
 *       '401':
 *         description: No autenticado
 *
 */
router.put('/:id/permissions', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('manage', 'roles_and_permissions'), role_controller_1.roleController.updatePermissions);
/**
 * @swagger
 * /roles/{id}/permissions:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Obtiene los permisos de un rol específico.
 *     description: Obtiene estructura de árbol con los permisos asignados a un rol específico. La estructura está construida según la organización de CASL en subjects y actions. Las actions concedidas al rol tendrán el campo booleano isActive como true.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the role to retrieve permissions for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Permisos obtenidos con éxito
 *       '404':
 *         description: Rol no encontrado
 *       '403':
 *         description: No autorizado
 *       '401': No autenticado
 */
router.get('/:id/permissions', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('manage', 'roles_and_permissions'), role_controller_1.roleController.getRolePermissions);
exports.default = router;
