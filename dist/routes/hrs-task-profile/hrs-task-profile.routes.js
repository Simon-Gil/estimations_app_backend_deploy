"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const hrs_task_profile_controller_1 = require("../../modules/estimations/task/hrs-task-profile/hrs-task-profile.controller");
const authorization_middleware_1 = require("./../..//common/middlewares/authorization.middleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /hrs-task-profile/{taskId}/{profileId}:
 *   put:
 *     tags:
 *       - HrsTaskProfile
 *     summary: Actualiza la estimación de horas por perfiles para una tarea
 *     description: Actualiza la estimación de horas por perfiles para una tarea. Requiere permiso 'updateTaskProfiles task'.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: El ID de la tarea
 *         schema:
 *           type: string
 *       - name: profileId
 *         in: path
 *         required: true
 *         description: El ID del perfil
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hMin:
 *                 type: number
 *                 description: Horas mínimas
 *                 example: "5"
 *               hMax:
 *                 type: number
 *                 description: Horas máximas
 *                 example: "10"
 *     responses:
 *       '200':
 *         description: Perfil estimable de tarea actualizado con éxito
 *       '404':
 *         description: Perfil estimable para tarea no encontrado.
 *       '403':
 *         description: No autorizado
 *       '401':
 *         description: No autenticado
 */
router.put('/:taskId/:profileId', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('updateTasksProfiles', 'task'), hrs_task_profile_controller_1.hrsTaskProfileController.updateHrsTaskProfile);
/**
 * @swagger
 * /hrs-task-profile/{taskId}/{profileId}:
 *   delete:
 *     summary: Elimina una relación entre una tarea y un perfil
 *     description: Elimina la asociación entre una tarea específica y un perfil según sus identificadores. Requiere permiso 'delete task', o que el usuario sea responsable técnico de la oportunidad asociada.
 *     tags:
 *       - HrsTaskProfile  # Etiqueta para agrupar rutas relacionadas
 *     security:
 *       - bearerAuth: []  # Requiere autenticación
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del perfil asociado a la tarea
 *     responses:
 *       200:
 *         description: Relación entre la tarea y el perfil eliminada exitosamente
 *       400:
 *         description: Solicitud incorrecta - datos faltantes o no válidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: No se ha encontrado la relación tarea-perfil
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:taskId/:profileId', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkTechManagerOpportunity)('task'), (0, authorization_middleware_1.authorize)('delete', 'task'), hrs_task_profile_controller_1.hrsTaskProfileController.deleteHrsTaskProfile);
exports.default = router;
