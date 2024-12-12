"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proposalRepo = void 0;
const typeorm_1 = require("typeorm");
const database_config_1 = __importDefault(require("../../config/database.config"));
const proposal_entity_1 = require("./proposal.entity");
const validator_utility_1 = require("../../common/utils/validator.utility");
const AppError_1 = require("../../common/utils/AppError");
class ProposalRepository extends typeorm_1.Repository {
    constructor() {
        super(proposal_entity_1.ProposalEntity, database_config_1.default.createEntityManager());
    }
    async findOrderedByStatus(user, offset, limit) {
        let query = exports.proposalRepo.createQueryBuilder('proposal')
            .leftJoinAndSelect('proposal.estimation', 'estimation')
            .leftJoinAndSelect('estimation.estimationUsers', 'estimationUsers')
            .leftJoinAndSelect('estimationUsers.user', 'estimationUser')
            .leftJoinAndSelect('proposal.opportunity', 'opportunity')
            .leftJoinAndSelect('opportunity.technicalManager', 'technicalManager')
            .leftJoinAndSelect('opportunity.commercialManager', 'commercialManager')
            .leftJoinAndSelect('opportunity.account', 'account')
            .leftJoinAndSelect('account.commercialManager', 'accountCommercialManager')
            .leftJoinAndSelect('account.technicalManager', 'accountTechnicalManager')
            .addSelect(`CASE 
                WHEN proposal.status = 'pending' THEN 1
                WHEN proposal.status = 'ready_for_validation' THEN 2
                WHEN proposal.status = 'done' THEN 3
                ELSE 4 
                END`, 'status_order');
        query = query.orderBy('status_order', 'ASC');
        if (user) {
            query.where(new typeorm_1.Brackets(qb => {
                qb.where('estimationUser.id = :userId', { userId: user.id })
                    .orWhere('technicalManager.id = :userId', { userId: user.id })
                    .orWhere('commercialManager.id = :userId', { userId: user.id })
                    .orWhere('accountCommercialManager.id = :userId', { userId: user.id })
                    .orWhere('accountTechnicalManager.id = :userId', { userId: user.id });
            }));
        }
        if (offset !== undefined && limit !== undefined) {
            if (!validator_utility_1.Validator.isIntegerNonNegative(offset) || !validator_utility_1.Validator.isIntegerNonNegative(limit)) {
                throw new AppError_1.AppError('Parámetros de consulta inválidos', 400);
            }
            else {
                query = query.skip(offset).take(limit);
            }
        }
        const proposals = await query.getMany();
        return proposals;
    }
}
exports.proposalRepo = new ProposalRepository();
