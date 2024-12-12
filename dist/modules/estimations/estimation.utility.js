"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimationUtility = exports.EstimationUtility = void 0;
const class_transformer_1 = require("class-transformer");
const estimation_detail_dto_1 = require("./dtos/estimation-detail.dto");
const first_level_category_repository_1 = require("../company-structure/task-categories/first-level-category/first-level-category.repository");
const hrs_task_profile_dto_1 = require("./task/hrs-task-profile/hrs-task-profile.dto");
const task_dto_1 = require("./task/dtos/task.dto");
const first_level_category_dto_1 = require("../company-structure/task-categories/first-level-category/first-level-category.dto");
const second_level_category_dto_1 = require("../company-structure/task-categories/second-level-category/second-level-category.dto");
const task_service_1 = require("./task/task.service");
class EstimationUtility {
    /**
     * Procesa una estimación y calcula los costes basados en los perfiles de precio.
     * Dependiendo del valor de `calculated`, esta función puede simplemente procesar los datos o realizar los cálculos.
     *
     * @param estimation - La estimación que se debe procesar.
     * @param calculated - Un valor booleano que indica si se deben realizar cálculos. Si es `false`, solo se procesan los datos sin calcular.
     * @returns Una instancia de `FinalEstimationDTO` que contiene la estimación procesada y calculada.
     *
     * @throws Error si no se encuentran las categorías de primer o segundo nivel asociadas a las tareas.
     */
    async processEstimation(estimation, calculated) {
        const processedEstimation = (0, class_transformer_1.plainToInstance)(estimation_detail_dto_1.EstimationDetailDTO, estimation);
        processedEstimation.minCost = 0;
        processedEstimation.maxCost = 0;
        const firstLevelCategories = await first_level_category_repository_1.firstLevelCatRepo.find({ relations: ['secondLevelCategories'] });
        const firstLevelCategoriesMap = new Map();
        // Inicializamos profilePrices
        let profilePrices;
        // Si calculated es true creamos el mapa de precios
        const profilePricesMap = new Map();
        if (calculated) {
            profilePrices = estimation.proposal.opportunity.account.priceConfig.profilePrices;
            profilePrices.forEach(profilePrice => {
                profilePricesMap.set(profilePrice.profileId, profilePrice);
            });
        }
        // Inicializar categorías de primer y segundo nivel
        for (const category of firstLevelCategories) {
            const firstLevelCategory = (0, class_transformer_1.plainToInstance)(first_level_category_dto_1.FirstLevelCategoryDTO, category);
            firstLevelCategory.minCost = 0;
            firstLevelCategory.maxCost = 0;
            firstLevelCategory.secondLevelCategories = [];
            firstLevelCategoriesMap.set(firstLevelCategory.id, firstLevelCategory);
            for (const secondLevelCategory of category.secondLevelCategories) {
                const finalSecondLevelCategory = (0, class_transformer_1.plainToInstance)(second_level_category_dto_1.SecondLevelCategoryDTO, secondLevelCategory);
                finalSecondLevelCategory.minCost = 0;
                finalSecondLevelCategory.maxCost = 0;
                finalSecondLevelCategory.tasks = [];
                firstLevelCategory.secondLevelCategories.push(finalSecondLevelCategory);
            }
        }
        for (const task of estimation.tasks) {
            const finalTask = (0, class_transformer_1.plainToInstance)(task_dto_1.TaskDTO, task);
            finalTask.minCost = 0;
            finalTask.maxCost = 0;
            finalTask.hMax = 0;
            finalTask.hMin = 0;
            finalTask.hrsTaskProfiles = [];
            // Procesar perfiles de horas y agregar `hrsTaskProfiles` siempre
            if (task.hrsTaskProfiles) {
                for (const hrsTaskProfile of task.hrsTaskProfiles) {
                    const finalHrsTaskProfile = (0, class_transformer_1.plainToInstance)(hrs_task_profile_dto_1.HrsTaskProfileDTO, hrsTaskProfile);
                    const profilePrice = profilePricesMap.get(hrsTaskProfile.profileId);
                    if (profilePrice) {
                        //Calcular costes solo si calculated es verdadero
                        if (calculated) {
                            finalHrsTaskProfile.minCost = hrsTaskProfile.hMin * profilePrice.priceH;
                            finalHrsTaskProfile.maxCost = hrsTaskProfile.hMax * profilePrice.priceH;
                            finalTask.minCost += finalHrsTaskProfile.minCost;
                            finalTask.maxCost += finalHrsTaskProfile.maxCost;
                        }
                        // Calcular Hrs
                        finalTask.hMin += Number(finalHrsTaskProfile.hMin);
                        finalTask.hMax += Number(finalHrsTaskProfile.hMax);
                    }
                    // Agregar `finalHrsTaskProfile` independientemente de `calculated`
                    finalTask.hrsTaskProfiles.push(finalHrsTaskProfile);
                }
            }
            const secondLevelCategoryId = task.secondLevelCategory?.id;
            if (!secondLevelCategoryId) {
                console.log(`La tarea ${task.id} no tiene una categoría de segundo nivel válida.`);
                continue;
            }
            const firstLevelCategory = firstLevelCategoriesMap.get(task.secondLevelCategory.firstLevelCategory.id);
            if (!firstLevelCategory) {
                console.log(`No se encontró la categoría de primer nivel para la tarea ${task.id}.`);
                continue;
            }
            const secondLevelCategory = firstLevelCategory.secondLevelCategories.find((slCategory) => slCategory.id === secondLevelCategoryId);
            if (!secondLevelCategory) {
                console.log(`No se encontró la categoría de segundo nivel para la tarea ${task.id}.`);
                continue;
            }
            secondLevelCategory.tasks.push(finalTask);
            // Inicializamos hMin y hMax de secondLevelCategory si no lo están
            if (!secondLevelCategory.hMin || !secondLevelCategory.hMax) {
                secondLevelCategory.hMin = 0;
                secondLevelCategory.hMax = 0;
            }
            // Inicializamos hMin y hMax de fistLevelCategory si no lo están
            if (!firstLevelCategory.hMin || !firstLevelCategory.hMax) {
                firstLevelCategory.hMin = 0;
                firstLevelCategory.hMax = 0;
            }
            // Calculo de horas para secondLevelCategory y firstLevelCategory
            secondLevelCategory.hMin += Number(finalTask.hMin);
            secondLevelCategory.hMax += Number(finalTask.hMax);
            firstLevelCategory.hMax += Number(finalTask.hMax);
            firstLevelCategory.hMin += Number(finalTask.hMin);
            // Si shouldCalculate, se calculan los costes
            if (calculated) {
                secondLevelCategory.minCost += finalTask.minCost;
                secondLevelCategory.maxCost += finalTask.maxCost;
                firstLevelCategory.minCost += finalTask.minCost;
                firstLevelCategory.maxCost += finalTask.maxCost;
            }
        }
        processedEstimation.firstLevelCategories = Array.from(firstLevelCategoriesMap.values());
        processedEstimation.hMin = 0;
        processedEstimation.hMax = 0;
        processedEstimation.hMin = Array.from(firstLevelCategoriesMap.values()).reduce((acc, category) => acc + (category.hMin || 0), 0);
        processedEstimation.hMax = Array.from(firstLevelCategoriesMap.values()).reduce((acc, category) => acc + (category.hMax || 0), 0);
        if (calculated) {
            processedEstimation.minCost = Array.from(firstLevelCategoriesMap.values()).reduce((acc, category) => acc + category.minCost, 0);
            processedEstimation.maxCost = Array.from(firstLevelCategoriesMap.values()).reduce((acc, category) => acc + category.maxCost, 0);
        }
        return processedEstimation;
    }
    /**
    * Calcula y devuelve los detalles de una tarea específica, incluyendo el coste de las horas de los perfiles asociados.
    * Utiliza los precios de los perfiles relacionados con la tarea para calcular los costes.
    *
    * @param taskId - El ID de la tarea que se desea calcular.
    * @returns Una instancia de `TaskDTO` que contiene los detalles de la tarea calculados, incluidos los costes de las horas.
    */
    async calculateTask(taskId) {
        const taskWithPrices = await task_service_1.taskService.getById(taskId, ['estimation.proposal.opportunity.account.priceConfig.profilePrices']);
        const task = await task_service_1.taskService.getById(taskId, ['hrsTaskProfiles.profile']);
        const profilePrices = taskWithPrices.estimation.proposal.opportunity.account.priceConfig.profilePrices;
        const profilePricesMap = new Map();
        profilePrices.forEach(profilePrice => {
            profilePricesMap.set(profilePrice.profileId, profilePrice);
        });
        const finalTask = (0, class_transformer_1.plainToInstance)(task_dto_1.TaskDTO, task);
        finalTask.hMax = 0;
        finalTask.hMin = 0;
        finalTask.maxCost = 0;
        finalTask.minCost = 0;
        // Calculamos los hrsTaskProfiles
        if (task.hrsTaskProfiles) {
            for (const hrsTaskProfile of task.hrsTaskProfiles) {
                const finalHrsTaskProfile = (0, class_transformer_1.plainToInstance)(hrs_task_profile_dto_1.HrsTaskProfileDTO, hrsTaskProfile);
                const profilePrice = profilePricesMap.get(hrsTaskProfile.profileId);
                if (profilePrice) {
                    finalHrsTaskProfile.minCost = hrsTaskProfile.hMin * profilePrice.priceH;
                    finalHrsTaskProfile.maxCost = hrsTaskProfile.hMax * profilePrice.priceH;
                    finalTask.minCost += finalHrsTaskProfile.minCost;
                    finalTask.maxCost += finalHrsTaskProfile.maxCost;
                    finalTask.hMin += Number(finalHrsTaskProfile.hMin);
                    finalTask.hMax += Number(finalHrsTaskProfile.hMax);
                }
                finalTask.hrsTaskProfiles = finalTask.hrsTaskProfiles.filter(hrsTaskProfile => hrsTaskProfile.profile.name !== finalHrsTaskProfile.profile.name);
                finalTask.hrsTaskProfiles.push(finalHrsTaskProfile);
            }
        }
        return finalTask;
    }
}
exports.EstimationUtility = EstimationUtility;
exports.estimationUtility = new EstimationUtility();
