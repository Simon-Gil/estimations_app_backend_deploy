"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilePrice = void 0;
const profile_price_entity_1 = require("./profile-price.entity");
class ProfilePrice extends profile_price_entity_1.ProfilePriceEntity {
    constructor(profile, price) {
        super();
        this.profile = profile,
            this.priceH = price;
    }
}
exports.ProfilePrice = ProfilePrice;
