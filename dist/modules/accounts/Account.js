"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const account_entity_1 = require("./account.entity");
class Account extends account_entity_1.AccountEntity {
    constructor(name, email, isCustomer, technicalManager, commercialManager, priceConfig) {
        super();
        this.name = name;
        this.email = email;
        this.isCustomer = isCustomer;
        this.technicalManager = technicalManager;
        this.commercialManager = commercialManager;
        this.priceConfig = priceConfig;
    }
}
exports.Account = Account;
