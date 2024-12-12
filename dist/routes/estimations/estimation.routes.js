"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const authorization_middleware_1 = require("../../common/middlewares/authorization.middleware");
const estimation_controller_1 = require("../../modules/estimations/estimation.controller");
const estimation_user_controller_1 = require("../../modules/estimations/estimation-user/estimation-user.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /estimations/{id}/complete:
 *   put:
 *     tags:
 *       - Estimations
 *     summary: Finaliza una estimación
 *     description: Actualiza a 'done' el estado de una estimación. Esto actualiza el estado de la propuesta asociada a 'ready_for_validation'. Requiere permiso 'updateStatus estimation', o que el usuario sea responsable técnico de la oportunidad asociada.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the estimation to update
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Estado actualizado
 *       '404':
 *         description: Estimación no encontrada
 *       '403':
 *         description: No autorizado
 *       '401':
 *         description: No autenticado
 */
router.put('/:id/complete', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkTechManagerOpportunity)('estimation'), (0, authorization_middleware_1.authorize)('updateStatus', 'estimation'), estimation_controller_1.estimationController.completeEstimation);
/**
 * @swagger
 * /estimations/{id}/tasks:
 *   post:
 *     summary: Crea una tarea.
 *     description: Crea tarea para la estimación especificada. Requiere permiso 'create task' o que el usuario sea responsable técnico de la oportunidad asociada.
 *     tags:
 *       - Estimations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la estimación.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               secondLevelCategory:
 *                 type: string
 *                 description: ID de la categoría de segundo nivel.
 *                 example: "ID de categoría segundo nivel"
 *               description:
 *                 type: string
 *                 description: Descripción de la tarea.
 *                 example: "Descripción de la tarea"
 *               profiles:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "ID perfil 1"
 *     responses:
 *       201:
 *         description: Tarea creada con éxito.
 *       400:
 *         description: Datos introducidos no válidos.
 *       401:
 *         description: No autenticado.
 *       403:
 *         description: No autorizado.
 *       404:
 *         description: Estimación no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/:id/tasks', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkTechManagerOpportunity)('estimation'), (0, authorization_middleware_1.authorize)('create', 'task'), estimation_controller_1.estimationController.createEstimationTask);
/**
 * @swagger
 * /estimations/{id}/tasks:
 *   get:
 *     tags:
 *       - Estimations
 *     summary: Obtiene todas las tareas de una estimación
 *     description: Obtiene la lista de tareas de una estimación. Requiere permiso 'readSelf estimation'. Si el usuario no tiene permiso 'read estimation', o no está relacionado con la estimación, devuelve estado 403 (No autorizado).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la estimacion para recuperar tareas
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de tareas obtenida con éxito
 *       '403':
 *         description: No autorizado
 *       '401':
 *         description: No autenticado
 */
router.get('/:id/tasks', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'estimation'), estimation_controller_1.estimationController.getEstimationTasks);
/**
 * @swagger
 * /estimations/{id}/detail:
 *   get:
 *     tags:
 *       - Estimations
 *     summary: Obtiene detalle de una estimación
 *     description: Obtiene detalle de estimación. Incluye tareas y perfiles estimables. Requiere permiso 'readSelf estimation', devuelve status 403 (No autorizado) si el usuario no está relacionado con la estimación o carece de permiso 'read estimation'. Devuelve los precios mínimos y máximos calculados si el usuario tiene permiso 'readPriceConfig account'.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la estimacion
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Detalle de la estimacion
 *       '403':
 *         description: No autorizado
 *       '401':
 *         description: No autenticado
 */
router.get('/:id/detail', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'estimation'), estimation_controller_1.estimationController.getEstimationDetail);
/**
 * @swagger
 * /estimations/{id}:
 *   delete:
 *     tags:
 *       - Estimations
 *     summary: Elimina una estimación
 *     description: Permite la eliminación de una estimación específica mediante su ID. Requiere permiso 'delete estimation'.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la estimación a eliminar
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '203':
 *         description: Estimación eliminada correctamente
 *       '403':
 *         description: No autorizado
 *       '401':
 *         description: No autenticado
 *       '404':
 *         description: Estimación no encontrada
 *       '500':
 *         description: Error interno del servidor
 */
router.delete('/:id', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('delete', 'estimation'), estimation_controller_1.estimationController.deleteEstimation);
/**
 * @swagger
 * /estimations:
 *   get:
 *     tags:
 *       - Estimations
 *     summary: Obtiene todas las estimaciones accesibles por el usuario
 *     description: Obtiene las estimaciones a las que tiene acceso el usuario autenticado. Requiere permiso 'readSelf estimation'.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     responses:
 *       '200':
 *         description: A list of estimations retrieved successfully
 *       '403':
 *         description: Forbidden - user does not have permission to read estimations
 */
router.get('/', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'estimation'), estimation_controller_1.estimationController.getEstimations);
// Rutas para usuarios
/**
 * @swagger
 * /estimations/{id}/users/finish/:
 *   patch:
 *     tags:
 *       - Estimations
 *     summary: Finaliza la estimación para el usuario autenticado
 *     description: Marca la estimación especificada como "finalizada" para el usuario autenticado.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la estimación a finalizar para el usuario autenticado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: La estimación ha sido marcada como finalizada para el usuario.
 *       400:
 *         description: Solicitud inválida, por ejemplo, si el ID de la estimación no existe o el usuario no está asignado a ella.
 *       401:
 *         description: No autenticado.
 *       500:
 *         description: Error en el servidor al finalizar la estimación.
 */
router.patch('/:id/users/finish/', auth_middleware_1.authenticate, estimation_user_controller_1.estimationUserController.finishEstimation);
/**
 * @swagger
 * /estimations/{id}/users:
 *   post:
 *     summary: Añadir usuarios a una estimación
 *     description: Añadir usuarios a una estimación. Requiere permiso 'assignUsers estimation' o que el usuario sea responsable técnico de la oportunidad asociada.
 *     tags:
 *       - Estimations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la estimación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               users:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "ID usuario 1"
 *     responses:
 *       201:
 *         description: Usuarios asociados con éxito
 *       400:
 *         description: Petición no válida
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/:id/users', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkTechManagerOpportunity)('estimation'), (0, authorization_middleware_1.authorize)('assignUsers', 'estimation'), estimation_user_controller_1.estimationUserController.assignUsersToEstimation);
/**
 * @swagger
 * /estimations/{estimationId}/users/{userId}:
 *   delete:
 *     tags:
 *       - Estimations
 *     summary: Elimina una relación estimación-usuario
 *     description: Elimina relaciones entre usuarios y estimaciones. Requiere permiso 'assignUsers estimation', o que el usuario sea responsable técnico de la oportunidad asociada.
 *     operationId: deleteUserFromEstimation
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: estimationId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la estimación.
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario.
 *     responses:
 *       200:
 *         description: Relación estimación-usuario eliminada con éxito.
 *       400:
 *         description: Solicitud no válida.
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: La relación no ha sido encontrada
 */
router.delete('/:estimationId/users/:userId', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkTechManagerOpportunity)('estimation'), (0, authorization_middleware_1.authorize)('assignUsers', 'estimation'), estimation_user_controller_1.estimationUserController.deleteUsersFromEstimation);
exports.default = router;
