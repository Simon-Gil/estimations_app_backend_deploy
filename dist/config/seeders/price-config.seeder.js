"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceConfigSeeder = void 0;
const profile_price_entity_1 = require("../../modules/accounts/price-config/price-profile/profile-price.entity");
const price_config_entity_1 = require("../../modules/accounts/price-config/price-config.entity");
const PriceConfig_1 = require("../../modules/accounts/price-config/PriceConfig");
const PriceProfile_1 = require("../../modules/accounts/price-config/price-profile/PriceProfile");
const profile_entity_1 = require("../../modules/company-structure/profile/profile.entity");
class PriceConfigSeeder {
    async run(dataSource, factoryManager) {
        const repository = dataSource.getRepository(price_config_entity_1.PriceConfigEntity);
        // No ejecutamos el proceso de inserción si ya existe configuración de precio por defecto
        const existingDefault = await repository.findOne({ where: { tag: 'default' } });
        if (existingDefault) {
            return;
        }
        // Cargamos perfiles 
        const profileRepository = dataSource.getRepository(profile_entity_1.ProfileEntity);
        const profiles = await profileRepository.find();
        const direccion = profiles.find(p => p.name === 'Dirección');
        const interfaces = profiles.find(p => p.name === 'Interfaces');
        const front = profiles.find(p => p.name === 'Front');
        const back = profiles.find(p => p.name === 'Back');
        const research = profiles.find(p => p.name === 'Research');
        const direccionPrice = new PriceProfile_1.ProfilePrice(direccion, 15);
        const interfacesPrice = new PriceProfile_1.ProfilePrice(interfaces, 10);
        const frontPrice = new PriceProfile_1.ProfilePrice(front, 10);
        const backPrice = new PriceProfile_1.ProfilePrice(back, 10);
        const researchPrice = new PriceProfile_1.ProfilePrice(research, 10);
        const profilePrices = [frontPrice, direccionPrice, backPrice, researchPrice, interfacesPrice];
        const defaultConfig = new PriceConfig_1.PriceConfig(profilePrices, true, 'default');
        await repository.save(defaultConfig);
        const defaultConfigEntity = await repository.findOne({ where: { isDefault: true } });
        profilePrices.forEach(profilePrice => profilePrice.priceConfig = defaultConfigEntity);
        const profilePriceRepo = dataSource.getRepository(profile_price_entity_1.ProfilePriceEntity);
        await profilePriceRepo.save(profilePrices);
        console.log('Datos seed de configuración de precios por defecto introducidos');
    }
}
exports.PriceConfigSeeder = PriceConfigSeeder;
