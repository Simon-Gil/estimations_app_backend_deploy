"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typologyRepo = void 0;
const typeorm_1 = require("typeorm");
const database_config_1 = __importDefault(require("../../../config/database.config"));
const typology_entity_1 = require("./typology.entity");
class TypologyRepository extends typeorm_1.Repository {
    constructor() {
        super(typology_entity_1.TypologyEntity, database_config_1.default.createEntityManager());
    }
}
exports.typologyRepo = new TypologyRepository();
