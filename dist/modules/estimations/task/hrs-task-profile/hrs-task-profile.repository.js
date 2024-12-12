"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hrsTaskProfileRepo = void 0;
const typeorm_1 = require("typeorm");
const database_config_1 = __importDefault(require("../../../../config/database.config"));
const hrs_task_profile_entity_1 = require("./hrs-task-profile.entity");
class HrsTaskProfileRepository extends typeorm_1.Repository {
    constructor() {
        super(hrs_task_profile_entity_1.HrsTaskProfileEntity, database_config_1.default.createEntityManager());
    }
}
exports.hrsTaskProfileRepo = new HrsTaskProfileRepository();
