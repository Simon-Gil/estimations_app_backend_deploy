"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const task_categories_controller_1 = require("../../modules/company-structure/task-categories/task-categories.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /task-categories:
 *   get:
 *     summary: Obtener categorías de tareas
 *     description: Obtiene el árbol de categorías utilizado para clasificar las tareas en la aplicación. Requiere autenticación.
 *     tags:
 *       - Task Categories
 *     security:
 *       - bearerAuth: []  # Autenticación requerida
 *     responses:
 *       200:
 *         description: Estructura devuelta con éxito
 *       401:
 *         description: No autenticado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', auth_middleware_1.authenticate, task_categories_controller_1.taskCategoriesController.getCategories);
exports.default = router;
