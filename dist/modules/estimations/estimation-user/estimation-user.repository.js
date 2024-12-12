"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimationUserRepo = void 0;
const typeorm_1 = require("typeorm");
const database_config_1 = __importDefault(require("./../../../config/database.config"));
const estimation_user_entity_1 = require("./estimation-user.entity");
class EstimationUserRepository extends typeorm_1.Repository {
    constructor() {
        super(estimation_user_entity_1.EstimationUserEntity, database_config_1.default.createEntityManager());
    }
}
exports.estimationUserRepo = new EstimationUserRepository();
