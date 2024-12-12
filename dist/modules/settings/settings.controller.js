"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsController = void 0;
const settings_service_1 = require("./settings.service");
const AppError_1 = require("./../../common/utils/AppError");
class SettingsController {
    async getSettings(req, res, next) {
        try {
            const settings = await settings_service_1.settingsService.getSettings();
            res.status(200).json(settings);
        }
        catch (err) {
            next(err);
        }
    }
    async getDefaultPriceConfig(req, res, next) {
        try {
            const defaultPriceConfig = await settings_service_1.settingsService.getDefaultPriceConfig();
            res.status(200).json(defaultPriceConfig);
        }
        catch (err) {
            next(err);
        }
    }
    async updateEmailConfig(req, res, next) {
        try {
            const data = req.body;
            const updatedConfig = await settings_service_1.settingsService.updateEmailConfig(data.sendUserFinishedEmail, data.sendDoneEstimationEmail, data.sendAssignedUserEmail);
            res.status(200).json(updatedConfig);
        }
        catch (err) {
            next(err);
        }
    }
    async updateSecurityConfig(req, res, next) {
        try {
            const data = req.body;
            const updatedConfig = await settings_service_1.settingsService.updateSecurityConfig(data.maxLoginAttempts, data.blockDurationMinutes, data.expirationAuthTokenHours, data.expirationResetTokenHours);
            res.status(200).json(updatedConfig);
        }
        catch (err) {
            next(err);
        }
    }
    async updateExpirationProposalDays(req, res, next) {
        try {
            const expirationDays = req.body.expirationProposalDays;
            const updatedConfig = await settings_service_1.settingsService.updateExpirationProposalDays(expirationDays);
            res.status(200).json(updatedConfig);
        }
        catch (err) {
            next(err);
        }
    }
    async updateDefaultPriceConfig(req, res, next) {
        try {
            const profilePrices = req.body.profilePrices;
            if (!profilePrices || profilePrices.length < 1) {
                throw new AppError_1.AppError('No se han recibido los precios por perfil', 400);
            }
            const priceConfig = await settings_service_1.settingsService.updateDefaultPriceConfig(profilePrices, req.user);
            res.status(200).json(priceConfig);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.settingsController = new SettingsController();
