"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskCategoriesController = void 0;
const task_categories_service_1 = require("./task-categories.service");
class TaskCategoriesController {
    async getCategories(req, res, next) {
        try {
            const categories = await task_categories_service_1.taskCategoriesService.getCategories();
            res.status(200).json(categories);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.taskCategoriesController = new TaskCategoriesController();
