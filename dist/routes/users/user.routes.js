"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./../../modules/user/user.controller");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const authorization_middleware_1 = require("./../../common/middlewares/authorization.middleware");
const router = (0, express_1.Router)();
// Rutas Usuarios
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Actualiza un usuario
 *     description: Actualiza los datos de un usuario. Requiere permiso 'update user'
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: string
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
 *                 example: user@example.com
 *               roles:
 *                 type: array
 *                 description: Lista de IDs de roles asignados al usuario
 *                 items:
 *                   type: string
 *                 example: [ID de rol 1, ID de rol 2]
 *               department:
 *                 type: string
 *                 description: Departamento del usuario
 *                 example: ID de departamento
 *               grade:
 *                 type: string
 *                 description: Nivel del usuario
 *                 example: ID de nivel
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: Nombre
 *               lastname:
 *                 type: string
 *                 description: Apellidos del usuario
 *                 example: Apellidos
 *     responses:
 *       '200':
 *         description: Usuario actualizado con éxito
 *       '404':
 *         description: Usuario no encontrado
 *       '403':
 *         description: No autorizado
 *       '401':
 *         description: No autenticado
 *       '500':
 *         description: Error interno del servidor
 */
router.put('/:id', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('update', 'user'), user_controller_1.userController.updateUser);
/**
 * @swagger
 * /users/{id}/block:
 *   put:
 *     tags:
 *       - Users  # Etiqueta para agrupar rutas relacionadas con usuarios
 *     summary: Bloquea o desbloquea un usuario
 *     description: Bloquea o desbloquea el usuario especificado. Impidiendo su autenticación. Requiere permiso 'block user'.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID del usuario
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               block:
 *                 type: boolean
 *                 description: Indica se bloquea (true) o desbloquea (false) al usuario.
 *                 example: true
 *     responses:
 *       '200':
 *         description: Bloqueo del usuario actualizado con éxito.
 *       '404':
 *         description: Usuario no encontrado.
 *       '403':
 *         description: No autorizado
 *       '401':
 *         description: No autenticado
 *       '500':
 *         description: Error interno del servidor
 */
router.put('/:id/block', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('block', 'user'), user_controller_1.userController.setUserBlock);
/**
 * @swagger
 * /users/filtered:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtiene lista filtrada de usuarios
 *     description: Devuelve una lista de usuarios filtrada por departamento y nivel. Requiere permiso 'readSelf users'. Su uso está destinado a mostrar solo los usuarios pertinentes al contexto.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: departments
 *         in: query
 *         required: false
 *         description: Lista de IDs de departamentos separada por comas
 *         schema:
 *           type: string
 *           example: "1,2,3"
 *       - name: grades
 *         in: query
 *         required: false
 *         description: Lista de IDs de niveles separada por comas
 *         schema:
 *           type: string
 *           example: "4,5,6"
 *     responses:
 *       '200':
 *         description: Lista de usuarios devuelta con éxito
 *       '403':
 *         description: No autorizado
 *       '401':
 *         description: No autenticado
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/filtered', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'user'), user_controller_1.userController.getFilteredUsers);
/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Crea un nuevo usuario
 *     description: Crea un usuario con los datos especificados. Requiere permiso 'create user'. Envía un correo electrónico al usuario con un enlace para reestablecer contraseña. Si no se asigna un rol específico este será calculado en función de su departamento y nivel.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: Email de usuario
 *               password:
 *                 type: string
 *                 example: Password de usuario
 *               name:
 *                 type: string
 *                 example: Nombre
 *               lastname:
 *                 type: string
 *                 example: Apellidos
 *               grade:
 *                 type: string
 *                 example: ID de nivel
 *               department:
 *                 type: string
 *                 example: ID de departamento
 *               roles:
 *                 type: array
 *                 description: Lista de IDs de roles asignados al usuario
 *                 items:
 *                   type: string
 *                 example: [ID de rol 1, ID de rol 2]
 *     responses:
 *       '201':
 *         description: Usuario creado con éxito
 *       '400':
 *         description: Petición no válida
 *       '403':
 *         description: No autorizado
 *       '401':
 *         description: No autenticado
 */
router.post('/', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('create', 'user'), user_controller_1.userController.createUser);
/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtiene la lista de usuarios
 *     description: Obtiene una lista con todos los usuarios del sistema. Requiere permiso 'read user'.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: offset
 *         in: query
 *         required: false
 *         description: Registro a partir del cual se devuelve la consulta
 *         schema:
 *           type: string
 *           example: "10"
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Número de registros que devuelve la consulta
 *         schema:
 *           type: string
 *           example: "20"
 *     responses:
 *       '200':
 *         description: Lista de usuarios devuelta con éxito
 *       '403':
 *         description: No autorizado
 *       '401':
 *         description: No autenticado
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('read', 'user'), user_controller_1.userController.getUsers);
/**
 * @swagger
 * /users/me:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtiene la información del usuario autenticado
 *     description: Obtiene los datos del usuario autenticado.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     responses:
 *       '200':
 *         description: Usuario devuelto con éxito
 *       '401':
 *         description: No autenticado
 *       '403':
 *         description: No autorizado
 */
router.get('/me', auth_middleware_1.authenticate, user_controller_1.userController.getCurrentUser);
exports.default = router;
