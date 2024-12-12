"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const profile_controller_1 = require("../../modules/company-structure/profile/profile.controller");
// Rutas Profile
const router = (0, express_1.Router)();
/**
 * @swagger
 * /profiles:
 *   get:
 *     tags:
 *       - Profiles
 *     summary: Obtiene lista de perfiles
 *     description: Obtiene una lista con todos los perfiles estimables disponibles en el sistema
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de perfiles obtenida con éxito
 *       '401':
 *         description: No autenticado
 */
router.get('/', auth_middleware_1.authenticate, profile_controller_1.profileController.getAllProfiles);
exports.default = router;
