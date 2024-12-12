"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMockSeeders = runMockSeeders;
const init_seeder_1 = __importDefault(require("./init.seeder"));
// Función para ejecutar los seeders de config inicial de la base de datos
async function runMockSeeders(dataSource) {
    try {
        console.log('Conexión a la base de datos establecida.');
        const initSeeder = new init_seeder_1.default();
        await initSeeder.run(dataSource);
        console.log('Mock seeder ejecutado con éxito.');
    }
    catch (error) {
        console.error('Error al ejecutar los seeders:', error);
    }
}
