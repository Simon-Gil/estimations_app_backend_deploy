"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepo = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const database_config_1 = __importDefault(require("./../../config/database.config"));
const validator_utility_1 = require("../../common/utils/validator.utility");
const AppError_1 = require("../../common/utils/AppError");
class UserRepository extends typeorm_1.Repository {
    constructor() {
        super(user_entity_1.UserEntity, database_config_1.default.createEntityManager());
    }
    async findOrderedByDepartment(offset, limit) {
        let userQuery = this.createQueryBuilder('user')
            .leftJoinAndSelect('user.roles', 'roles')
            .leftJoinAndSelect('user.department', 'department')
            .leftJoinAndSelect('user.grade', 'grade')
            .orderBy("user.department", "ASC");
        if (offset !== undefined && limit !== undefined) {
            if (!validator_utility_1.Validator.isIntegerNonNegative(offset) || !validator_utility_1.Validator.isIntegerNonNegative(limit)) {
                throw new AppError_1.AppError('Parámetros de consulta inválidos', 400);
            }
            else {
                userQuery = userQuery.skip(offset).take(limit);
            }
        }
        const users = await userQuery.getMany();
        return users;
    }
}
exports.userRepo = new UserRepository();
