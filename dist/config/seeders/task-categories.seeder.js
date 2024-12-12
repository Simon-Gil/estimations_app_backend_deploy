"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCategoriesSeeder = void 0;
const first_level_category_entity_1 = require("../../modules/company-structure/task-categories/first-level-category/first-level-category.entity");
const SecondLevelCategory_1 = require("../../modules/company-structure/task-categories/second-level-category/SecondLevelCategory");
const second_level_category_entity_1 = require("../../modules/company-structure/task-categories/second-level-category/second-level-category.entity");
const FirstLevelCategory_1 = require("../../modules/company-structure/task-categories/first-level-category/FirstLevelCategory");
// Seeder para la estructura básica de categorías
class TaskCategoriesSeeder {
    async run(dataSource, factoryManager) {
        const firstLevelRepository = dataSource.getRepository(first_level_category_entity_1.FirstLevelCategoryEntity);
        const secondLevelRepository = dataSource.getRepository(second_level_category_entity_1.SecondLevelCategoryEntity);
        // Categorías de primer nivel
        const analisis = new FirstLevelCategory_1.FirstLevelCategory('Análisis');
        const desarrollo = new FirstLevelCategory_1.FirstLevelCategory('Desarrollo');
        const gestiones = new FirstLevelCategory_1.FirstLevelCategory('Gestiones');
        // Categorías de segundo nivel
        const analisis_second = new SecondLevelCategory_1.SecondLevelCategory('Análisis', analisis);
        const evaluacion = new SecondLevelCategory_1.SecondLevelCategory('Evaluación', desarrollo);
        const sintesis = new SecondLevelCategory_1.SecondLevelCategory('Síntesis', desarrollo);
        const frontend = new SecondLevelCategory_1.SecondLevelCategory('Frontend', desarrollo);
        const arquitectura = new SecondLevelCategory_1.SecondLevelCategory('Arquitectura', desarrollo);
        const wireframes = new SecondLevelCategory_1.SecondLevelCategory('Wireframes', desarrollo);
        const hf = new SecondLevelCategory_1.SecondLevelCategory('HF', desarrollo);
        const assets = new SecondLevelCategory_1.SecondLevelCategory('Assets', desarrollo);
        const ajustes = new SecondLevelCategory_1.SecondLevelCategory('Ajustes', desarrollo);
        const despliegue = new SecondLevelCategory_1.SecondLevelCategory('Despliegue', gestiones);
        const direccion = new SecondLevelCategory_1.SecondLevelCategory('Dirección', gestiones);
        const reuCliente = new SecondLevelCategory_1.SecondLevelCategory('ReuCliente', gestiones);
        const reuInterna = new SecondLevelCategory_1.SecondLevelCategory('ReuInterna', gestiones);
        const material = new SecondLevelCategory_1.SecondLevelCategory('Material', gestiones);
        await firstLevelRepository.upsert([
            analisis, desarrollo, gestiones
        ], ['name']);
        await secondLevelRepository.upsert([
            analisis_second, evaluacion, sintesis, frontend, arquitectura, wireframes, hf,
            assets, ajustes, despliegue, direccion, reuCliente, reuInterna, material
        ], ['name']);
        console.log('Datos seed de Categorías introducidos');
    }
}
exports.TaskCategoriesSeeder = TaskCategoriesSeeder;
