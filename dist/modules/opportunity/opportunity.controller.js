"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.opportunityController = void 0;
const opportunity_service_1 = require("./opportunity.service");
const proposal_service_1 = require("./../proposal/proposal.service");
class OpportunityController {
    async updateOpportunity(req, res, next) {
        try {
            const id = req.params.id;
            const data = req.body;
            const updatedOpportunity = await opportunity_service_1.opportunityService.updateOpportunity(id, data.name, data.requirements);
            res.status(200).json({ message: 'Oportunidad actualizada correctamente', opportunity: updatedOpportunity });
        }
        catch (err) {
            next(err);
        }
    }
    async createOpportunityProposal(req, res, next) {
        try {
            const opportunityId = req.params.id;
            const techProposal = req.body.techProposal;
            const goalAndContext = req.body.goalAndContext;
            const proposal = await proposal_service_1.proposalService.createProposal(opportunityId, goalAndContext, techProposal);
            res.status(200).json(proposal);
        }
        catch (err) {
            next(err);
        }
    }
    async getOpportunityEstimations(req, res, next) {
        try {
            const id = req.params.id;
            const estimations = await opportunity_service_1.opportunityService.getOpportunityEstimations(id);
            res.status(200).json(estimations);
        }
        catch (err) {
            next(err);
        }
    }
    async getOpportunityProposals(req, res, next) {
        try {
            const id = req.params.id;
            const proposals = await opportunity_service_1.opportunityService.getOpportunityProposals(id);
            const filteredProposals = await proposal_service_1.proposalService.filterSpecialFields(req.user, proposals);
            res.status(200).json(filteredProposals);
        }
        catch (err) {
            next(err);
        }
    }
    async updateOpportunityStatus(req, res, next) {
        try {
            const status = req.body.status;
            const id = req.params.id;
            const opportunityUpdated = await opportunity_service_1.opportunityService.updateStatus(id, status, req.user);
            res.status(200).json(opportunityUpdated);
        }
        catch (err) {
            next(err);
        }
    }
    async getOpportunities(req, res, next) {
        try {
            const offset = typeof req.query.offset === 'string' ? req.query.offset : undefined;
            const limit = typeof req.query.limit === 'string' ? req.query.limit : undefined;
            const opportunities = await opportunity_service_1.opportunityService.getOpportunities(req.user, offset, limit);
            res.status(200).json(opportunities);
        }
        catch (err) {
            next(err);
        }
    }
    async deleteOpportunity(req, res, next) {
        try {
            const id = req.params.id;
            const deleteResult = await opportunity_service_1.opportunityService.deleteOpportunity(id);
            res.status(200).json(deleteResult);
        }
        catch (err) {
            next(err);
        }
    }
    async assignCommercialManager(req, res, next) {
        try {
            const id = req.params.id;
            const commercialManagerId = req.body.commercialManager;
            await opportunity_service_1.opportunityService.assignCommercialManager(id, commercialManagerId);
            res.status(200).json({ message: 'Responsable comercial asignado con éxito' });
        }
        catch (err) {
            next(err);
        }
    }
    async assignTechnicalManager(req, res, next) {
        try {
            const id = req.params.id;
            const technicalManagerId = req.body.technicalManager;
            await opportunity_service_1.opportunityService.assignTechnicalManager(id, technicalManagerId);
            res.status(200).json({ message: 'Responsable técnico asignado con éxito' });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.opportunityController = new OpportunityController();
