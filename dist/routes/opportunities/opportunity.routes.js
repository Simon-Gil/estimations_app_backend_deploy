"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const opportunity_controller_1 = require("./../../modules/opportunity/opportunity.controller");
const authorization_middleware_1 = require("./../../common/middlewares/authorization.middleware");
const document_controller_1 = require("../../modules/opportunity/opportunity-documents/document.controller");
const router = (0, express_1.Router)();
// Rutas para Opportunity
/**
 * @swagger
 * /opportunities/{id}:
 *   put:
 *     tags:
 *       - Opportunities  # Etiqueta para agrupar rutas relacionadas con oportunidades
 *     summary: Actualiza una oportunidad
 *     description: Actualiza los detalles de una oportunidad. Requiere permiso 'update opportunity'.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la oportunidad
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
 *                 example: Nombre
 *               requirements:
 *                 type: array
 *                 description: Lista de los requisitos de la oportunidad
 *                 items:
 *                   type: string
 *                 example: [Requisito 1, Requisito 2]
 *     responses:
 *       '200':
 *         description: Oportunidad actualizada con éxito
 *       '404':
 *         description: Oportunidad no encontrada
 *       '403':
 *         description: No autorizado
 *       '401':
 *         description: No autenticado
 */
router.put('/:id', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('update', 'opportunity'), opportunity_controller_1.opportunityController.updateOpportunity);
/**
 * @swagger
 * /opportunities/{id}/proposals:
 *   post:
 *     tags:
 *       - Opportunities  # Etiqueta para agrupar rutas relacionadas con oportunidades
 *     summary: Crea una propuesta
 *     description: Crea propuesta relacionada con oportunidad comercial. Requiere permiso 'create proposal' o ser responsable técnico o comercial de la oportunidad asociada.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la oportunidad
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               techProposal:
 *                 type: string
 *                 example: "Descripción de la propuesta tecnológica"
 *               goalAndContext:
 *                 type: string
 *                 example: "Contexto y objetivos de la propuesta"
 *     responses:
 *       '201':
 *         description: Propuesta creada con éxito
 *       '404':
 *         description: Oportunidad no encontrada
 *       '403':
 *         description: No autorizado
 *       '401':
 *         description: No autenticado
 */
router.post('/:id/proposals', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkCommercialManagerAccount)('opportunity'), (0, authorization_middleware_1.checkTechnicalManagerAccount)('opportunity'), (0, authorization_middleware_1.checkCommercialManagerOpportunity)('opportunity'), (0, authorization_middleware_1.checkTechManagerOpportunity)('opportunity'), (0, authorization_middleware_1.authorize)('create', 'proposal'), opportunity_controller_1.opportunityController.createOpportunityProposal);
/**
 * @swagger
 * /opportunities/{id}/estimations:
 *   get:
 *     tags:
 *       - Opportunities
 *     summary: Obtiene las estimaciones asociadas a una oportunidad
 *     description: Obtiene una lista de estimaciones asociadas a oportunidad. Requiere permiso 'readSelf estimation'.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la oportunidad
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de estimaciones obtenidas con éxito
 *       '404':
 *         description: Oportunidad no encontrada
 *       '403':
 *         description: No autorizado
 *       '401':
 *         description: No autenticado
 */
router.get('/:id/estimations', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'estimation'), opportunity_controller_1.opportunityController.getOpportunityEstimations);
/**
 * @swagger
 * /opportunities/{id}/proposals:
 *   get:
 *     tags:
 *       - Opportunities  # Etiqueta para agrupar rutas relacionadas con oportunidades
 *     summary: Obtiene la lista de propuestas de una oportunidad
 *     description: Obtiene la lista de propuestas de una oportunidad. Requiere permiso 'readSelf proposal'
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la oportunidad
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de propuestas obtenida con éxito
 *       '404':
 *         description: Oportunidad no encontrada
 *       '403':
 *         description: No autorizado
 */
