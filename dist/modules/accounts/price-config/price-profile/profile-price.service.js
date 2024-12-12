"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilePriceService = exports.ProfilePriceService = void 0;
const profile_price_entity_1 = require("./profile-price.entity");
const AppError_1 = require("../../../../common/utils/AppError");
const profile_price_repository_1 = require("./profile-price.repository");
const price_config_service_1 = require("../price-config.service");
const profile_service_1 = require("../../../company-structure/profile/profile.service");
/**
 * Servicio para gestionar los precios asociados a los perfiles dentro de una configuración de precios.
 */
class ProfilePriceService {
    /**
     * Crea un nuevo precio para un perfil dentro de una configuración de precios.
     * @param priceConfigId - El ID de la configuración de precios donde se asociará el precio.
     * @param profileId - El ID del perfil al que se asignará el precio.
     * @param priceH - El precio por hora que se asociará al perfil.
     * @returns El perfil con el precio actualizado.
     * @throws AppError - Si ocurre un error al guardar el precio del perfil.
     */
    async createProfilePrice(priceConfigId, profileId, priceH) {
        // Obtener perfil
        const profile = await profile_service_1.profileService.getById(profileId);
        // Obtener cuenta
        const priceConfig = await price_config_service_1.priceConfigService.getById(priceConfigId);
        // Instanciamos ProfilePriceEntity y asignamos propiedades
        const profilePrice = new profile_price_entity_1.ProfilePriceEntity();
        profilePrice.priceConfig = priceConfig;
        profilePrice.profile = profile;
        profilePrice.priceH = priceH;
        const savedProfilePrice = await profile_price_repository_1.profilePriceRepo.save(profilePrice);
        if (!savedProfilePrice) {
            throw new AppError_1.AppError('Error al guardar el precio perfil', 500);
        }
        return savedProfilePrice;
    }
    /**
    * Obtiene los precios asociados a una configuración de precios específica.
    * @param priceConfig - La configuración de precios para la cual se desean obtener los precios de perfil.
    * @returns Un array de precios asociados a los perfiles dentro de la configuración.
    */
    async getByPriceConfig(priceConfig) {
        const profilePrices = await profile_price_repository_1.profilePriceRepo.find({
            where: { priceConfig: { id: priceConfig.id } },
            relations: ['profile'],
        });
        return profilePrices;
    }
}
exports.ProfilePriceService = ProfilePriceService;
exports.profilePriceService = new ProfilePriceService();
