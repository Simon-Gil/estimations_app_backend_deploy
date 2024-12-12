"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRepo = void 0;
const typeorm_1 = require("typeorm");
const database_config_1 = __importDefault(require("../../../config/database.config"));
const task_entity_1 = require("./task.entity");
class TaskRepository extends typeorm_1.Repository {
    constructor() {
        super(task_entity_1.TaskEntity, database_config_1.default.createEntityManager());
    }
}
exports.taskRepo = new TaskRepository();
