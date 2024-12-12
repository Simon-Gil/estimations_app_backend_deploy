"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceConfigRepo = void 0;
const typeorm_1 = require("typeorm");
const database_config_1 = __importDefault(require("../../../config/database.config"));
const price_config_entity_1 = require("./price-config.entity");
class PriceConfigRepository extends typeorm_1.Repository {
    constructor() {
        super(price_config_entity_1.PriceConfigEntity, database_config_1.default.createEntityManager());
    }
}
exports.priceConfigRepo = new PriceConfigRepository();
