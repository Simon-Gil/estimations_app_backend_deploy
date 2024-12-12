"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSFileStorageService = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const storage_provider_config_1 = require("../../config/storage-provider.config");
const AppError_1 = require("../../common/utils/AppError");
/**
 * Servicio para la gestión de archivos usando AWS S3.
 * Implementa la interfaz IFileStorageProvider y proporciona métodos
 * para generar URLs firmadas para la subida, descarga, eliminación y
 * verificación de existencia de archivos en un bucket S3.
 */
class AWSFileStorageService {
    constructor() {
        // Configuración de AWS S3 con las credenciales del entorno
        aws_sdk_1.default.config.update({
            accessKeyId: storage_provider_config_1.storageConfig.aws.accessKeyId,
            secretAccessKey: storage_provider_config_1.storageConfig.aws.secretAccessKey,
            region: storage_provider_config_1.storageConfig.aws.region,
            signatureVersion: 'v4'
        });
        this.s3 = new aws_sdk_1.default.S3();
    }
    /**
     * Genera una URL firmada para subir un archivo a S3.
     *
     * Utiliza el servicio AWS S3 para generar una URL que permita subir un archivo
     * al bucket S3 especificado. La URL tiene una validez de 60 segundos.
     *
     * @param opportunityId - El identificador único de la oportunidad asociada al archivo.
     * @param fileName - El nombre del archivo que se va a subir.
     * @param fileType - El tipo de archivo (por ejemplo, 'image/png', 'application/pdf').
     *
     * @returns Una promesa que se resuelve con la URL firmada para subir el archivo.
     */
    async generateUploadUrl(opportunityId, fileName, fileType) {
        const fileKey = `opportunities/${opportunityId}/${fileName}`;
        const params = {
            Bucket: storage_provider_config_1.storageConfig.aws.bucketName,
            Key: fileKey,
            Expires: 60, // URL válida por 60 segundos
            ContentType: fileType, // Tipo de contenido del archivo
        };
        try {
            const uploadUrl = await this.s3.getSignedUrlPromise('putObject', params);
            return uploadUrl;
        }
        catch (error) {
            throw new AppError_1.AppError('Error al generar la URL de subida', 500);
        }
    }
    /**
     * Genera una URL firmada para descargar un archivo de S3.
     *
     * Utiliza el servicio AWS S3 para generar una URL que permita descargar
     * un archivo del bucket S3 especificado. La URL tiene una validez de 1 hora.
     *
     * @param opportunityId - El identificador único de la oportunidad asociada al archivo.
     * @param fileName - El nombre del archivo que se va a descargar.
     *
     * @returns Una promesa que se resuelve con la URL firmada para descargar el archivo.
     */
    async generateDownloadUrl(opportunityId, fileName) {
        const fileKey = `opportunities/${opportunityId}/${fileName}`;
        const params = {
            Bucket: storage_provider_config_1.storageConfig.aws.bucketName,
            Key: fileKey,
            Expires: 60 * 60,
        };
        try {
            const downloadUrl = await this.s3.getSignedUrlPromise('getObject', params);
            return downloadUrl;
        }
        catch (error) {
            throw new AppError_1.AppError('Error al generar la URL de descarga', 500);
        }
    }
    /**
     * Genera una URL firmada para eliminar un archivo de S3.
     *
     * Utiliza el servicio AWS S3 para generar una URL que permita eliminar
     * un archivo del bucket S3 especificado. La URL tiene una validez de 60 segundos.
     *
     * @param opportunityId - El identificador único de la oportunidad asociada al archivo.
     * @param fileName - El nombre del archivo que se va a eliminar.
     *
     * @returns Una promesa que se resuelve con la URL firmada para eliminar el archivo.
     */
    async generateDeleteUrl(opportunityId, fileName) {
        const fileKey = `opportunities/${opportunityId}/${fileName}`;
        const params = {
            Bucket: storage_provider_config_1.storageConfig.aws.bucketName,
            Key: fileKey,
            Expires: 60,
        };
        try {
            const deleteUrl = await this.s3.getSignedUrlPromise('deleteObject', params);
            return deleteUrl;
        }
        catch (error) {
            throw new AppError_1.AppError('Error al generar la URL de borrado', 500);
        }
    }
    /**
     * Comprueba si un archivo existe en el servicio de almacenamiento de S3.
     *
     * Utiliza el servicio AWS S3 para verificar si el archivo existe en el bucket especificado.
     * Si el archivo no existe, se devuelve `false`. En caso de error, se lanza una excepción.
     *
     * @param opportunityId - El identificador único de la oportunidad asociada al archivo.
     * @param fileName - El nombre del archivo a verificar.
     * @param fileType - El tipo de archivo (por ejemplo, 'image/png', 'application/pdf').
     *
     * @returns Una promesa que se resuelve con `true` si el archivo existe, o `false` si no.
     */
    async checkExistingFile(opportunityId, fileName, fileType) {
        const fileKey = `opportunities/${opportunityId}/${fileName}`;
        const params = {
            Bucket: storage_provider_config_1.storageConfig.aws.bucketName,
            Key: fileKey,
        };
        try {
            await this.s3.headObject(params).promise();
            return true;
        }
        catch (error) {
            // Si el archivo no existe, el error tendrá el código 'NotFound'
            if (this.isAWSError(error) && error.code === 'NotFound') {
                return false;
            }
            throw new AppError_1.AppError('Error al verificar la existencia del archivo en S3', 500);
        }
    }
    /**
     * Verifica si un error es un error de tipo AWS.AWSError.
     *
     * @param error - El error a verificar.
     *
     * @returns `true` si el error es un AWS.AWSError, de lo contrario `false`.
     */
    isAWSError(error) {
        return error.code !== undefined;
    }
}
exports.AWSFileStorageService = AWSFileStorageService;
