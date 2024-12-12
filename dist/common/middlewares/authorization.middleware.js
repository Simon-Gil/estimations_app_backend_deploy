"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCommercialOrTechManagerAccount = exports.checkCommercialManagerOpportunity = exports.checkTechManagerOpportunity = exports.checkTechnicalManagerAccount = exports.checkCommercialManagerAccount = exports.authorize = void 0;
const ability_1 = require("@casl/ability");
const abilities_1 = require("./../../config/abilities");
const estimation_service_1 = require("./../../modules/estimations/estimation.service");
const AppError_1 = require("./../utils/AppError");
const opportunity_service_1 = require("./../../modules/opportunity/opportunity.service");
const task_service_1 = require("../../modules/estimations/task/task.service");
const account_service_1 = require("./../../modules/accounts/account.service");
const proposal_service_1 = require("./../../modules/proposal/proposal.service");
/**
 * Middleware de autorización que verifica si el usuario tiene permisos para realizar una acción.
 * Autoriza en caso de recibir autorización del middleware anterior
 * @param action - La acción que el usuario intenta realizar.
 * @param subject - El recurso o entidad sobre el que se realiza la acción.
 * @returns Un middleware que verifica si el usuario tiene permiso para la acción especificada.
 */
const authorize = (action, subject) => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }
            // Si ya está autorizado, pasar al siguiente middleware
            if (req.isAuthorized) {
                return next();
            }
            const ability = await (0, abilities_1.defineAbilitiesFor)(req.user);
            ability_1.ForbiddenError.from(ability).throwUnlessCan(action, subject);
            next();
        }
        catch (error) {
            if (error instanceof ability_1.ForbiddenError) {
                res.status(403).json({ message: 'No tienes los permisos necesarios para realizar esta acción' });
                return;
            }
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    };
};
exports.authorize = authorize;
/**
 * Middleware que verifica si un usuario es el responsable comercial de una oportunidad.
 *
 * @param entity - Entidad del ID recibido en la ruta ('opportunity' o 'account').
 * @returns Un middleware que autoriza al usuario si es responsable comercial de la oportunidad especificada.
 */
const checkCommercialManagerAccount = (entity) => {
    return async (req, res, next) => {
        try {
            let account;
            switch (entity) {
                case 'opportunity':
                    const opportunityId = req.params.opportunityId ? req.params.opportunityId : req.params.id;
                    account = (await opportunity_service_1.opportunityService.getById(opportunityId, ['account.commercialManager'])).account;
                    break;
                case 'account':
                    const accountId = req.params.accountId ? req.params.accountId : req.params.id;
                    account = (await account_service_1.accountService.getAccountById(accountId, ['commercialManager']));
                    break;
                default:
                    throw new Error('El valor introducido como parámetro es incorrecto');
            }
            // Si el usuario es el responsable comercial, permitir el paso al siguiente middleware
            if (account.commercialManager.id === req.user.id) {
                req.isAuthorized = true;
                return next(); // Usuario autorizado
            }
            return next();
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                res.status(403).json({ message: error.message });
                return;
            }
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
            return;
        }
    };
};
exports.checkCommercialManagerAccount = checkCommercialManagerAccount;
/**
 * Middleware que verifica si un usuario es el responsable técnico de una cuenta.
 *
 * @param entity - Entidad del ID recibido en la ruta ('opportunity' o 'account').
 * @returns Un middleware autoriza al usuario si es responsable técnico de la cuenta especificada.
 */
const checkTechnicalManagerAccount = (entity) => {
    return async (req, res, next) => {
        try {
            let account;
            switch (entity) {
                case 'opportunity':
                    const opportunityId = req.params.opportunityId ? req.params.opportunityId : req.params.id;
                    account = (await opportunity_service_1.opportunityService.getById(opportunityId, ['account.technicalManager'])).account;
                    break;
                case 'account':
                    const accountId = req.params.accountId ? req.params.accountId : req.params.id;
                    account = (await account_service_1.accountService.getAccountById(accountId, ['technicalManager']));
                    break;
                default:
                    throw new Error('El valor introducido como parámetro es incorrecto');
            }
            // Si el usuario es el responsable comercial, permitir el paso al siguiente middleware
            if (account.technicalManager?.id === req.user.id) {
                req.isAuthorized = true;
                return next(); // Usuario autorizado
            }
            return next();
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                res.status(403).json({ message: error.message });
                return;
            }
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
            return;
        }
    };
};
exports.checkTechnicalManagerAccount = checkTechnicalManagerAccount;
/**
 * Middleware que verifica si un usuario es el responsable técnico de una entidad (tarea, estimación, propuesta u oportunidad).
 *
 * @param entity Entidad del ID recibido en la ruta ('task', 'estimation', 'proposal' u 'opportunity).
 * @returns Un middleware que permite el paso si el usuario es el responsable técnico de la entidad especificada.
 */
