"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const authorization_middleware_1 = require("./../../common/middlewares/authorization.middleware");
const task_controller_1 = require("../../modules/estimations/task/task.controller");
// Rutas Task
const router = (0, express_1.Router)();
/**
 * @swagger
 * /tasks/{id}/profile-estimation:
 *   post:
 *     summary: Añade un nuevo perfil estimable para la tarea
 *     description: Crea una tarea de estimación de horas en función del perfil proporcionado y del ID de la tarea. Requiere permiso 'createTasksProfiles task', o en su defecto que el usuario sea el responsable técnico de la oportunidad asociada.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea para la cual se va a crear la estimación.
 *         schema:
 *           type: string
 *           example: "123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profile:
 *                 type: string
 *                 example: "ID de perfil"
 *                 description: El perfil para la estimación de horas.
 *     responses:
 *       200:
 *         description: Tarea-perfil creada correctamente
 *       400:
 *         description: Error en la solicitud
 *       401:
 *         description: No autenticado
 *       500:
 *         description: Error interno del servidor
 *       403:
 *         description: No autorizado
 *
 */
router.post('/:id/profile-estimation', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkTechManagerOpportunity)('task'), (0, authorization_middleware_1.authorize)('createTasksProfiles', 'task'), task_controller_1.taskController.createHrsTaskProfile);
/**
 * @swagger
 * /tasks/{id}/status:
 *   patch:
 *     summary: Actualiza el estado de una tarea
 *     description: Cambia el estado de una tarea específica usando su ID y el estado proporcionado en la solicitud. Requiere permiso 'updateStatus task' o que el usuario sea responsable técnico de oportunidad asociada.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a actualizar.
 *         schema:
 *           type: string
 *           example: "123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "DONE"
 *                 description: El nuevo estado de la tarea.
 *     responses:
 *       200:
 *         description: Estado de la tarea actualizado correctamente
 *       400:
 *         description: Error en la solicitud, como un estado no válido o perfiles pendientes.
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error en el servidor
 */
router.patch('/:id/status', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkTechManagerOpportunity)('task'), (0, authorization_middleware_1.authorize)('updateStatus', 'task'), task_controller_1.taskController.updateTaskStatus);
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea
 *     description: Elimina una tarea específica usando su ID. Requiere permiso 'delete task' o que el usuario sea responsable técnico de oportunidad asociada.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a eliminar.
 *         schema:
 *           type: string
 *           example: "1234567890"
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 *       400:
 *         description: Error en la solicitud
 *       401:
 *         description: No autenticado
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error en el servidor
 *       403:
 *         description: No autorizado
 */
router.delete('/:id', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkTechManagerOpportunity)('task'), (0, authorization_middleware_1.authorize)('delete', 'task'), task_controller_1.taskController.deleteTask);
/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtiene una tarea
 *     description: Recupera una tarea específica usando su ID. Requiere permiso 'readSelf estimation'.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a obtener.
 *         schema:
 *           type: string
 *           example: "1234567890"
 *     responses:
 *       200:
 *         description: Tarea recuperada correctamente
 *       400:
 *         description: Error en la solicitud
 *       401:
 *         description: No autenticado
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'estimation'), task_controller_1.taskController.getTask);
exports.default = router;
