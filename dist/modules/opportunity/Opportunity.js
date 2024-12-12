"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Opportunity = void 0;
const opportunity_entity_1 = require("./opportunity.entity");
const OpportunityStatus_1 = require("./OpportunityStatus");
class Opportunity extends opportunity_entity_1.OpportunityEntity {
    constructor(account, name, requirements, typology, commercialManager, technicalManager) {
        super();
        this.account = account;
        this.name = name;
        this.requirements = requirements;
        this.typology = typology;
        this.commercialManager = commercialManager;
        technicalManager ? this.technicalManager = technicalManager : undefined;
    }
    isPending() {
        return this.status === OpportunityStatus_1.OpportunityStatus.PENDING;
    }
}
exports.Opportunity = Opportunity;
