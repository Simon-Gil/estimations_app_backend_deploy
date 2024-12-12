"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentEntity = void 0;
const typeorm_1 = require("typeorm");
const opportunity_entity_1 = require("./../opportunity.entity");
/*
  @swagger
  components:
    schemas:
      DocumentEntity:
        type: object
        properties:
          filePath:
            type: string
            description: "La ruta donde se almacena el documento"
            example: "/documents/file123.pdf"
          fileName:
            type: string
            description: "El nombre del archivo, incluyendo su extensión"
            example: "file123.pdf"
          fileType:
            type: string
            description: "El tipo MIME del documento (por ejemplo, application/pdf)"
            example: "application/pdf"
          createdAt:
            type: string
            format: date-time
            description: "Fecha y hora en que se creó el documento"
            example: "2024-12-06T12:00:00Z"
          updatedAt:
            type: string
            format: date-time
            description: "Fecha y hora en que se actualizó el documento por última vez"
            example: "2024-12-06T12:30:00Z"
          opportunity:
            type: object
            description: "La oportunidad a la que está vinculado el documento"
            properties:
              id:
                type: string
                description: "Identificador único de la oportunidad"
                example: "12345"
*/
let DocumentEntity = class DocumentEntity {
};
exports.DocumentEntity = DocumentEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'file_path' }),
    __metadata("design:type", String)
], DocumentEntity.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_name' }),
    __metadata("design:type", String)
], DocumentEntity.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_type' }),
    __metadata("design:type", String)
], DocumentEntity.prototype, "fileType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], DocumentEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], DocumentEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => opportunity_entity_1.OpportunityEntity, (opportunity) => opportunity.documents),
    __metadata("design:type", opportunity_entity_1.OpportunityEntity)
], DocumentEntity.prototype, "opportunity", void 0);
exports.DocumentEntity = DocumentEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'document' })
], DocumentEntity);
