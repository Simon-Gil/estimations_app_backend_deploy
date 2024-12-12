"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const authorization_middleware_1 = require("./../../common/middlewares/authorization.middleware");
const account_controller_1 = require("./../../modules/accounts/account.controller");
const price_config_controller_1 = require("./../../modules/accounts/price-config/price-config.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /accounts:
 *   get:
 *     tags:
 *       - Accounts
 *     summary: Obtiene la lista de cuentas
 *     description: Obtiene una lista de todas las cuentas disponibles para el usuario en función de sus permisos. Requiere permiso 'readSelf account'.
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
 *         description: Lista de cuentas obtenida exitosamente
 *       '401':
 *         description: No autenticado
 *       '403':
 *         description: No autorizado
 */
router.get('/', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'account'), account_controller_1.accountController.getAccounts);
/**
 * @swagger
 * /accounts/{id}/detail:
 *   get:
 *     tags:
 *       - Accounts
 *     summary: Obtiene los detalles de una cuenta específica
 *     description: Devuelve los detalles completos de una cuenta específica identificada por su ID. Requiere permiso 'read account', o 'readSelf account' si es responsable de la cuenta.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la cuenta que se desea consultar
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '200':
 *         description: Detalles de la cuenta obtenidos exitosamente
 *       '401':
 *         description: No autenticado
 *       '403':
 *         description: No autorizado
 *       '404':
 *         description: Cuenta no encontrada
 *       '500':
 *         description: Error interno del servidor
 */
// Se comprueba permiso necesario readSelf account, despues se comprueba si es resp. tecnico o comercial, si lo es, autoriza, si no se comprueba read account
router.get('/:id/detail', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'account'), (0, authorization_middleware_1.checkCommercialOrTechManagerAccount)(), (0, authorization_middleware_1.authorize)('read', 'account'), account_controller_1.accountController.getAccountDetail);
/**
 * @swagger
 * /accounts/{id}/price-config:
 *   get:
 *     summary: Obtiene configuración de precios
 *     description: Obtiene la configuración de precios por perfil para la cuenta especificada. Requiere permiso 'readPriceConfig account'.
 *     tags:
 *       - Accounts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la cuenta.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Configuración de precio obtenida con éxito.
 *       404:
 *         description: Cuenta no encontrada.
 *       401:
 *         description: No autenticado.
 *       403:
 *         description: No autorizado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id/price-config', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readPriceConfig', 'account'), account_controller_1.accountController.getAccountPriceConfig);
/**
 * @swagger
 * /accounts/{id}/opportunities:
 *   get:
 *     tags:
 *       - Accounts
 *     summary: Obtiene las oportunidades de una cuenta.
 *     description: Recupera las oportunidades asociadas a una cuenta específica. Requiere permiso 'readSelf opportunity' para obtener las oportunidades de la cuenta relacionadas con el usuario, o 'read opportunity' para obtener todas las oportunidades relacionadas con la cuenta.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la cuenta para recuperar oportunidades
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de oportunidades obtenida exitosamente
 *       '404':
 *         description: Cuenta no encontrada
 *       '401':
 *         description: No autenticado
 *       '403':
 *         description: No autorizado
 */
router.get('/:id/opportunities', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'opportunity'), account_controller_1.accountController.getAccountOpportunities);
/**
 * @swagger
 * /accounts:
 *   post:
 *     tags:
 *       - Accounts
 *     summary: Crear nueva cuenta
 *     description: Crea una nueva cuenta en el sistema. Requiere permiso 'create account'.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la cuenta
 *               email:
 *                 type: string
 *                 description: Correo electrónico de la cuenta
 *               legalName:
 *                 type: string
 *                 description: Razón social de la cuenta
 *               cif:
 *                 type: string
 *                 description: Código de identificación fiscal de la cuenta
 *               tlf:
 *                 type: string
 *                 description: Número de teléfono de la cuenta
 *     responses:
 *       '201':
 *         description: Cuenta creada exitosamente
 *       '400':
 *         description: Solicitud incorrecta
 *       '401':
 *         description: No autorizado
 *       '403':
 *         description: Prohibido - el usuario no tiene permiso para crear cuentas
 */
router.post('/', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('create', 'account'), account_controller_1.accountController.createAccount);
/**
 * @swagger
 * /accounts/{id}/opportunities:
 *   post:
 *     tags:
 *       - Accounts
 *     summary: Crea una oportunidad comercial.
 *     description: Crea una nueva oportunidad asociada a una cuenta existente. Requiere permiso 'create opportunity', o ser responsable comercial de la cuenta.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la cuenta para asociar la oportunidad
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la oportunidad
 *               requirements:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de requisitos de la oportunidad
 *               typology:
 *                 type: string
 *                 example: ID de tipología
 *                 description: Tipología de la oportunidad
 *               technicalManager:
 *                 type: string
 *                 example: ID de responsable técnico
 *                 description: ID de responsable técnico
 *               comercialManager:
 *                 type: string
 *                 example: ID de responsable comercial
 *                 description: ID del responsable comercial
 *     responses:
 *       '201':
 *         description: Oportunidad creada exitosamente
 *       '404':
 *         description: Cuenta no encontrada
 *       '403':
 *         description: No autorizado
 *       '401':
 *         description: No autenticado
 */
