"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentRepo = void 0;
const typeorm_1 = require("typeorm");
const database_config_1 = __importDefault(require("../../../config/database.config"));
const department_entity_1 = require("./department.entity");
class DepartmentRepository extends typeorm_1.Repository {
    constructor() {
        super(department_entity_1.DepartmentEntity, database_config_1.default.createEntityManager());
    }
}
exports.departmentRepo = new DepartmentRepository();
