"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const authorization_middleware_1 = require("./../../common/middlewares/authorization.middleware");
const document_controller_1 = require("../../modules/opportunity/opportunity-documents/document.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /documents/opportunities/{id}/upload-url:
 *   post:
 *     summary: Genera una URL de carga firmada para un archivo específico
 *     description: Obtiene una URL firmada de carga para un archivo, permitiendo la carga segura en el proveedor de almacenamiento configurado. Requiere permiso 'uploadDocument opportunity', o que el usuario sea responsable comercial o técnico de la oportunidad.
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la oportunidad relacionada con el archivo
 *     requestBody:
 *       description: Información del archivo que se va a subir
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *                 description: Nombre del archivo a subir
 *               fileType:
 *                 type: string
 *                 description: Tipo MIME del archivo a subir
 *     responses:
 *       200:
 *         description: URL de carga firmada generada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "https://provider.com/upload-url"
 *       400:
 *         description: Solicitud incorrecta o datos faltantes
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/opportunities/:id/upload-url', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkTechManagerOpportunity)('opportunity'), (0, authorization_middleware_1.checkCommercialManagerOpportunity)('opportunity'), (0, authorization_middleware_1.authorize)('uploadDocument', 'opportunity'), document_controller_1.documentController.getUploadSignedURL);
/**
 * @swagger
 * /documents/opportunities/{id}/download-url:
 *   post:
 *     summary: Genera una URL de descarga firmada para un archivo específico
 *     description: Obtiene una URL firmada de descarga para un archivo, permitiendo la descarga segura desde el proveedor de almacenamiento configurado. Requiere permiso 'downloadDocument opportunity' o ser responsable técnico o comercial de la oportunidad
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la oportunidad relacionada con el archivo
 *     requestBody:
 *       description: Información del archivo que se va a descargar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *                 description: Nombre del archivo a descargar
 *     responses:
 *       200:
 *         description: URL de descarga firmada generada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "https://provider.com/download-url"
 *       400:
 *         description: Solicitud incorrecta o datos faltantes
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/opportunities/:id/download-url', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkTechManagerOpportunity)('opportunity'), (0, authorization_middleware_1.checkCommercialManagerOpportunity)('opportunity'), (0, authorization_middleware_1.authorize)('downloadDocument', 'opportunity'), document_controller_1.documentController.getDownloadSignedURL);
/**
 * @swagger
 * /documents/opportunities/{id}/check-existing-file:
 *   get:
 *     summary: Verifica si un archivo existe en el proveedor de almacenamiento
 *     description: Verifica si un archivo específico ya existe en el almacenamiento configurado para la oportunidad, usando el nombre y el tipo del archivo como parámetros de consulta. Requiere permiso 'uploadDocument opportunity' o ser responsable técnico o comercial de la oportunidad.
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la oportunidad relacionada con el archivo
 *       - in: query
 *         name: fileName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del archivo que se desea verificar
 *       - in: query
 *         name: fileType
 *         required: true
 *         schema:
 *           type: string
 *         description: Tipo de archivo (MIME type) que se desea verificar
 *     responses:
 *       200:
 *         description: El archivo existe o no en el almacenamiento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 existingFile:
 *                   type: boolean
 *                   description: Indica si el archivo ya existe o no
 *                   example: true
 *       400:
 *         description: Solicitud incorrecta, faltan parámetros o el cuerpo de la solicitud
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/opportunities/:id/check-existing-file', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkCommercialManagerOpportunity)('opportunity'), (0, authorization_middleware_1.checkTechManagerOpportunity)('opportunity'), (0, authorization_middleware_1.authorize)('uploadDocument', 'opportunity'), document_controller_1.documentController.checkExistingFile);
/**
 * @swagger
 * /documents/opportunities/{id}/delete-url:
 *   post:
 *     summary: Genera una URL firmada para eliminar un archivo en el proveedor de almacenamiento.
 *     description: Genera una URL firmada temporal que permite la eliminación de un archivo específico asociado con una oportunidad. Requiere permiso 'deleteDocument opportunity'
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []  # Requiere autenticación
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la oportunidad asociada al archivo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *                 description: Nombre del archivo que se desea eliminar
 *                 example: archivo-ejemplo.pdf
 *     responses:
 *       200:
 *         description: URL firmada para borrar el archivo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: La URL firmada para realizar el borrado del archivo en S3
 *                   example: "https://estimation-app.s3.amazonaws.com/opportunities/12345/archivo-ejemplo.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA...&X-Amz-Expires=60"
 *       400:
 *         description: Solicitud incorrecta, faltan parámetros o el cuerpo de la solicitud
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/opportunities/:id/delete-url', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('deleteDocument', 'opportunity'), document_controller_1.documentController.getDeleteSignedURL);
exports.default = router;
