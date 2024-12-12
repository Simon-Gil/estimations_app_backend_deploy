"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileService = exports.ProfileService = void 0;
const AppError_1 = require("../../../common/utils/AppError");
const profile_repository_1 = require("./profile.repository");
/**
 * Servicio para gestionar los perfiles en el sistema.
 */
class ProfileService {
    /**
     * Obtiene todos los perfiles registrados en el sistema.
     * @returns Un array de entidades `ProfileEntity` que representan todos los perfiles.
     */
    async getAllProfiles() {
        const profiles = await profile_repository_1.profileRepo.find();
        return profiles;
    }
    /**
     * Obtiene un perfil por su ID.
     * @param id - El ID del perfil que se desea obtener.
     * @param relations - Las relaciones opcionales que se deben incluir al buscar el perfil (si las hay).
     * @returns La entidad `ProfileEntity` correspondiente al ID proporcionado.
     * @throws AppError - Si el perfil no se encuentra o ocurre un error al obtenerlo.
     */
    async getById(id, relations) {
        try {
            const profile = await profile_repository_1.profileRepo.findOne({
                where: { id: id },
                relations: relations
            });
            if (!profile) {
                throw new AppError_1.AppError('El perfil no ha sido encontrada', 404);
            }
            return profile;
        }
        catch (err) {
            throw new AppError_1.AppError('Error al obtener el perfil', 500);
        }
    }
}
exports.ProfileService = ProfileService;
exports.profileService = new ProfileService();
