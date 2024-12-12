"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskCategoriesService = exports.TaskCategoriesService = void 0;
const class_transformer_1 = require("class-transformer");
const categories_dto_1 = require("./categories.dto");
const AppError_1 = require("../../../common/utils/AppError");
const first_level_category_repository_1 = require("./first-level-category/first-level-category.repository");
/**
 * Servicio encargado de gestionar las categorías de tareas.
 */
class TaskCategoriesService {
    /**
   * Obtiene todas las categorías de tareas, incluyendo las categorías de segundo nivel asociadas.
   * @returns Una lista de categorías en formato DTO.
   * @throws {AppError} Si no se encuentran categorías.
   */
    async getCategories() {
        const categories = await first_level_category_repository_1.firstLevelCatRepo.find({ relations: ['secondLevelCategories'] });
        if (!categories) {
            throw new AppError_1.AppError('No se han encontrado categorías', 404);
        }
        return (0, class_transformer_1.plainToInstance)(categories_dto_1.CategoriesDTO, categories);
    }
}
exports.TaskCategoriesService = TaskCategoriesService;
exports.taskCategoriesService = new TaskCategoriesService();
