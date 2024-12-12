"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("../../config/swagger"));
const express_2 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
// Rutas de documentación de la aplicación
router.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Documentación del Proyecto</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                    background: linear-gradient(135deg, #f3f4f6, #e3e4e6);
                }
                .container {
                    background: white;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    border-radius: 10px;
                    padding: 2rem;
                    text-align: center;
                    width: 90%;
                    max-width: 700px;
                }
                h1 {
                    font-size: 2rem;
                    color: #333;
                    margin-bottom: 1rem;
                }
                p {
                    font-size: 1rem;
                    color: #555;
                    margin-bottom: 1.5rem;
                }
                .button-container {
                    display: flex;
                    justify-content: space-between;
                    gap: 1rem;
                }
                .button {
                    flex: 1;
                    text-align: center;
                    background-color: #007bff;
                    color: white;
                    text-decoration: none;
                    font-size: 1rem;
                    font-weight: bold;
                    padding: 0.75rem 1rem;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s, transform 0.2s;
                }
                .button:hover {
                    background-color: #0056b3;
                    transform: scale(1.05);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Documentación del Proyecto</h1>
                <p>¿Qué tipo de documentación deseas ver?</p>
                <div class="button-container">
                    <a href="/api/docs/api-docs" class="button" target="_blank">Documentación API (Swagger)</a>
                    <a href="/api/docs/typedoc" class="button" target="_blank">Documentación del código (TypeDoc)</a>
                </div>
            </div>
        </body>
        </html>
        `);
});
router.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
router.use('/typedoc', express_2.default.static(path_1.default.join(__dirname, '../../../docs')));
exports.default = router;
