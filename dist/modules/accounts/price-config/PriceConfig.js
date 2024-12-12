"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceConfig = void 0;
const price_config_entity_1 = require("./price-config.entity");
class PriceConfig extends price_config_entity_1.PriceConfigEntity {
    constructor(profilePrices, isDefault, tag) {
        super();
        this.profilePrices = profilePrices;
        this.isDefault = isDefault;
        tag ? this.tag = tag : null;
    }
}
exports.PriceConfig = PriceConfig;
