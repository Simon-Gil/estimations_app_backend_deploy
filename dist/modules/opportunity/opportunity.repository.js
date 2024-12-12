"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.opportunityRepo = void 0;
const typeorm_1 = require("typeorm");
const database_config_1 = __importDefault(require("./../../config/database.config"));
const opportunity_entity_1 = require("./../opportunity/opportunity.entity");
const validator_utility_1 = require("../../common/utils/validator.utility");
const AppError_1 = require("../../common/utils/AppError");
class OpportunityRepository extends typeorm_1.Repository {
    constructor() {
        super(opportunity_entity_1.OpportunityEntity, database_config_1.default.createEntityManager());
    }
    async findOrderedByStatus(offset, limit) {
        let opportunityQuery = this.createQueryBuilder('opportunity')
            .leftJoinAndSelect('opportunity.commercialManager', 'commercialManager')
            .leftJoinAndSelect('opportunity.technicalManager', 'technicalManager')
            .leftJoinAndSelect('opportunity.proposals', 'proposals')
            .leftJoinAndSelect('opportunity.typology', 'typology')
            .leftJoinAndSelect('opportunity.account', 'account')
            .addSelect(`CASE 
                    WHEN opportunity.status = 'pending' THEN 1 
                    WHEN opportunity.status = 'won' THEN 2 
                    WHEN opportunity.status = 'lost' THEN 3 
                    ELSE 4 
                END`, 'status_order');
        opportunityQuery = opportunityQuery.orderBy('status_order', 'ASC');
        if (offset !== undefined && limit !== undefined) {
            if (!validator_utility_1.Validator.isIntegerNonNegative(offset) || !validator_utility_1.Validator.isIntegerNonNegative(limit)) {
                throw new AppError_1.AppError('Parámetros de consulta inválidos', 400);
            }
            else {
                opportunityQuery = opportunityQuery.skip(offset).take(limit);
            }
        }
        const opportunities = await opportunityQuery.getMany();
        return opportunities;
    }
}
exports.opportunityRepo = new OpportunityRepository();
