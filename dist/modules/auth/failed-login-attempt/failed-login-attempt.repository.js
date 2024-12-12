"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.failedLoginAttemptRepo = void 0;
const typeorm_1 = require("typeorm");
const database_config_1 = __importDefault(require("../../../config/database.config"));
const failed_login_attempt_entity_1 = require("./failed-login-attempt.entity");
class FailedLoginAttemptRepository extends typeorm_1.Repository {
    constructor() {
        super(failed_login_attempt_entity_1.FailedLoginAttemptEntity, database_config_1.default.createEntityManager());
    }
}
exports.failedLoginAttemptRepo = new FailedLoginAttemptRepository();
