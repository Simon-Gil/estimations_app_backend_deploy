"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typologyService = exports.TypologyService = void 0;
const typology_entity_1 = require("./typology.entity");
const AppError_1 = require("../../../common/utils/AppError");
const typology_repository_1 = require("./typology.repository");
/**
 * Servicio encargado de gestionar las tipologías dentro de la aplicación.
 */
class TypologyService {
    /**
     * Obtiene una tipología por su ID.
     * @param typologyId - ID de la tipología a obtener.
     * @returns La tipología solicitada.
     * @throws {AppError} Si la tipología no se encuentra.
     */
    async getTypologyById(typologyId) {
        const typology = await typology_repository_1.typologyRepo.findOne({
            where: { id: typologyId }
        });
        if (!typology) {
            throw new AppError_1.AppError('Tipología no encontrada', 404);
        }
        return typology;
    }
    /**
     * Obtiene todas las tipologías registradas en el sistema.
     * @returns Un array con todas las tipologías.
     */
    async getTypologies() {
        const typologies = await typology_repository_1.typologyRepo.find();
        return typologies;
    }
    /**
     * Crea una nueva tipología.
     * @param name - Nombre de la nueva tipología.
     * @returns La tipología creada.
     * @throws {AppError} Si ya existe una tipología con el mismo nombre.
     */
    async createTypology(name) {
        try {
            const typology = new typology_entity_1.TypologyEntity();
            typology.name = name;
            const savedTypology = await typology_repository_1.typologyRepo.save(typology);
            return savedTypology;
        }
        catch (err) {
            throw new AppError_1.AppError('Ya existe una tipología con ese nombre', 400);
        }
    }
}
exports.TypologyService = TypologyService;
exports.typologyService = new TypologyService();
