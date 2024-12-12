"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsRepo = void 0;
const typeorm_1 = require("typeorm");
const database_config_1 = __importDefault(require("../../config/database.config"));
const settings_entity_1 = require("./settings.entity");
class SettingsRepository extends typeorm_1.Repository {
    constructor() {
        super(settings_entity_1.SettingsEntity, database_config_1.default.createEntityManager());
    }
}
exports.settingsRepo = new SettingsRepository();
