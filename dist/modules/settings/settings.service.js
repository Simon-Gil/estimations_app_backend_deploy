"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsService = exports.SettingsService = void 0;
const class_transformer_1 = require("class-transformer");
const price_config_dto_1 = require("../accounts/price-config/price-config.dto");
const AppError_1 = require("../../common/utils/AppError");
const settings_repository_1 = require("./../settings/settings.repository");
const validator_utility_1 = require("../../common/utils/validator.utility");
const price_config_service_1 = require("../accounts/price-config/price-config.service");
/**
 * Servicio encargado de gestionar la configuración de la aplicación.
 */
class SettingsService {
    /**
   * Obtiene los ajustes de la aplicación con el tag 'main_settings'.
   * @returns La configuración principal de la aplicación.
   * @throws {AppError} Si no se encuentran los ajustes de la aplicación.
   */
    async getSettings() {
        const settings = await settings_repository_1.settingsRepo.findOne({ where: { tag: 'main_settings' } });
        if (settings) {
            return settings;
        }
        else
            throw new AppError_1.AppError('No se ha podido acceder a los ajustes de la aplicación', 404);
    }
    /**
     * Obtiene la configuración de precios por defecto.
     * @returns La configuración de precios por defecto en formato DTO.
     */
    async getDefaultPriceConfig() {
        const defaultPriceConfig = await price_config_service_1.priceConfigService.getDefaultPriceConfig();
        return (0, class_transformer_1.plainToInstance)(price_config_dto_1.PriceConfigDTO, defaultPriceConfig);
    }
    /**
     * Actualiza la configuración de los correos electrónicos enviados por la aplicación.
     * @param userFinished - Determina si se debe enviar un correo cuando un usuario termine con su estimación.
     * @param estimationDone - Determina si se debe enviar un correo cuando se haya finalizado una estimación.
     * @param userAssigned - Determina si se debe enviar un correo cuando un usuario sea asignado a una estimación.
     * @returns La configuración de la aplicación actualizada.
     */
    async updateEmailConfig(userFinished, estimationDone, userAssigned) {
        const settings = await this.getSettings();
        settings.sendUserFinishedEmail = userFinished;
        settings.sendDoneEstimationEmail = estimationDone;
        settings.sendAssignedUserEmail = userAssigned;
        const updatedSettings = await settings_repository_1.settingsRepo.save(settings);
        return updatedSettings;
    }
    /**
     * Actualiza la configuración de seguridad.
     * @param maxLoginAttempts - Número máximo de intentos de inicio de sesión permitidos.
     * @param blockDurationMinutes - Duración en minutos del bloqueo tras alcanzar el número máximo de intentos fallidos.
     * @param expirationAuthTokenHours - Duración en horas de la validez del token de autenticación.
     * @param expirationResetTokenHours - Duración en horas de la validez del token de restablecimiento de contraseña.
     * @returns La configuración de seguridad actualizada.
     * @throws {AppError} Si los datos introducidos no son números enteros positivos.
     */
    async updateSecurityConfig(maxLoginAttempts, blockDurationMinutes, expirationAuthTokenHours, expirationResetTokenHours) {
        // Validamos los datos recibidos
        const receivedFields = [maxLoginAttempts, blockDurationMinutes, expirationAuthTokenHours, expirationResetTokenHours];
        receivedFields.forEach(field => {
            const isValid = validator_utility_1.Validator.isIntegerAndPositive(field);
            if (!isValid) {
                throw new AppError_1.AppError('Los datos introducidos han de ser números enteros positivos', 400);
            }
        });
        const settings = await this.getSettings();
        settings.maxLoginAttempts = maxLoginAttempts;
        settings.blockDurationMinutes = blockDurationMinutes;
        settings.expirationAuthTokenHours = expirationAuthTokenHours;
        settings.expirationResetTokenHours = expirationResetTokenHours;
        const updatedSettings = await settings_repository_1.settingsRepo.save(settings);
        return updatedSettings;
    }
    // CONFIGURACIÓN GENERAL
    /**
     * Actualiza la configuración del número de días de validez de una propuesta tras su finalización.
     * @param expirationProposalDays - Número de días de validez de la propuesta.
     * @returns La configuración actualizada de la aplicación.
     */
    async updateExpirationProposalDays(expirationProposalDays) {
        const settings = await this.getSettings();
        settings.expirationProposalDays = expirationProposalDays;
        const updatedSettings = await settings_repository_1.settingsRepo.save(settings);
        return updatedSettings;
    }
    /**
     * Actualiza la configuración de precios por defecto con los precios de perfil proporcionados.
     * @param profilePrices - Lista de precios de perfil a actualizar.
     * @param user - Usuario que realiza la actualización.
     * @returns La configuración de precios actualizada en formato DTO.
     */
    async updateDefaultPriceConfig(profilePrices, user) {
        const defaultPriceConfig = await price_config_service_1.priceConfigService.getDefaultPriceConfig();
        const updatedPriceConfig = price_config_service_1.priceConfigService.updatePriceConfig(defaultPriceConfig.id, profilePrices, user);
        return updatedPriceConfig;
    }
}
exports.SettingsService = SettingsService;
exports.settingsService = new SettingsService();
