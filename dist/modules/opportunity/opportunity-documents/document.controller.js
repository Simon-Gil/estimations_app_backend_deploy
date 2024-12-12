"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentController = void 0;
const file_storage_service_1 = require("../../file-storage/file-storage.service");
const document_service_1 = require("./document.service");
class DocumentController {
    async getUploadSignedURL(req, res, next) {
        try {
            const id = req.params.id;
            const fileName = req.body.fileName;
            const fileType = req.body.fileType;
            const fs = file_storage_service_1.fileStorageService.getService();
            const url = await fs.generateUploadUrl(id, fileName, fileType);
            res.status(200).json(url);
        }
        catch (err) {
            next(err);
        }
    }
    async getDownloadSignedURL(req, res, next) {
        try {
            const id = req.params.id;
            const fileName = req.body.fileName;
            const fs = file_storage_service_1.fileStorageService.getService();
            const url = await fs.generateDownloadUrl(id, fileName);
            res.status(200).json(url);
        }
        catch (err) {
            next(err);
        }
    }
    async getDeleteSignedURL(req, res, next) {
        try {
            const id = req.params.id;
            const fileName = req.body.fileName;
            const fs = file_storage_service_1.fileStorageService.getService();
            const url = await fs.generateDeleteUrl(id, fileName);
            res.status(200).json(url);
        }
        catch (err) {
            next(err);
        }
    }
    async checkExistingFile(req, res, next) {
        try {
            const id = req.params.id;
            const fileName = req.query.fileName;
            const fileType = req.query.fileType;
            const fs = file_storage_service_1.fileStorageService.getService();
            const existingFile = await fs.checkExistingFile(id, fileName, fileType);
            res.status(200).json({ existingFile: existingFile });
        }
        catch (err) {
            next(err);
        }
    }
    async createDocumentRecord(req, res, next) {
        try {
            const fileName = req.body.fileName;
            const fileType = req.body.fileType;
            const id = req.params.id;
            const document = await document_service_1.documentService.createOpportunityDocument(fileName, fileType, id);
            res.status(200).json(document);
        }
        catch (err) {
            next(err);
        }
    }
    async getOpportunityDocuments(req, res, next) {
        try {
            const id = req.params.id;
            const documents = await document_service_1.documentService.getDocumentsByOpportunity(id);
            res.status(200).json(documents);
        }
        catch (err) {
            next(err);
        }
    }
    async deleteDocumentRecord(req, res, next) {
        try {
            const id = req.params.id;
            const fileName = req.body.fileName;
            const deletedMessage = await document_service_1.documentService.deleteDocumentRecord(id, fileName);
            res.status(200).json(deletedMessage);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.documentController = new DocumentController();