router.get('/:id/proposals', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'proposal'), opportunity_controller_1.opportunityController.getOpportunityProposals);
/**
 * @swagger
 * /opportunities:
 *   get:
 *     tags:
 *       - Opportunities
 *     summary: Obtiene lista de oportunidades
 *     description: Obtiene las oportunidades accesibles por el usuario. Requiere permiso 'readSelf opportunity'.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
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
 *         description: Lista de oportunidades obtenida con éxito
 *       '403':
 *         description: No autorizado
 *       '401':
 *         description: No autenticado
 */
router.get('/', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'opportunity'), opportunity_controller_1.opportunityController.getOpportunities);
/**
 * @swagger
 * /opportunities/{id}/status:
 *   patch:
 *     tags:
 *       - Opportunities
 *     summary: Actualiza el estado de una oportunidad
 *     description: Actualiza el estado de una oportunidad, marcandola como ganada o perdida. Requiere permiso 'updateStatus opportunity', o en su defecto que el usuario sea responsable comercial de la oportunidad.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la oportunidad
 *         schema:
 *           type: string
 *     requestBody:
 *       description: JSON contenedor del nuevo status
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: El nuevo status de la oportunidad
 *                 example: "won"
 *     responses:
 *       '200':
 *         description: Estado actualizado con éxito
 *       '400':
 *         description: Petición no válida
 *       '404':
 *         description: Oportunidad no encontrada
 *       '403':
 *         description: No autorizado
 *       '401':
 *         description: No autenticado
 */
router.patch('/:id/status', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkCommercialManagerOpportunity)('opportunity'), (0, authorization_middleware_1.authorize)('updateStatus', 'opportunity'), opportunity_controller_1.opportunityController.updateOpportunityStatus);
/**
 * @swagger
 * /opportunities/{id}/documents:
 *   get:
 *     tags:
 *       - Opportunities
 *     summary: Obtiene una lista de los documentos asociados a oportunidad
 *     description: Obtiene la lista de documentos asociados a oportunidad. Requiere permiso 'downloadDocument opportunity'.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de oportunidad
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de documentos obtenida con éxito.
 *       '401':
 *         description: No autenticado
 *       '404':
 *         description: Oportunidad no encontrada
 *       '403':
 *         description: No autorizado
 */
router.get('/:id/documents', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('downloadDocument', 'opportunity'), document_controller_1.documentController.getOpportunityDocuments);
/**
 * @swagger
 * /opportunities/{id}/documents:
 *   post:
 *     tags:
 *       - Opportunities
 *     summary: Registra un nuevo documento
 *     description: Crea un registro en la base de datos de un nuevo documento subido al servicio de almacenamiento. Requiere permiso 'uploadDocument opportunity'.
 *     security:
 *       - bearerAuth: []  # Indica que este endpoint requiere autenticación
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the opportunity to associate the document with
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Object containing the document details to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *                 description: The name of the file to be uploaded
 *                 example: "example.pdf"
 *               fileType:
 *                 type: string
 *                 description: The MIME type of the file to be uploaded
 *                 example: "application/pdf"
 *     responses:
 *       '200':
 *         description: Document created and associated with the opportunity successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 document_id:
 *                   type: string
 *                   description: The unique identifier of the newly created document
 *                 file_name:
 *                   type: string
 *                   description: The name of the uploaded file
 *                 file_type:
 *                   type: string
 *                   description: The MIME type of the uploaded file
 *                 file_path:
 *                   type: string
 *                   description: The path where the file is stored
 *                 opportunity_id:
 *                   type: string
 *                   description: The ID of the opportunity the document is associated with
 *       '400':
 *         description: Bad request - missing or invalid data
 *       '401':
 *         description: Unauthorized - user must be authenticated
 *       '404':
 *         description: Opportunity not found
 *       '403':
 *         description: Forbidden - user does not have permission to create a document for this opportunity
 *       '500':
 *         description: Internal server error
 */
