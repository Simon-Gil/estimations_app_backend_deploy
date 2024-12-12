"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceConfigService = exports.PriceConfigService = void 0;
const class_transformer_1 = require("class-transformer");
const price_config_dto_1 = require("./price-config.dto");
const price_config_entity_1 = require("./price-config.entity");
const AppError_1 = require("../../../common/utils/AppError");
const price_config_repository_1 = require("./price-config.repository");
const profile_service_1 = require("../../company-structure/profile/profile.service");
const account_service_1 = require("./../../accounts/account.service");
const profile_price_repository_1 = require("./price-profile/profile-price.repository");
const profile_price_service_1 = require("./price-profile/profile-price.service");
const authorization_utility_1 = require("../../../common/utils/authorization.utility");
const validator_utility_1 = require("../../../common/utils/validator.utility");
/**
 * Servicio para gestionar configuraciones de precios en la aplicación.
 */
class PriceConfigService {
    /**
     * Obtiene la configuración de precios por defecto.
     * @returns La configuración de precios por defecto con los precios por perfil asociados.
     * @throws AppError - Si no se encuentra una configuración de precios por defecto.
     */
    async getDefaultPriceConfig() {
        const defaultPriceConfig = await price_config_repository_1.priceConfigRepo.findOne({
            where: { isDefault: true },
            relations: ['profilePrices.profile']
        });
        if (!defaultPriceConfig) {
            throw new AppError_1.AppError('No se ha encontrado la configuración de precios por defecto', 404);
        }
        return defaultPriceConfig;
    }
    /**
     * Obtiene una configuración de precios por su ID.
     * @param id - El ID de la configuración de precios.
     * @param relations - Relaciones adicionales para cargar junto con la configuración.
     * @returns La configuración de precios con las relaciones solicitadas.
     * @throws AppError - Si la configuración de precios no se encuentra.
     */
    async getById(id, relations) {
        try {
            const priceConfig = await price_config_repository_1.priceConfigRepo.findOne({
                where: { id: id },
                relations: relations
            });
            if (!priceConfig) {
                throw new AppError_1.AppError('La configuración de precios no ha sido encontrada', 404);
            }
            return priceConfig;
        }
        catch (err) {
            throw new AppError_1.AppError('Error al obtener la configuración de precios', 500);
        }
    }
    /**
     * Crea una nueva configuración de precios asociada a una cuenta.
     * @param accountId - El ID de la cuenta a la que se asignará la configuración.
     * @param profilePrices - Los precios por perfil a asociar.
     * @returns La nueva configuración de precios creada.
     * @throws AppError - Si la cuenta asociada no es cliente, o si ocurren errores al validar precios, encontrar perfiles, o guardar la configuración.
     */
    async createPriceConfig(accountId, profilePrices) {
        const account = await account_service_1.accountService.getAccountById(accountId, ['priceConfig']);
        // Comprobamos que isCustomer sea true en Account
        if (!account.isCustomer) {
            throw new AppError_1.AppError('Las configuraciones de precio personalizadas solo son aplicables a cuentas cliente', 400);
        }
        // Comprobamos que la configuración de precio actual sea default, de lo contrario se debe actualizar la personalizada actual
        if (!account.priceConfig.isDefault) {
            throw new AppError_1.AppError('La cuenta recibida ya está asociada a una configuración de precio personalizada. Para modificarla actualice la existente en lugar de crear una nueva', 400);
        }
        // Comprobamos que se hayan introducido precios para todos los perfiles y que estos sean válidos
        const profiles = await profile_service_1.profileService.getAllProfiles();
        const profilePriceIds = profilePrices.map(p => p.profile);
        const uniqueIds = new Set(profilePriceIds);
        if (profiles.length !== uniqueIds.size) {
            throw new AppError_1.AppError('Deben introducirse precios/hora para todos los perfiles estimables', 409);
        }
        profilePrices.forEach(p => {
            if (!validator_utility_1.Validator.IsValidPrice(p.priceH)) {
                throw new AppError_1.AppError('Los precios introducidos deben ser números positivos', 400);
            }
        });
        // Crear la nueva entidad de configuración de precios
        const priceConfig = new price_config_entity_1.PriceConfigEntity();
        // Guardar la nueva configuración de precios 
        const savedPriceConfig = await price_config_repository_1.priceConfigRepo.save(priceConfig);
        // Guardar precios perfil asociados a priceConfig
        const savedProfilePrices = await Promise.all(profilePrices.map(async (p) => {
            return await profile_price_service_1.profilePriceService.createProfilePrice(savedPriceConfig.id, p.profile, p.priceH);
        }));
        // Obtener y encriptar la configuracion de precios con precios prefil
        const configWithProfilePrices = await price_config_repository_1.priceConfigRepo.findOne({ where: { id: savedPriceConfig.id }, relations: ['profilePrices'] });
        if (!configWithProfilePrices) {
            throw new AppError_1.AppError('Error al guardar la configuración de precios', 500);
        }
        configWithProfilePrices.profilePrices = savedProfilePrices;
        // Guardamos la cuenta
        await account_service_1.accountService.assignPriceConfigToAccount(account, configWithProfilePrices);
        return (0, class_transformer_1.plainToInstance)(price_config_dto_1.PriceConfigDTO, configWithProfilePrices);
    }
    /**
     * Actualiza una configuración de precios existente.
     * @param priceConfigId - El ID de la configuración de precios a actualizar.
     * @param profilePrices - Los nuevos precios por perfil.
     * @param user - El usuario que realiza la actualización.
     * @returns La configuración de precios actualizada.
     * @throws AppError - Si los precios son inválidos o si no se tiene permiso para actualizar.
     */
    async updatePriceConfig(priceConfigId, profilePrices, user) {
        // Comprobamos que los precios introducidos sean válidos
        profilePrices.forEach(p => {
            if (!validator_utility_1.Validator.IsValidPrice(p.priceH)) {
                throw new AppError_1.AppError('Los precios introducidos deben ser números positivos', 400);
            }
        });
        // Obtener la configuración de precios existente
        const priceConfig = await this.getById(priceConfigId);
        // Verificar si la configuración de precios fue encontrada
        if (!priceConfig) {
            throw new AppError_1.AppError('La configuración de precios no ha sido encontrada', 404);
        }
        // Si la configuración de precios es default, comprobar permisos de usuario
        if (priceConfig.isDefault && !(await (0, authorization_utility_1.checkAuthorization)(user, 'updateDefaultPriceConfig', 'settings'))) {
            throw new AppError_1.AppError('No tienes los permisos necesarios para realizar esta acción', 403);
        }
        // Actualizar los precios de perfil asociados a la configuración de precios
        const actualProfilePrices = await profile_price_service_1.profilePriceService.getByPriceConfig(priceConfig);
        await Promise.all(profilePrices.map(async (p) => {
            // Primero, buscamos si ya existe un precio perfil para el perfil dado
            const existingProfilePrice = actualProfilePrices.find(pp => pp.profileId === p.profile);
            if (existingProfilePrice) {
                // Si existe, actualizamos su precio
                existingProfilePrice.priceH = p.priceH;
                return await profile_price_repository_1.profilePriceRepo.save(existingProfilePrice);
            }
            else {
                // Si no existe, creamos un nuevo precio perfil
                return await profile_price_service_1.profilePriceService.createProfilePrice(priceConfigId, p.profile, p.priceH);
            }
        }));
        priceConfig.profilePrices = await profile_price_service_1.profilePriceService.getByPriceConfig(priceConfig);
        // Convertir a DTO y devolver
        return (0, class_transformer_1.plainToInstance)(price_config_dto_1.PriceConfigDTO, priceConfig);
    }
    /**
     * Obtiene la configuración de precios asociada a una cuenta.
     * @param accountId - El ID de la cuenta.
     * @returns La configuración de precios asociada a la cuenta.
     */
    async getPriceConfigByAccount(accountId) {
        const account = await account_service_1.accountService.getAccountById(accountId, ['priceConfig']);
        const priceConfig = account.priceConfig;
        priceConfig.profilePrices = await profile_price_service_1.profilePriceService.getByPriceConfig(priceConfig);
        return (0, class_transformer_1.plainToInstance)(price_config_dto_1.PriceConfigDTO, account.priceConfig);
    }
}
exports.PriceConfigService = PriceConfigService;
exports.priceConfigService = new PriceConfigService();
