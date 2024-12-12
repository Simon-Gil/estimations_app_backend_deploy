"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRepo = void 0;
const typeorm_1 = require("typeorm");
const database_config_1 = __importDefault(require("./../../config/database.config"));
const account_entity_1 = require("./account.entity");
const AppError_1 = require("../../common/utils/AppError");
const validator_utility_1 = require("../../common/utils/validator.utility");
class AccountRepository extends typeorm_1.Repository {
    constructor() {
        super(account_entity_1.AccountEntity, database_config_1.default.createEntityManager());
    }
    async findWithOrderedOpportunities(accountId) {
        const account = await this.createQueryBuilder('account')
            .leftJoinAndSelect('account.opportunities', 'opportunity')
            .leftJoinAndSelect('opportunity.proposals', 'proposals')
            .leftJoinAndSelect('opportunity.typology', 'typology')
            .leftJoinAndSelect('opportunity.commercialManager', 'commercialManager')
            .leftJoinAndSelect('opportunity.technicalManager', 'technicalManager')
            .addOrderBy(`CASE 
                    WHEN opportunity.status = 'pending' THEN 1
                    WHEN opportunity.status = 'won' THEN 2
                    WHEN opportunity.status = 'lost' THEN 3
                    ELSE 4
                END`, 'ASC')
            .where('account.id = :accountId', { accountId })
            .getOne();
        if (account) {
            return account;
        }
        else {
            throw new AppError_1.AppError('No se ha encontrado la cuenta', 404);
        }
    }
    async findPaged(offset, limit) {
        let accountQuery = this.createQueryBuilder("account")
            .leftJoinAndSelect("account.priceConfig", "priceConfig")
            .leftJoinAndSelect("account.technicalManager", "technicalManager")
            .leftJoinAndSelect("account.commercialManager", "commercialManager")
            .orderBy("account.isCustomer", "DESC");
        if (offset !== undefined && limit !== undefined) {
            if (!validator_utility_1.Validator.isIntegerNonNegative(offset) || !validator_utility_1.Validator.isIntegerNonNegative(limit)) {
                throw new AppError_1.AppError('Parámetros de consulta inválidos', 400);
            }
            else {
                accountQuery = accountQuery.skip(offset).take(limit);
            }
        }
        const accounts = await accountQuery.getMany();
        return accounts;
    }
}
exports.accountRepo = new AccountRepository;
