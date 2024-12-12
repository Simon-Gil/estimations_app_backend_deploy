"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const database_config_1 = __importDefault(require("./config/database.config"));
const index_1 = __importDefault(require("./routes/index"));
const errorHandler_middleware_1 = require("./common/middlewares/errorHandler.middleware");
const run_seeder_1 = require("./config/seeders/run-seeder");
const run_seeder_2 = require("./common/mock/run-seeder");
// Argumentos de ejecución
const args = process.argv.slice(2);
//Carga de variables de entorno 
dotenv.config({ path: ".env" });
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.dev";
dotenv.config({ path: envFile });
const PORT = process.env.PORT;
// Instancia de app
const app = (0, express_1.default)();
// Middlewares
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Rate limiting 
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000,
    max: 200,
    message: "Demasiadas solicitudes, por favor intentelo más tarde.",
});
app.use(limiter);
// Ruta raiz de la API
app.use('/api', index_1.default);
app.use(errorHandler_middleware_1.errorHandler);
// Inserta datos iniciales de la aplicación
async function runSeed() {
    await database_config_1.default.initialize();
    console.log('Ejecutando seeders iniciales...');
    await (0, run_seeder_1.runInitSeeders)(database_config_1.default);
    await database_config_1.default.destroy();
}
// Inserta datos de ejemplo
async function runMock() {
    await database_config_1.default.initialize();
    console.log('Ejecutando seeders de mock...');
    await (0, run_seeder_2.runMockSeeders)(database_config_1.default);
    await database_config_1.default.destroy();
}
// Inicia el servidor
async function startServer() {
    try {
        await database_config_1.default.initialize();
        console.log('Conexión a la base de datos establecida');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
}
// Función principal de ejecución de la aplicación
async function launchApp() {
    // Evaluar parámetros de ejecución
    const seeder = args.find(arg => arg.startsWith('--seed'));
    const mock = args.find(arg => arg.startsWith('--mock'));
    if (seeder || mock) {
        if (seeder) {
            await runSeed();
        }
        if (mock) {
            await runMock();
        }
    }
    else {
        startServer();
    }
}
launchApp();
