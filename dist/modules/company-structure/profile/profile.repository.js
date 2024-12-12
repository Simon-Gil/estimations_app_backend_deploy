"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRepo = void 0;
const typeorm_1 = require("typeorm");
const database_config_1 = __importDefault(require("../../../config/database.config"));
const profile_entity_1 = require("./profile.entity");
class ProfileRepository extends typeorm_1.Repository {
    constructor() {
        super(profile_entity_1.ProfileEntity, database_config_1.default.createEntityManager());
    }
}
exports.profileRepo = new ProfileRepository();
