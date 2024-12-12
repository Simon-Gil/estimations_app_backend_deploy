"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilePriceRepo = void 0;
const typeorm_1 = require("typeorm");
const database_config_1 = __importDefault(require("../../../../config/database.config"));
const profile_price_entity_1 = require("./profile-price.entity");
class ProfilePriceRepository extends typeorm_1.Repository {
    constructor() {
        super(profile_price_entity_1.ProfilePriceEntity, database_config_1.default.createEntityManager());
    }
}
exports.profilePriceRepo = new ProfilePriceRepository();