router.post('/:id/documents', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkTechManagerOpportunity)('opportunity'), (0, authorization_middleware_1.checkCommercialManagerOpportunity)('opportunity'), (0, authorization_middleware_1.authorize)('uploadDocument', 'opportunity'), document_controller_1.documentController.createDocumentRecord);
/**
 * @swagger
 * /opportunities/{id}/documents:
 *   delete:
 *     tags:
 *       - Opportunities  # Etiqueta para agrupar rutas relacionadas con oportunidades
 *     summary: Elimina el registro de un documento
 *     description: Elimina el registro de un documento asociado a oportunidad. Requiere permiso 'deleteDocument opportunity'.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la oportunidad
 *         schema:
 *           type: string
 *     requestBody:
 *       description: JSON que contiene los detalles del documento a eliminar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *                 description: Nombre del archivo
 *                 example: "example.pdf"
 *     responses:
 *       '200':
 *         description: Registro de documento eliminado con éxito
 *       '400':
 *         description: Petición no válida
 *       '401':
 *         description: No autenticado
 *       '404':
 *         description: Documento u oportunidad no encontrados.
 *       '403':
 *         description: No autorizado
 *       '500':
 *         description: Error interno del servidor
 */
router.delete('/:id/documents', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('deleteDocument', 'opportunity'), document_controller_1.documentController.deleteDocumentRecord);
/**
 * @swagger
 * /opportunities/{id}:
 *   delete:
 *     tags:
 *       - Opportunities
 *     summary: Elimina una oportunidad.
 *     description: Elimina la oportunidad correspondiente al ID especificado. Requier permiso 'delete opportunity'. Si la oportunidad tiene un estado definido (ganada o perdida), requiere permiso 'manage opportunity'.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la oportunidad
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '203':
 *         description: Oportunidad eliminada con éxito
 *       '400':
 *         description: Petición no válida
 *       '401':
 *         description: No autenticado
 *       '403':
 *         description: No autorizado
 *       '404':
 *         description: Oportunidad no encontrada
 *       '500':
 *         description: Error interno del servidor
 */
router.delete('/:id', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('delete', 'opportunity'), opportunity_controller_1.opportunityController.deleteOpportunity);
/**
 * @swagger
 * /opportunities/{id}/commercial-manager:
 *   patch:
 *     tags:
 *       - Opportunities
 *     summary: Asigna o actualiza el responsable comercial de una oportunidad
 *     description: Asigna o actualiza el responsable comercial de una oportunidad. Requiere permiso 'assignCommercialManager opportunity'.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la oportunidad.
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       description: Objeto JSON que contiene el ID del usuario asignado.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commercialManager:
 *                 type: string
 *                 description: ID del nuevo responsable comercial
 *                 example: "123e4567-e89b-12d3-a456-42"
 *     responses:
 *       '200':
 *         description: Responsable comercial asignado con éxito
 *       '400':
 *         description: Petición no válida
 *       '401':
 *         description: No autenticado
 *       '403':
 *         description: No autorizado
 *       '404':
 *         description: Oportunidad no encontrada
 *       '500':
 *         description: Error interno del servidor
 */
router.patch('/:id/commercial-manager', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('assignCommercialManager', 'opportunity'), opportunity_controller_1.opportunityController.assignCommercialManager);
/**
 * @swagger
 * /opportunities/{id}/technical-manager:
 *   patch:
 *     tags:
 *       - Opportunities
 *     summary: Asigna o actualiza el responsable técnico de una oportunidad
 *     description: Asigna o actualiza el responsable técnico de una oportunidad. Requiere permiso 'assignTechnicalManager opportunity'.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la oportunidad
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       description: JSON que contiene el ID del nuevo responsable
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               technicalManager:
 *                 type: string
 *                 description: ID del nuevo responsable técnico
 *                 example: "4567-e89b-12d3-a456"
 *     responses:
 *       '200':
 *         description: Responsable técnico asignado con éxito
 *       '400':
 *         description: Petición no válida
 *       '401':
 *         description: No autenticado
 *       '403':
 *         description: No autorizado
 *       '404':
 *         description: Oportunidad no encontrada
 *       '500':
 *         description: Error interno del servidor
 */
router.patch('/:id/technical-manager', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('assignTechnicalManager', 'opportunity'), opportunity_controller_1.opportunityController.assignTechnicalManager);
exports.default = router;
