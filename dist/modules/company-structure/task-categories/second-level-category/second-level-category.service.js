"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secLevelCatService = exports.SecondLevelCategoryService = void 0;
const AppError_1 = require("../../../../common/utils/AppError");
const second_level_category_repository_1 = require("./second-level-category.repository");
/**
 * Servicio encargado de gestionar las categorías de segundo nivel.
 */
class SecondLevelCategoryService {
    /**
   * Obtiene una categoría de segundo nivel por su ID.
   * @param id - ID de la categoría de segundo nivel a obtener.
   * @param relations - Relaciones adicionales a cargar (opcional).
   * @returns La categoría de segundo nivel correspondiente.
   * @throws {AppError} Si no se encuentra la categoría de segundo nivel o si ocurre un error al obtenerla.
   */
    async getById(id, relations) {
        try {
            const secLevelCat = await second_level_category_repository_1.secLevelCatRepo.findOne({
                where: { id: id },
                relations: relations
            });
            if (!secLevelCat) {
                throw new AppError_1.AppError('La categoría de segundo nivel no ha sido encontrada', 404);
            }
            return secLevelCat;
        }
        catch (err) {
            throw new AppError_1.AppError('Error al obtener la categoría de segundo nivel', 500);
        }
    }
}
exports.SecondLevelCategoryService = SecondLevelCategoryService;
exports.secLevelCatService = new SecondLevelCategoryService();
