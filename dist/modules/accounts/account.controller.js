"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountController = void 0;
const account_service_1 = require("./account.service");
const opportunity_service_1 = require("../opportunity/opportunity.service");
const AppError_1 = require("./../../common/utils/AppError");
const authorization_utility_1 = require("./../../common/utils/authorization.utility");
const price_config_service_1 = require("./price-config/price-config.service");
class AccountController {
    async getAccounts(req, res, next) {
        try {
            const offset = typeof req.query.offset === 'string' ? req.query.offset : undefined;
            const limit = typeof req.query.limit === 'string' ? req.query.limit : undefined;
            const accounts = await account_service_1.accountService.getAccounts(req.user, offset, limit);
            res.status(200).json(accounts);
        }
        catch (err) {
            next(err);
        }
    }
    async createAccount(req, res, next) {
        try {
            const data = req.body;
            const account = await account_service_1.accountService.createAccount(req.user, data.email, data.name, data.legalName, data.cif, data.tlf);
            res.status(200).json(account);
        }
        catch (err) {
            next(err);
        }
    }
    async getAccountDetail(req, res, next) {
        try {
            const id = req.params.id;
            const account = await account_service_1.accountService.getAccountDetail(id, req.user);
            res.status(200).json(account);
        }
        catch (err) {
            next(err);
        }
    }
    async getAccountByProposal(req, res, next) {
        try {
            const id = req.params.id;
            const account = await account_service_1.accountService.getAccountByProposal(id, req.user);
            res.status(200).json(account);
        }
        catch (err) {
            next(err);
        }
    }
    async createAccountOpportunity(req, res, next) {
        const data = req.body;
        const accountId = req.params.id;
        try {
            const opportunity = await opportunity_service_1.opportunityService.createOpportunity(accountId, data.name, data.requirements, data.typology);
            res.status(200).json(opportunity);
        }
        catch (err) {
            next(err);
        }
    }
    async getAccountOpportunities(req, res, next) {
        try {
            const id = req.params.id;
            const accountOpportunities = await account_service_1.accountService.getAccountOpportunities(id, req.user);
            res.status(200).json(accountOpportunities);
        }
        catch (err) {
            next(err);
        }
    }
    async updateAccount(req, res, next) {
        try {
            const data = req.body;
            const id = req.params.id;
            // Comprobación de permisos para asignar responsable comercial
            if (data.commercialManager && data.commercialManager !== "") {
                if (!await (0, authorization_utility_1.checkAuthorization)(req.user, 'assignCommercialManager', 'account')) {
                    throw new AppError_1.AppError('No tienes los permisos necesarios para asignar responsable comercial de cuenta', 403);
                }
            }
            // Comprobación de permisos para asignar responsable tecnico
            if (data.technicalManager && data.technicalManager !== "") {
                if (!await (0, authorization_utility_1.checkAuthorization)(req.user, 'assignTechnicalManager', 'account')) {
                    throw new AppError_1.AppError('No tienes los permisos necesarios para asignar responsable técnico de cuenta', 403);
                }
            }
            const account = await account_service_1.accountService.updateAccount(id, data.name, data.email, data.legalName, data.cif, data.tlf);
            res.status(200).json({ message: 'Cuenta actualizada correctamente', account: account });
        }
        catch (err) {
            next(err);
        }
    }
    async getAccountPriceConfig(req, res, next) {
        try {
            const id = req.params.id;
            const priceConfig = await price_config_service_1.priceConfigService.getPriceConfigByAccount(id);
            res.status(200).json(priceConfig);
        }
        catch (err) {
            next(err);
        }
    }
    async assignDefaultPriceConfig(req, res, next) {
        try {
            const id = req.params.id;
            const account = await account_service_1.accountService.assignDefaultPriceConfig(id);
            res.status(200).json(account);
        }
        catch (err) {
            next(err);
        }
    }
    async assignCommercialManager(req, res, next) {
        try {
            const id = req.params.id;
            const commercialManagerId = req.body.commercialManager;
            await account_service_1.accountService.assignCommercialManager(id, commercialManagerId);
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
            await account_service_1.accountService.assignTechnicalManager(id, technicalManagerId);
            res.status(200).json({ message: 'Responsable técnico asignado con éxito' });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.accountController = new AccountController();
