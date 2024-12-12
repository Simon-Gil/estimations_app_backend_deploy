"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Configuración para el almacenamiento de archivos en la aplicación.
 *
 * Dependiendo del proveedor de almacenamiento configurado en el entorno (por defecto AWS),
 * se establecerán las credenciales y parámetros necesarios para la conexión al servicio de almacenamiento.
 */
exports.storageConfig = {
    provider: process.env.STORAGE_PROVIDER || 'aws',
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
        bucketName: process.env.AWS_BUCKET_NAME,
    },
};
