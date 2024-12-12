"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsSeeder = void 0;
const settings_entity_1 = require("../../modules/settings/settings.entity");
// Seeder para la estructura básica de categorías
class SettingsSeeder {
    async run(dataSource, factoryManager) {
        const settingsRepository = dataSource.getRepository(settings_entity_1.SettingsEntity);
        const settings = new settings_entity_1.SettingsEntity();
        settings.tag = 'main_settings';
        settings.expirationProposalDays = 30;
        await settingsRepository.upsert(settings, ['tag']);
        console.log('Datos seed de Configuración de la aplicación introducidos');
    }
}
exports.SettingsSeeder = SettingsSeeder;
