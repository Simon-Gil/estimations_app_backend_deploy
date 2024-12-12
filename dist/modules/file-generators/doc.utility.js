"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDocx = generateDocx;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pizzip_1 = __importDefault(require("pizzip"));
const docxtemplater_1 = __importDefault(require("docxtemplater"));
const settings_service_1 = require("../settings/settings.service");
/**
 * Genera un archivo DOCX utilizando una plantilla y datos de propuesta.
 * La plantilla DOCX se encuentra en el directorio de recursos de la aplicación y se personaliza con los valores proporcionados.
 *
 * @param totalPrice - El precio total de la propuesta, que se incluirá en el documento.
 * @param estimatedMonths - El número estimado de meses para el proyecto.
 * @param accountName - El nombre de la cuenta asociado a la propuesta.
 * @param opportunityName - El nombre de la oportunidad relacionada con la propuesta.
 * @param offerDate - La fecha de la propuesta.
 * @param techProposal - La propuesta tecnológica que se incluirá en el documento.
 * @param goalsAndContext - Los objetivos y el contexto de la propuesta.
 * @returns Un `Buffer` que representa el documento DOCX generado, listo para ser enviado o descargado.
 * @throws Error si ocurre un problema durante la generación del documento.
 */
async function generateDocx(totalPrice, estimatedMonths, accountName, opportunityName, offerDate, techProposal, goalsAndContext) {
    try {
        const templatePath = path_1.default.join(__dirname, '../../resources/doc-template.dotx');
        const templateContent = fs_1.default.readFileSync(templatePath);
        const zip = new pizzip_1.default(templateContent);
        const doc = new docxtemplater_1.default(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });
        // Data
        const settings = await settings_service_1.settingsService.getSettings();
        const expDays = settings.expirationProposalDays;
        const data = {
            estimatedMonths: estimatedMonths,
            opportunityName: opportunityName,
            offerDate: offerDate,
            techProposal: techProposal,
            goalsAndContext: goalsAndContext,
            accountName: accountName,
            totalPrice: totalPrice,
            expDays: expDays
        };
        doc.render(data);
        const generatedDocx = doc.getZip().generate({
            type: 'nodebuffer', // Devuelve un Buffer listo para ser enviado
        });
        return generatedDocx;
    }
    catch (error) {
        console.error('Error al generar el documento DOCX:', error);
        throw error;
    }
}
