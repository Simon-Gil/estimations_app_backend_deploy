"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileStorageService = exports.FileStorageService = void 0;
const storage_provider_config_1 = require("../../config/storage-provider.config");
const AppError_1 = require("../../common/utils/AppError");
/**
 * Servicio de almacenamiento de archivos que selecciona el proveedor de almacenamiento adecuado
 * según la configuración proporcionada.
 *
 * Dependiendo del proveedor configurado en `storageConfig.provider`, se selecciona el servicio de almacenamiento correspondiente
 * (por ejemplo, AWS S3 o Cloudinary). Si el proveedor no está soportado, se lanza un error.
 */
class FileStorageService {
    /**
     * Constructor que inicializa el servicio de almacenamiento adecuado según el proveedor configurado.
     * Si el proveedor no está soportado o no está configurado, se lanza un error.
     */
    constructor() {
        if (storage_provider_config_1.storageConfig.provider === 'aws') {
            const { AWSFileStorageService } = require('./aws-file-storage');
            this.storageService = new AWSFileStorageService();
        }
        else {
            // Si el proveedor no es soportado, lanzar un error
            throw new AppError_1.AppError('Proveedor de almacenamiento no soportado', 500);
        }
    }
    /**
     * Método para obtener el servicio de almacenamiento seleccionado.
     *
     * Este método devuelve el servicio de almacenamiento correspondiente,
     * que implementa la interfaz IFileStorageProvider.
     *
     * @returns El servicio de almacenamiento seleccionado.
     */
    getService() {
        return this.storageService;
    }
}
exports.FileStorageService = FileStorageService;
// Exportamos una instancia de la clase, que incluye el servicio de almacenamiento
exports.fileStorageService = new FileStorageService();