const checkTechManagerOpportunity = (entity) => {
    return async (req, res, next) => {
        try {
            let opportunity;
            switch (entity) {
                case 'task':
                    const taskId = req.params.taskId ? req.params.taskId : req.params.id;
                    opportunity = (await task_service_1.taskService.getById(taskId, ['estimation.proposal.opportunity.technicalManager'])).estimation.proposal.opportunity;
                    break;
                case 'estimation':
                    const estimationId = req.params.estimationId ? req.params.estimationId : req.params.id;
                    opportunity = (await estimation_service_1.estimationService.getById(estimationId, ['proposal.opportunity.technicalManager'])).proposal.opportunity;
                    break;
                case 'proposal':
                    const proposalId = req.params.proposalId ? req.params.proposalId : req.params.id;
                    opportunity = (await proposal_service_1.proposalService.getById(proposalId, ['opportunity.technicalManager'])).opportunity;
                    break;
                case 'opportunity':
                    const opportunityId = req.params.opportunityId ? req.params.opportunityId : req.params.id;
                    opportunity = await opportunity_service_1.opportunityService.getById(opportunityId, ['technicalManager']);
                    break;
                default:
                    throw new Error('El valor introducido como parámetro es incorrecto');
            }
            // Si el usuario es el responsable tecnico, permitir el paso al siguiente middleware
            if (opportunity.technicalManager?.id === req.user.id) {
                req.isAuthorized = true;
                return next();
            }
            return next();
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                res.status(403).json({ message: error.message });
                return;
            }
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
            return;
        }
    };
};
exports.checkTechManagerOpportunity = checkTechManagerOpportunity;
/**
 * Middleware que verifica si un usuario es el responsable comercial de una entidad (tarea, estimación, propuesta u oportunidad).
 *
 * @param entity - Entidad del ID recibido en la ruta ('task', 'estimation', 'proposal' u 'opportunity).
 * @returns Un middleware que al usuario si es el responsable comercial de la entidad especificada.
 */
const checkCommercialManagerOpportunity = (entity) => {
    return async (req, res, next) => {
        try {
            let opportunity;
            switch (entity) {
                case 'task':
                    const taskId = req.params.taskId ? req.params.taskId : req.params.id;
                    opportunity = (await task_service_1.taskService.getById(taskId, ['estimation.proposal.opportunity.commercialManager'])).estimation.proposal.opportunity;
                    break;
                case 'estimation':
                    const estimationId = req.params.estimationId ? req.params.estimationId : req.params.id;
                    opportunity = (await estimation_service_1.estimationService.getById(estimationId, ['proposal.opportunity.commercialManager'])).proposal.opportunity;
                    break;
                case 'proposal':
                    const proposalId = req.params.proposalId ? req.params.proposalId : req.params.id;
                    opportunity = (await proposal_service_1.proposalService.getById(proposalId, ['opportunity.commercialManager'])).opportunity;
                    break;
                case 'opportunity':
                    const opportunityId = req.params.opportunityId ? req.params.opportunityId : req.params.id;
                    opportunity = await opportunity_service_1.opportunityService.getById(opportunityId, ['commercialManager']);
                    break;
                default:
                    throw new Error('El valor introducido como parámetro es incorrecto');
            }
            // Si el usuario es el responsable comercial, permitir el paso al siguiente middleware
            if (opportunity.commercialManager.id === req.user.id) {
                req.isAuthorized = true;
                return next(); // Usuario autorizado
            }
            return next();
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                res.status(403).json({ message: error.message });
                return;
            }
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
            return;
        }
    };
};
exports.checkCommercialManagerOpportunity = checkCommercialManagerOpportunity;
/**
 * Middleware que verifica si un usuario es el responsable técnico o comercial de una cuenta.
 *
 * @returns Un middleware que autoriza al usuario si es responsable técnico o comercial de la cuenta especificada.
 */
const checkCommercialOrTechManagerAccount = () => {
    return async (req, res, next) => {
        try {
            const account = await account_service_1.accountService.getAccountById(req.params.id, ['commercialManager', 'technicalManager']);
            // Si el usuario es el responsable técnico, permitir el paso al siguiente middleware
            if (account.commercialManager.id === req.user.id || account.technicalManager === req.user.id) {
                req.isAuthorized = true;
                return next(); // Usuario autorizado
            }
            return next();
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                res.status(403).json({ message: error.message });
                return;
            }
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error });
            return;
        }
    };
};
exports.checkCommercialOrTechManagerAccount = checkCommercialOrTechManagerAccount;
