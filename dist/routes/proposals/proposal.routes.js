"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("./../../common/middlewares/auth.middleware");
const authorization_middleware_1 = require("./../../common/middlewares/authorization.middleware");
const proposal_controller_1 = require("./../../modules/proposal/proposal.controller");
const account_controller_1 = require("./../../modules/accounts/account.controller");
const router = (0, express_1.default)();
/**
 * @swagger
 * /proposals/{id}:
 *   patch:
 *     tags:
 *       - Proposals
 *     summary: Actualiza datos básicos de  propuesta
 *     description: Actualiza los campos techProposal y goalAndContext de la propuesta especificada. Requiere permiso 'update proposal', en su defecto que el usuario sea responsable comercial de la oportunidad asociada.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la propuesta
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Objeto JSON contiendo los campos a actualizar
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               techProposal:
 *                 type: string
 *                 description: Descripción de la propuesta tecnológica
 *               goalAndContext:
 *                 type: string
 *                 description: Contexto y objetivos de la propuesta
 *     responses:
 *       '200':
 *         description: Propuesta actualizada con éxito
 *       '400':
 *         description: Petición no válida
 *       '404':
 *         description: Propuesta no encontrada
 *       '403':
 *         description: No autorizado
 *       '401':
 *         description: No autenticado
 */
router.patch('/:id', auth_middleware_1.authenticate, (0, authorization_middleware_1.checkCommercialManagerOpportunity)('proposal'), (0, authorization_middleware_1.authorize)('update', 'proposal'), proposal_controller_1.proposalController.updateProposal);
/**
 * @swagger
 * /proposals/{id}:
 *   delete:
 *     tags:
 *       - Proposals
 *     summary: Elimina una propuesta
 *     description: Elimina la propuesta con el ID especificado. Requiere permiso 'delete proposal'.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la propuesta
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '200':
 *         description: Propuesta eliminada con éxito
 *       '400':
 *         description: Petición no válida
 *       '401':
 *         description: No autenticado
 *       '403':
 *         description: No autorizado
 *       '404':
 *         description: Propuesta no encontrada
 *       '500':
 *         description: Error interno del servidor
 */
router.delete('/:id', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('delete', 'proposal'), proposal_controller_1.proposalController.deleteProposal);
/**
 * @swagger
 * /proposals:
 *   get:
 *     tags:
 *       - Proposals
 *     summary: Obtiene la lista de propuestas
 *     description: Obtiene una lista con todas las propuestas accesibles por el usuario. Requiere permiso 'readSelf proposals'.
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
 *         description: La lista de propuestas devuelta con éxito
 *       '403':
 *         description: No autorizado
 *       '401':
 *         description: No autenticado
 */
router.get('/', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'proposal'), proposal_controller_1.proposalController.getProposals);
/**
 * @swagger
 * /proposals/{id}/account:
 *   get:
 *     tags:
 *       - Proposals
 *     summary: Obtiene la cuenta relacionada con la propuesta
 *     description: Obtiene la cuenta asociada a la propuesta especificada. Requiere permiso 'readSelf account'.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID de la propuesta a
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Cuenta devuelta con éxito
 *       '403':
 *         description: No autorizado
 *       '404':
 *         description: Propuesta o cuenta no encontradadas
 *       '401':
 *         description: No autenticado
 */
router.get('/:id/account', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'account'), account_controller_1.accountController.getAccountByProposal);
/**
 * @swagger
 * /proposals/{id}/special-fields:
 *   patch:
 *     tags:
 *       - Proposals
 *     summary: Actualiza campos sensibles de propuesta
 *     description: Actualiza el monto total o el número de meses estimados para una propuesta. Requiere permiso 'updateSpecialFields proposal'.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la propueta
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total:
 *                 type: number
 *                 description: Monto total
 *               estimatedMonths:
 *                 type: number
 *                 description: Meses de duración del proyecto
 *             example:
 *               total: 50000
 *               estimatedMonths: 12
 *     responses:
 *       '200':
 *         description: Actualización realizada con éxito
 *       '400':
 *         description: Petición no válida
 *       '403':
 *         description: No autorizado
 *       '404':
 *         description: Propuesta no encontrada
 *       '401':
 *         description: No autenticado
 */
