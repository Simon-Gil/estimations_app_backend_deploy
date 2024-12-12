"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateClientFunctional = generateClientFunctional;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const ejs_1 = __importDefault(require("ejs"));
const settings_service_1 = require("../settings/settings.service");
/**
 * Genera un archivo PDF sobre una propuesta utilizando una plantilla HTML,
 * con imágenes y datos de la propuesta proporcionados como parámetros.
 *
 * @param totalPrice - El precio total de la propuesta.
 * @param estimatedMonths - El número estimado de meses para el proyecto.
 * @param accountName - El nombre de la cuenta asociado a la propuesta.
 * @param opportunityName - El nombre de la oportunidad relacionada con la propuesta.
 * @param offerDate - La fecha de la propuesta.
 * @param techProposal - La descripción de la propuesta tecnológica que se incluirá en el documento.
 * @param goalsAndContext - Los objetivos y el contexto de la propuesta.
 * @returns Un `Uint8Array` que representa el archivo PDF generado, listo para ser enviado o descargado.
 * @throws Error si ocurre un problema durante la generación del PDF.
 */
async function generateClientFunctional(totalPrice, estimatedMonths, accountName, opportunityName, offerDate, techProposal, goalsAndContext) {
    const imageFolder = '../../resources/pdf-images';
    const fontFolder = '../../resources/fonts';
    // Carga de imagenes
    const softUxperienciePath = path_1.default.join(__dirname, `${imageFolder}/the-software-uxperiencie.png`);
    const softUxperiencie64 = fs_1.default.readFileSync(softUxperienciePath, { encoding: 'base64' });
    const softUxperiencieSrc = `data:image/png;base64,${softUxperiencie64}`;
    const duacodeLogoPath = path_1.default.join(__dirname, `${imageFolder}/duacode-logo.png`);
    const duacodeLogo64 = fs_1.default.readFileSync(duacodeLogoPath, { encoding: 'base64' });
    const duacodeLogoSrc = `data:image/png;base64,${duacodeLogo64}`;
    const firstPageImagePath = path_1.default.join(__dirname, `${imageFolder}/first-page-image.png`);
    const firstPageImage64 = fs_1.default.readFileSync(firstPageImagePath, { encoding: 'base64' });
    const firstPageImageSrc = `data:image/png;base64,${firstPageImage64}`;
    const backgroundReducedPath = path_1.default.join(__dirname, `${imageFolder}/reduced-background.png`);
    const backgroundReduced64 = fs_1.default.readFileSync(backgroundReducedPath, { encoding: 'base64' });
    const backgroundReducedSrc = `data:image/png;base64,${backgroundReduced64}`;
    const teamImagePath = path_1.default.join(__dirname, `${imageFolder}/team-image.png`);
    const teamImage64 = fs_1.default.readFileSync(teamImagePath, { encoding: 'base64' });
    const teamImageSrc = `data:image/png;base64,${teamImage64}`;
    const thirdPageImagePath = path_1.default.join(__dirname, `${imageFolder}/third-page-image.png`);
    const thirdPageImage64 = fs_1.default.readFileSync(thirdPageImagePath, { encoding: 'base64' });
    const thirdPageImageSrc = `data:image/png;base64,${thirdPageImage64}`;
    const relationsImagePath = path_1.default.join(__dirname, `${imageFolder}/relations-image.png`);
    const relationsImage64 = fs_1.default.readFileSync(relationsImagePath, { encoding: 'base64' });
    const relationsImageSrc = `data:image/png;base64,${relationsImage64}`;
    const meetingImagePath = path_1.default.join(__dirname, `${imageFolder}/meeting-room-image.png`);
    const meetingImage64 = fs_1.default.readFileSync(meetingImagePath, { encoding: 'base64' });
    const meetingImageSrc = `data:image/png;base64,${meetingImage64}`;
    const ceoImagePath = path_1.default.join(__dirname, `${imageFolder}/ceo-image.png`);
    const ceoImage64 = fs_1.default.readFileSync(ceoImagePath, { encoding: 'base64' });
    const ceoImageSrc = `data:image/png;base64,${ceoImage64}`;
    // Carga de fuentes
    const fontPath = path_1.default.join(__dirname, `${fontFolder}/Carlito-Regular.ttf`);
    const font64 = fs_1.default.readFileSync(fontPath, { encoding: 'base64' });
    const fontSrc = `data:font/woff2;base64,${font64}`;
    // Variable para el margen
    const sideMargin = '4rem';
    const daysToExp = (await settings_service_1.settingsService.getSettings()).expirationProposalDays;
    // Renderización HTML
    const contenidoHTML = await ejs_1.default.renderFile(path_1.default.join(__dirname, '../../resources', 'template.ejs'), { sideMargin, softUxperiencieSrc,
        duacodeLogoSrc, firstPageImageSrc, backgroundReducedSrc, teamImageSrc, thirdPageImageSrc, relationsImageSrc, meetingImageSrc, ceoImageSrc,
        totalPrice, estimatedMonths, accountName, opportunityName, offerDate, techProposal, goalsAndContext, daysToExp, fontSrc
    });
    // Generación PDF
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    await page.setContent(contenidoHTML, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '0px', bottom: '0px', left: '0px', right: '0px' },
    });
    await browser.close();
    return pdfBuffer;
}
