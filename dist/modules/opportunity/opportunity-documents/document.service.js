"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentService = exports.DocumentService = void 0;
const document_entity_1 = require("./document.entity");
const AppError_1 = require("../../../common/utils/AppError");
const document_repository_1 = require("./document.repository");
const opportunity_service_1 = require("./../opportunity.service");
class DocumentService {
    /**
     * Inserta en la base de datos los datos de un documento adjunto a una oportunidad.
     *
     * Esta función recibe un nombre de archivo y tipo de archivo, verifica si el documento ya existe en la base de datos
     * para la oportunidad específica. Si el documento no existe, lo guarda en la base de datos, si no, lo actualiza.
     *
     * @param fileName - El nombre del archivo a ser guardado.
     * @param fileType - El tipo MIME del archivo a ser guardado.
     * @param opportunityId - El ID de la oportunidad a la cual se asociará el documento.
     *
     * @returns Una instancia de `DocumentEntity` que representa el documento guardado.
     *
     */
    async createOpportunityDocument(fileName, fileType, opportunityId) {
        const opportunity = await opportunity_service_1.opportunityService.getById(opportunityId);
        let document = new document_entity_1.DocumentEntity();
        const existingDocument = await document_repository_1.documentRepo.findOne({
            where: {
                fileName: fileName,
                fileType: fileType,
                opportunity: { id: opportunity.id }
            }
        });
        if (existingDocument) {
            document = existingDocument;
        }
        else {
            document.fileName = fileName;
            document.fileType = fileType;
            document.filePath = `opportunities/${opportunity.id}/${fileName}`;
            document.opportunity = opportunity;
        }
        const savedDocument = await document_repository_1.documentRepo.save(document);
        return savedDocument;
    }
    /**
     * Recupera todos los registros de documentos asociados a una oportunidad específica.
     *
     * Este método consulta los documentos vinculados a la oportunidad indicada por su ID y devuelve una lista de documentos
     * asociados a esa oportunidad. No devuelve los documentos en sí si no los registros de la base de datos.
    
     *
     * @param opportunityId - El ID de la oportunidad de la cual se quieren recuperar los documentos.
     *
     * @returns Una promesa de un arreglo de instancias de `DocumentEntity`, que representan los documentos
     * asociados a la oportunidad.
     */
    async getDocumentsByOpportunity(opportunityId) {
        const opportunity = await opportunity_service_1.opportunityService.getById(opportunityId, ['documents']);
        return opportunity.documents;
    }
    /**
     * Elimina un registro de documento asociado a una oportunidad en la base de datos.
     *
     * Este método busca el documento especificado.
     * Si el documento existe, lo elimina de la base de datos. Si no existe, lanza un error.
     *
     * @param opportunityId - El ID de la oportunidad asociada al documento a eliminar.
     * @param fileName - El nombre del archivo que representa el documento a eliminar.
     *
     * @returns Un objeto con un mensaje de éxito si el documento se elimina correctamente.
     *
     * @throws `AppError` si el documento no existe o si ocurrió un error al intentar eliminarlo.
     */
    async deleteDocumentRecord(opportunityId, fileName) {
        const filePath = `opportunities/${opportunityId}/${fileName}`;
        const document = await document_repository_1.documentRepo.findOne({ where: { filePath } });
        if (document) {
            const deleteResult = await document_repository_1.documentRepo.delete({ filePath });
            // Verificamos si el registro fue eliminado
            if (deleteResult.affected && deleteResult.affected > 0) {
                return { message: 'Documento eliminado correctamente' };
            }
            else {
                throw new AppError_1.AppError('El documento no pudo ser eliminado', 500);
            }
        }
        else {
            throw new AppError_1.AppError('El documento no ha sido encontrado', 404);
        }
    }
}
exports.DocumentService = DocumentService;
exports.documentService = new DocumentService();
