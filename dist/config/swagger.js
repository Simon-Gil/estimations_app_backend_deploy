"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
// Opciones de documentación Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Estimation Tool API',
            version: '1.0.0',
            description: 'API for managing estimations and related data'
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: [
        path_1.default.resolve(__dirname, '../routes/**/*.js'),
        path_1.default.resolve(__dirname, '../modules/**/*.js')
    ],
};
const swaggerSpecs = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpecs;
