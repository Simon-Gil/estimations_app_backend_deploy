"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentRepo = void 0;
const typeorm_1 = require("typeorm");
const database_config_1 = __importDefault(require("./../../../config/database.config"));
const document_entity_1 = require("./document.entity");
class DocumentRepository extends typeorm_1.Repository {
    constructor() {
        super(document_entity_1.DocumentEntity, database_config_1.default.createEntityManager());
    }
}
exports.documentRepo = new DocumentRepository();
