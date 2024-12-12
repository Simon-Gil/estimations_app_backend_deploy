"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proposalController = void 0;
const authorization_utility_1 = require("./../../common/utils/authorization.utility");
const proposal_service_1 = require("./proposal.service");
class ProposalController {
    async getProposals(req, res, next) {
        try {
            let proposals;
            const offset = typeof req.query.offset === 'string' ? req.query.offset : undefined;
            const limit = typeof req.query.limit === 'string' ? req.query.limit : undefined;
            // Obtenemos propuestas en funcion de los permisos del rol asignado al usuario
            if (!await (0, authorization_utility_1.checkAuthorization)(req.user, 'read', 'proposal')) {
                proposals = await proposal_service_1.proposalService.getProposals(req.user, offset, limit);
            }
            else {
                proposals = await proposal_service_1.proposalService.getProposals(undefined, offset, limit);
            }
            // Filtramos campos sensibles de propuesta en funcion de los permisos
            const filteredProposals = await proposal_service_1.proposalService.filterSpecialFields(req.user, proposals);
            res.status(200).json(filteredProposals);
        }
        catch (err) {
            next(err);
        }
    }
    async finishProposal(req, res, next) {
        try {
            const id = req.params.id;
            const proposal = await proposal_service_1.proposalService.finishProposal(id);
            res.status(200).json(proposal);
        }
        catch (err) {
            next(err);
        }
    }
    async updateProposal(req, res, next) {
        try {
            const id = req.params.id;
            const techProposal = req.body.techProposal;
            const goalAndContext = req.body.goalAndContext;
            const updatedProposal = await proposal_service_1.proposalService.updateProposal(id, techProposal, goalAndContext);
            res.status(200).json(updatedProposal);
        }
        catch (err) {
            next(err);
        }
    }
    async getById(req, res, next) {
        try {
            const proposalId = req.params.id;
            const proposal = await proposal_service_1.proposalService.relatedUserGetById(proposalId, req.user);
            // Filtramos campos sensibles de propuesta en funcion de los permisos
            const filteredProposal = await proposal_service_1.proposalService.filterSpecialFields(req.user, proposal);
            res.status(200).json(filteredProposal);
        }
        catch (err) {
            next(err);
        }
    }
    async updateSpecialFields(req, res, next) {
        try {
            const id = req.params.id;
            const total = req.body.total;
            const estimatedMonths = req.body.estimatedMonths;
            const updatedProposal = await proposal_service_1.proposalService.updateSpecialFields(id, total, estimatedMonths);
            res.status(200).json(updatedProposal);
        }
        catch (err) {
            next(err);
        }
    }
    async getClientFunctionalPDF(req, res, next) {
        try {
            const id = req.params.id;
            const pdf = await proposal_service_1.proposalService.getClientFunctionalPDF(id);
            const proposal = await proposal_service_1.proposalService.getById(id);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${proposal.name}.pdf"`);
            res.status(200).send(Buffer.from(pdf));
        }
        catch (err) {
            next(err);
        }
    }
    async getClientFunctionalDOC(req, res, next) {
        try {
            const id = req.params.id;
            const docxContent = await proposal_service_1.proposalService.getClientFunctionalDOC(id); // Obtén el contenido DOCX
            const proposal = await proposal_service_1.proposalService.getById(id);
            // Configurar cabeceras para la respuesta del archivo DOCX
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', `attachment; filename="${proposal.name}.docx"`);
            // Verifica si docxContent es un Blob o Buffer y envíalo
            if (Buffer.isBuffer(docxContent)) {
                res.status(200).send(docxContent);
            }
            else if (docxContent instanceof Blob) {
                const buffer = Buffer.from(await docxContent.arrayBuffer()); // Convierte el Blob a Buffer
                res.status(200).send(buffer);
            }
            else {
                res.status(500).send({ error: 'No se generó el documento correctamente' });
            }
        }
        catch (err) {
            next(err);
        }
    }
    async deleteProposal(req, res, next) {
        try {
            const id = req.params.id;
            const deleteResult = await proposal_service_1.proposalService.deleteProposal(id);
            res.status(200).json(deleteResult);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.proposalController = new ProposalController();