router.patch('/:id/special-fields', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('updateSpecialFields', 'proposal'), proposal_controller_1.proposalController.updateSpecialFields);
/**
 * @swagger
 * /proposals/{id}/functional/pdf:
 *   get:
 *     summary: Obtener funcional en formato PDF para una propuesta.
 *     description: Genera un PDF funcional con los datos de una propuesta y lo devuelve como descarga. Requiere permiso 'readSpecialFields proposal'.
 *     tags:
 *       - Proposals
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la propuesta para la cual se genera el PDF
 *         schema:
 *           type: string
 *           example: "e7d7f7d7-d7e7-4c4f-b5a6-cf9f4b3f5b4b"
 *     responses:
 *       200:
 *         description: PDF generado con éxito, listo para descarga
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *               description: El archivo PDF generado.
 *       500:
 *         description: Error interno del servidor al generar el PDF
 *       404:
 *         description: Propuesta no encontrada
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 */
router.get('/:id/functional/pdf', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSpecialFields', 'proposal'), proposal_controller_1.proposalController.getClientFunctionalPDF);
/**
 * @swagger
 * /proposals/{id}/functional/doc:
 *   get:
 *     summary: Obtener funcional en formato DOCX para una propuesta.
 *     description: Genera un documento DOCX funcional con los datos de una propuesta y lo devuelve como descarga.
 *     tags:
 *       - Proposals
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la propuesta para la cual se genera el documento DOCX
 *         schema:
 *           type: string
 *           example: "e7d7f7d7-d7e7-4c4f-b5a6-cf9f4b3f5b4b"
 *     responses:
 *       200:
 *         description: Documento DOCX generado con éxito, listo para descarga
 *         content:
 *           application/vnd.openxmlformats-officedocument.wordprocessingml.document:
 *             schema:
 *               type: string
 *               format: binary
 *               description: El archivo DOCX generado.
 *       500:
 *         description: Error interno del servidor al generar el documento DOCX
 *       404:
 *         description: Propuesta no encontrada
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 */
router.get('/:id/functional/doc', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSpecialFields', 'proposal'), proposal_controller_1.proposalController.getClientFunctionalDOC);
/**
 * @swagger
 * /proposals/{id}:
 *   get:
 *     summary: Obtener detalles de una propuesta
 *     description: Devuelve los detalles de una propuesta específica basado en su ID. Requiere permiso 'readSelf proposal'. Si el usuario tiene permiso 'readSpecialFields proposal' devuelve también los campos sensibles de la propuesta.
 *     tags:
 *       - Proposals
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la propuesta que se desea consultar
 *         schema:
 *           type: string
 *           example: "e7d7f7d7-d7e7-4c4f-b5a6-cf9f4b3f5b4b"
 *     responses:
 *       200:
 *         description: Detalles de la propuesta obtenidos con éxito
 *       404:
 *         description: Propuesta no encontrada, ID no válido
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor al obtener la propuesta
 */
router.get('/:id', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('readSelf', 'proposal'), proposal_controller_1.proposalController.getById);
/**
 * @swagger
 * /proposals/{id}/finish:
 *   patch:
 *     summary: Finaliza la propuesta
 *     description: Permite marcar una propuesta como finalizada, siempre que cumpla con los requisitos para este estado (valores asignados en total y estimatedMonths). Requiere permiso 'updateSpecialFields proposal'.
 *     tags:
 *       - Proposals
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la propuesta que se desea finalizar
 *         schema:
 *           type: string
 *           example: "e7d7f7d7-d7e7-4c4f-b5a6-cf9f4b3f5b4b"
 *     responses:
 *       200:
 *         description: Propuesta finalizada con éxito
 *       400:
 *         description: Solicitud inválida. La propuesta no está lista para finalizar.
 *       404:
 *         description: Propuesta no encontrada
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/:id/finish', auth_middleware_1.authenticate, (0, authorization_middleware_1.authorize)('updateSpecialFields', 'proposal'), proposal_controller_1.proposalController.finishProposal);
exports.default = router;