router.post('/:id/opportunities', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkCommercialManagerAccount)('account'), (0, authorization_middleware_1.authorize)('create', 'opportunity'), account_controller_1.accountController.createAccountOpportunity);
/**
 * @swagger
 * /accounts/{id}/price-config:
 *   post:
 *     tags:
 *       - Accounts
 *     summary: Crea una configuración de precios
 *     description: Crea una configuración de precios para una cuenta existente. Requiere permiso 'assignCustomPrices account'. Requiere que se envíen precios para todos los perfiles del sistema.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la cuenta para crear la configuración de precios
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
 *                 description: Lista de configuraciones de precios para perfiles
 *                 items:
 *                   type: object
 *                   properties:
 *                     profile:
 *                       type: string
 *                       description: El perfil para el cual se está configurando el precio
 *                       example: "ID de perfil"
 *                     priceH:
 *                       type: number
 *                       description: Precio por hora asignado al perfil
 *                       example: 150.5
 *     responses:
 *       '201':
 *         description: Configuración de precios creada exitosamente
 *       '404':
 *         description: Cuenta no encontrada
 *       '403':
 *         description: No autorizado
 *       '401':
 *         description: No autenticado
 */
router.post('/:id/price-config', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('assignCustomPrices', 'account'), price_config_controller_1.priceConfigController.createPriceConfig);
/**
 * @swagger
 * /accounts/{id}:
 *   put:
 *     tags:
 *       - Accounts
 *     summary: Actualizar cuenta
 *     description: Actualiza los detalles de una cuenta existente. Requiere permiso 'update account'.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la cuenta a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la cuenta actualizado
 *               email:
 *                 type: string
 *                 description: Correo electrónico actualizado
 *               legalName:
 *                 type: string
 *                 description: Razón social de la cuenta
 *               cif:
 *                 type: string
 *                 description: Código de identificación fiscal de la cuenta
 *               tlf:
 *                 type: string
 *                 description: Número de teléfono de la cuenta
 *     responses:
 *       '200':
 *         description: Cuenta actualizada exitosamente
 *       '401':
 *         description: No autenticado
 *       '404':
 *         description: Cuenta no encontrada
 *       '403':
 *         description: No autorizado
 */
router.put('/:id', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('update', 'account'), account_controller_1.accountController.updateAccount);
/**
 * @swagger
 * /accounts/{id}/price-config/assign-default:
 *   put:
 *     summary: Asignar configuración de precio por defecto
 *     description: Asigna la configuración de precio predeterminada a la cuenta especificada por el ID. Requiere permiso 'assignCustomPrices account'. Su único uso consiste en devolver la configuración de precios por defecto a una cuenta con configuración de precios personalizada.
 *     tags:
 *       - Accounts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la cuenta a la que se le asignará la configuración de precio por defecto.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Configuración de precio asignada correctamente.
 *       401:
 *         description: No autenticado.
 *       404:
 *         description: No se encontró la cuenta con el ID proporcionado.
 *       403:
 *         description: No autorizado.
 *       500:
 *         description: Error interno del servidor.
 */
// Con autorizacion assignCustomPrices, ya que se le está cambiando el precio actual aunque sea a default
router.put('/:id/price-config/assign-default', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('assignCustomPrices', 'account'), account_controller_1.accountController.assignDefaultPriceConfig);
/**
 * @swagger
 * /accounts/{id}/technical-manager:
 *   patch:
 *     summary: Asignar o actualiza el responsable técnico de una cuenta
 *     description: Actualiza el campo de responsable técnico de una cuenta específica. Requiere permiso 'assignTechnicalManager account'.
 *     tags:
 *       - Accounts
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación Bearer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la cuenta a la que se le asignará el responsable técnico.
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       description: Objeto JSON que contiene el ID del nuevo responsable técnico.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               technicalManager:
 *                 type: string
 *                 description: ID del nuevo responsable técnico
 *                 example: "123e4567-e89b-12d3-a456-426614"
 *     responses:
 *       200:
 *         description: Responsable técnico actualizado correctamente.
 *       401:
 *         description: No autenticado.
 *       403:
 *         description: No autorizado.
 *       404:
 *         description: No se encontró la cuenta con el ID proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */
router.patch('/:id/technical-manager', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('assignTechnicalManager', 'account'), account_controller_1.accountController.assignTechnicalManager);
/**
 * @swagger
 * /accounts/{id}/commercial-manager:
 *   patch:
 *     summary: Asignar o actualizar el responsable comercial de una cuenta
 *     description: Actualiza el campo de responsable comercial de una cuenta específica. Requiere autenticación y permiso para asignar responsable comerciales.
 *     tags:
 *       - Accounts
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación Bearer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la cuenta a la que se le asignará el responsable comercial.
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       description: Objeto JSON que contiene el ID del nuevo responsable comercial.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commercialManager:
 *                 type: string
 *                 description: ID del nuevo responsable comercial
 *                 example: "manager_12345"
 *     responses:
 *       200:
 *         description: Responsable comercial actualizado correctamente.
 *       401:
 *         description: No autenticado.
 *       403:
 *         description: No autorizado.
 *       404:
 *         description: No se encontró la cuenta con el ID proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */
router.patch('/:id/commercial-manager', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('assignCommercialManager', 'account'), account_controller_1.accountController.assignCommercialManager);
exports.default = router;
