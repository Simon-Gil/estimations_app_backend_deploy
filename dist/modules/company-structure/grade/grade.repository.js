"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradeRepo = void 0;
const typeorm_1 = require("typeorm");
const database_config_1 = __importDefault(require("../../../config/database.config"));
const grade_entity_1 = require("./../grade/grade.entity");
class GradeRepository extends typeorm_1.Repository {
    constructor() {
        super(grade_entity_1.GradeEntity, database_config_1.default.createEntityManager());
    }
}
exports.gradeRepo = new GradeRepository();
