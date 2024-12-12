"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelUtility = void 0;
const profile_service_1 = require("../../company-structure/profile/profile.service");
const xl = require('excel4node');
/**
 * Clase que proporciona funcionalidades para generar un documento Excel basado en un detalle de estimación de tareas.
 * Esta clase permite la creación de hojas de trabajo con información estructurada sobre tareas, categorías,
 * subcategorías, perfiles, y totales de estimaciones.
 */
class ExcelUtility {
    /**
    * Genera un documento xlsx a partir de los datos de una estimación.
    *
    * @param data Datos de la estimación que incluyen categorías, subcategorías y tareas.
    * @returns  Objeto de tipo `Workbook` que representa el archivo Excel generado.
    */
    async generateExcel(data) {
        const workbook = new xl.Workbook();
        const worksheet = workbook.addWorksheet('Proyectos');
        const profiles = await profile_service_1.profileService.getAllProfiles();
        // Función para definir estilos
        const styles = this.defineStyles(workbook);
        let currentRow = 1;
        // Añadimos encabezados
        this.addHeaders(worksheet, profiles, styles, currentRow);
        currentRow = 3;
        // Procesamos el desglose de categorías, tareas y perfiles 
        currentRow = this.processBreakdown(data.firstLevelCategories, worksheet, profiles, styles, currentRow);
        // Procesamos los sumatorios totales
        await this.processTotals(worksheet, data, styles, profiles);
        // Ajuste de alto y ancho de columnas
        this.adjustColumnWidths(worksheet, profiles);
        this.setRowHeights(worksheet, currentRow);
        return workbook;
    }
    /**
     * Define los estilos para las celdas del archivo Excel.
     *
     * @param workbook Objeto `Workbook` donde se van a crear los estilos.
     * @returns Object Contiene los estilos que serán aplicados a las celdas del Excel.
     */
    defineStyles(workbook) {
        return {
            totalsHeaders: workbook.createStyle({
                font: { bold: true, size: 18 },
                fill: { type: 'pattern', patternType: 'solid', fgColor: '#DA1184' },
                alignment: { horizontal: 'center', vertical: 'center' },
                border: { left: { style: 'thin', color: 'black' }, right: { style: 'thin', color: 'black' }, top: { style: 'thin', color: 'black' }, bottom: { style: 'thin', color: 'black' } }
            }),
            headerStyle: workbook.createStyle({
                font: { bold: true },
                fill: { type: 'pattern', patternType: 'solid', fgColor: '#f7eadc' },
                alignment: { horizontal: 'center', vertical: 'center' },
                border: { left: { style: 'thin', color: 'black' }, right: { style: 'thin', color: 'black' }, top: { style: 'thin', color: 'black' }, bottom: { style: 'thin', color: 'black' } }
            }),
            categoryStyle: workbook.createStyle({
                font: { bold: true, color: '#000000' },
                fill: { type: 'pattern', patternType: 'solid', fgColor: '#EBEBEB' },
                alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
                border: { left: { style: 'thin', color: 'black' }, right: { style: 'thin', color: 'black' }, top: { style: 'thin', color: 'black' }, bottom: { style: 'thin', color: 'black' } }
            }),
            subCategoryStyle: workbook.createStyle({
                font: { bold: true, color: '#000000' },
                fill: { type: 'pattern', patternType: 'solid', fgColor: '#EBEBEB' },
                alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
                border: { left: { style: 'thin', color: 'black' }, right: { style: 'thin', color: 'black' }, top: { style: 'thin', color: 'black' }, bottom: { style: 'thin', color: 'black' } }
            }),
            taskStyle: workbook.createStyle({
                alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
                fill: { type: 'pattern', patternType: 'solid', fgColor: '#EBEBEB' },
                border: { left: { style: 'thin', color: 'black' }, right: { style: 'thin', color: 'black' }, top: { style: 'thin', color: 'black' }, bottom: { style: 'thin', color: 'black' } }
            }),
            minCostStyle: workbook.createStyle({
                alignment: { horizontal: 'center', vertical: 'center' },
                fill: { type: 'pattern', patternType: 'solid', fgColor: '#e6e6e6' },
                border: { left: { style: 'thin', color: 'black' }, right: { style: 'thin', color: 'black' }, top: { style: 'thin', color: 'black' }, bottom: { style: 'thin', color: 'black' } }
            }),
            maxCostStyle: workbook.createStyle({
                alignment: { horizontal: 'center', vertical: 'center' },
                fill: { type: 'pattern', patternType: 'solid', fgColor: '#d9d9d9' },
                border: { left: { style: 'thin', color: 'black' }, right: { style: 'thin', color: 'black' }, top: { style: 'thin', color: 'black' }, bottom: { style: 'thin', color: 'black' } }
            }),
            genericDataStyle: workbook.createStyle({
                alignment: { horizontal: 'center', vertical: 'center' },
                fill: { type: 'pattern', patternType: 'solid', fgColor: '#EBEBEB' },
                border: { left: { style: 'thin', color: 'black' }, right: { style: 'thin', color: 'black' }, top: { style: 'thin', color: 'black' }, bottom: { style: 'thin', color: 'black' } }
            }),
            minCostHeaderStyle: workbook.createStyle({
                font: { bold: true },
                alignment: { horizontal: 'center', vertical: 'center' },
                fill: { type: 'pattern', patternType: 'solid', fgColor: '#e6e6e6' },
                border: { left: { style: 'thin', color: 'black' }, right: { style: 'thin', color: 'black' }, top: { style: 'thin', color: 'black' }, bottom: { style: 'thin', color: 'black' } }
            }),
            maxCostHeaderStyle: workbook.createStyle({
                font: { bold: true },
                alignment: { horizontal: 'center', vertical: 'center' },
                fill: { type: 'pattern', patternType: 'solid', fgColor: '#d9d9d9' },
                border: { left: { style: 'thin', color: 'black' }, right: { style: 'thin', color: 'black' }, top: { style: 'thin', color: 'black' }, bottom: { style: 'thin', color: 'black' } }
            }),
            sumHeaders: workbook.createStyle({
                font: { bold: true },
                alignment: { horizontal: 'center', vertical: 'center' },
                fill: { type: 'pattern', patternType: 'solid', fgColor: '#b7c7e5' },
                border: { left: { style: 'thin', color: 'black' }, right: { style: 'thin', color: 'black' }, top: { style: 'thin', color: 'black' }, bottom: { style: 'thin', color: 'black' } }
            }),
            minSumHeader: workbook.createStyle({
                font: { bold: true },
                fill: { type: 'pattern', patternType: 'solid', fgColor: '#e7effe' },
                alignment: { horizontal: 'center', vertical: 'center' },
                border: { left: { style: 'thin', color: 'black' }, right: { style: 'thin', color: 'black' }, top: { style: 'thin', color: 'black' }, bottom: { style: 'thin', color: 'black' } }
            }),
            maxSumHeader: workbook.createStyle({
                font: { bold: true },
                fill: { type: 'pattern', patternType: 'solid', fgColor: '#d7e1f2' },
                alignment: { horizontal: 'center', vertical: 'center' },
                border: { left: { style: 'thin', color: 'black' }, right: { style: 'thin', color: 'black' }, top: { style: 'thin', color: 'black' }, bottom: { style: 'thin', color: 'black' } }
            }),
            totalMinCostStyle: workbook.createStyle({
                alignment: { horizontal: 'center', vertical: 'center' },
                fill: { type: 'pattern', patternType: 'solid', fgColor: '#e7effe' },
                border: { left: { style: 'thin', color: 'black' }, right: { style: 'thin', color: 'black' }, top: { style: 'thin', color: 'black' }, bottom: { style: 'thin', color: 'black' } }
            }),
            totalMaxCostStyle: workbook.createStyle({
                alignment: { horizontal: 'center', vertical: 'center' },
                fill: { type: 'pattern', patternType: 'solid', fgColor: '#d7e1f2' },
                border: { left: { style: 'thin', color: 'black' }, right: { style: 'thin', color: 'black' }, top: { style: 'thin', color: 'black' }, bottom: { style: 'thin', color: 'black' } }
            }),
            estimationMinCostStyle: workbook.createStyle({
                font: { bold: true },
                alignment: { horizontal: 'center', vertical: 'center' },
                fill: { type: 'pattern', patternType: 'solid', fgColor: '#97c7ff' },
                border: { left: { style: 'thin', color: 'black' }, right: { style: 'thin', color: 'black' }, top: { style: 'thin', color: 'black' }, bottom: { style: 'thin', color: 'black' } }
            }),
            estimationMaxCostStyle: workbook.createStyle({
                font: { bold: true },
                alignment: { horizontal: 'center', vertical: 'center' },
                fill: { type: 'pattern', patternType: 'solid', fgColor: '#4f81bd' },
                border: { left: { style: 'thin', color: 'black' }, right: { style: 'thin', color: 'black' }, top: { style: 'thin', color: 'black' }, bottom: { style: 'thin', color: 'black' } }
            }),
        };
    }
    /**
     * Añade los encabezados a la hoja de cálculo de Excel.
     *
     * @param worksheet Hoja de trabajo donde se añadirán los encabezados.
     * @param profiles Lista de perfiles a agregar a los encabezados.
     * @param styles Estilos definidos previamente para las celdas.
     * @param currentRow Fila actual donde se agregarán los encabezados.
     */
    addHeaders(worksheet, profiles, styles, currentRow) {
        worksheet.cell(currentRow, 1).string('Categoría 1').style(styles.headerStyle);
        worksheet.cell(currentRow, 2).string('Categoría 2').style(styles.headerStyle);
        worksheet.cell(currentRow, 3).string('Descripción de Tareas').style(styles.headerStyle);
        worksheet.cell(currentRow, 1, currentRow + 1, 1, true).style(styles.headerStyle);
        worksheet.cell(currentRow, 2, currentRow + 1, 2, true).style(styles.headerStyle);
        worksheet.cell(currentRow, 3, currentRow + 1, 3, true).style(styles.headerStyle);
        let currentColumn = 4;
        for (const profile of profiles) {
            worksheet.cell(currentRow, currentColumn, currentRow, currentColumn + 1, true)
                .string(profile.name)
                .style(styles.headerStyle);
            worksheet.cell(currentRow + 1, currentColumn).string('Mín.').style(styles.minCostHeaderStyle);
            worksheet.cell(currentRow + 1, currentColumn + 1).string('Máx.').style(styles.maxCostHeaderStyle);
            currentColumn += 2;
        }
    }
    /**
     * Procesa las categorías y subcategorías de la estimación, añadiendo las tareas y los perfiles en el Excel.
     *
     * @param categories Categorías de primer nivel que contienen las subcategorías y tareas.
     * @param worksheet Hoja de trabajo donde se añadirán los datos.
     * @param profiles Lista de perfiles de trabajo.
     * @param styles Estilos definidos para las celdas.
     * @param currentRow Fila actual donde se empezarán a agregar los datos.
     * @returns number La siguiente fila disponible después de procesar el desglose.
     */
    processBreakdown(categories, worksheet, profiles, styles, currentRow) {
        // Agregamos el sumatorio de los perfiles por tarea como un nuevo perfil
        profiles.push({
            name: 'Total tareas',
            hMin: 0,
            hMax: 0,
            isTotal: true
        });
        for (const category of categories) {
            const firstLevelStartRow = currentRow;
            let categoryAdded = false;
            // Procesamiento de subcategorías
            for (const subCategory of category.secondLevelCategories) {
                let rowsForSubCategory = 0;
                // Si hay tareas, la primera se añade en la misma fila que la subcategoría
                if (subCategory.tasks.length > 0) {
                    // Condicional para agregar la categoría solo una vez
                    if (!categoryAdded) {
                        worksheet.cell(currentRow, 1)
                            .string(`${category.name}\n${category.hMin} - ${category.hMax} hrs.`)
                            .style(styles.categoryStyle);
                        worksheet.row(currentRow).setHeight(60);
                        categoryAdded = true;
                    }
                    // Añadimos la subcategoría
                    worksheet.cell(currentRow, 2)
                        .string(`${subCategory.name}\n${subCategory.hMin} - ${subCategory.hMax} hrs.`)
                        .style(styles.subCategoryStyle);
                    worksheet.row(currentRow).setHeight(60);
                    // Calculamos totales de categorías
                    subCategory.tasks.forEach((task) => {
                        task.hMin = task.hrsTaskProfiles.reduce((sum, profile) => sum + (profile.hMin || 0), 0);
                        task.hMax = task.hrsTaskProfiles.reduce((sum, profile) => sum + (profile.hMax || 0), 0);
                    });
                    // Añadir la primera tarea
                    const firstTask = subCategory.tasks[0]; // Obtener la primera tarea
                    worksheet.cell(currentRow, 3).string(firstTask.description).style(styles.taskStyle);
                    // Añadir los valores min y max para cada perfil
                    let profileColumn = 4;
                    let accMax = 0;
                    let accMin = 0;
                    for (const profile of profiles) {
                        if (!profile.isTotal) {
                            const profileData = firstTask.hrsTaskProfiles.find((p) => p.profile.name === profile.name);
                            const minValue = profileData ? Math.round(profileData.hMin) : 0;
                            const maxValue = profileData ? Math.round(profileData.hMax) : 0;
                            accMax += maxValue;
                            accMin += minValue;
                            worksheet.cell(currentRow, profileColumn).string(`${minValue ? minValue : 0}`).style(styles.minCostStyle);
                            worksheet.cell(currentRow, profileColumn + 1).string(`${maxValue ? maxValue : 0}`).style(styles.maxCostStyle);
                        }
                        else {
                            worksheet.cell(currentRow, profileColumn).string(`${accMin ? accMin : 0}`).style(styles.totalMinCostStyle);
                            worksheet.cell(currentRow, profileColumn + 1).string(`${accMax ? accMax : 0}`).style(styles.totalMaxCostStyle);
                        }
                        profileColumn += 2;
                    }
                    rowsForSubCategory++;
                    currentRow++;
                    // Agregamos  el resto de tareas
                    for (let i = 1; i < subCategory.tasks.length; i++) {
                        const task = subCategory.tasks[i];
                        worksheet.cell(currentRow, 2)
                            .string('')
                            .style(styles.subCategoryStyle);
                        worksheet.cell(currentRow, 3).string(task.description).style(styles.taskStyle);
                        let profileColumn = 4;
                        accMax = 0;
                        accMin = 0;
                        for (const profile of profiles) {
                            if (!profile.isTotal) {
                                const profileData = task.hrsTaskProfiles.find((p) => p.profile.name === profile.name);
                                const minValue = profileData ? Math.round(profileData.hMin) : 0;
                                const maxValue = profileData ? Math.round(profileData.hMax) : 0;
                                accMax += maxValue;
                                accMin += minValue;
                                worksheet.cell(currentRow, profileColumn).string(`${minValue ? minValue : 0}`).style(styles.minCostStyle);
                                worksheet.cell(currentRow, profileColumn + 1).string(`${maxValue ? maxValue : 0}`).style(styles.maxCostStyle);
                            }
                            else {
                                worksheet.cell(currentRow, profileColumn).string(`${accMin ? accMin : 0}`).style(styles.totalMinCostStyle);
                                worksheet.cell(currentRow, profileColumn + 1).string(`${accMax ? accMax : 0}`).style(styles.totalMaxCostStyle);
                            }
                            profileColumn += 2;
                        }
                        subCategory.tasks.forEach((task) => (console.log(`Tarea: ${task.description}. HMIN:${task.hMin}. HMAX:${task.hMax}`)));
                        rowsForSubCategory++;
                        currentRow++;
                    }
                    // Fusionamos celdas de la subcategoria
                    worksheet.cell(currentRow - rowsForSubCategory, 2, currentRow - 1, 2, true);
                }
            }
            // Fusionamos celdas de la categoría de nivel 1
            if (categoryAdded) {
                worksheet.cell(firstLevelStartRow, 1, currentRow - 1, 1, true);
            }
        }
        return currentRow;
    }
    /**
     * Ajusta el ancho de las columnas en la hoja de trabajo.
     *
     * @param worksheet Hoja de trabajo donde se ajustarán las columnas.
     * @param profiles Lista de perfiles a los que se les ajustarán las columnas.
     */
    adjustColumnWidths(worksheet, profiles) {
        worksheet.column(1).setWidth(30);
        worksheet.column(2).setWidth(30);
        worksheet.column(3).setWidth(50);
        let currentColumn = 4; // Empezamos en la columna 4
        for (const profile of profiles) {
            worksheet.column(currentColumn).setWidth(10);
            worksheet.column(currentColumn + 1).setWidth(10);
            currentColumn += 2; // Avanzar 2 columnas para el siguiente perfil
        }
    }
    /**
     * Ajusta la altura de las filas en la hoja de trabajo.
     *
     * @param worksheet Hoja de trabajo donde se ajustarán las alturas de las filas.
     * @param currentRow Fila hasta la que se debe ajustar la altura.
     */
    setRowHeights(worksheet, currentRow) {
        for (let i = 1; i < currentRow + 1; i++) {
            worksheet.row(i).setHeight(35);
        }
    }
    /**
     * Obtiene todas las tareas de todas las categorías y subcategorías.
     *
     * @param data Datos de la estimación con categorías, subcategorías y tareas.
     * @returns any[] Lista de todas las tareas de las categorías y subcategorías.
     */
    getAllTasks(data) {
        let allTasks = [];
        for (const firstLevelCategory of data.firstLevelCategories) {
            for (const secondLevelCategory of firstLevelCategory.secondLevelCategories) {
                allTasks.push(...secondLevelCategory.tasks);
            }
        }
        return allTasks;
    }
    /**
     * Obtiene los totales de horas mínimas y máximas para cada perfil.
     *
     * @param tasks Lista de tareas para las cuales se calcularán los totales.
     * @param allProfiles Lista de todos los perfiles disponibles.
     * @param orderOfProfiles Orden personalizado para los perfiles.
     * @returns Promise<any[]> Lista de perfiles con los totales de horas mínimas y máximas.
     */
    async getProfilesWithTotals(tasks, allProfiles, orderOfProfiles) {
        const profilesTotals = {};
        // Iteramos sobre las tareas y sus perfiles para obtener los totales
        for (const task of tasks) {
            for (const hrsTaskProfile of task.hrsTaskProfiles) {
                const profileName = hrsTaskProfile.profile.name;
                const hMin = Number(hrsTaskProfile.hMin);
                const hMax = Number(hrsTaskProfile.hMax);
                // Si el perfil ya existe se suman los valores
                if (profilesTotals[profileName]) {
                    profilesTotals[profileName].totalHMin += hMin;
                    profilesTotals[profileName].totalHMax += hMax;
                }
                else {
                    // Si el perfil no existe, lo creamos y asignamos los valores
                    profilesTotals[profileName] = { totalHMin: hMin, totalHMax: hMax };
                }
            }
        }
        // Si un perfil no está incluido en las tareas, se agrega
        for (const profile of allProfiles) {
            if (!profilesTotals[profile.name]) {
                profilesTotals[profile.name] = { totalHMin: 0, totalHMax: 0 }; // Inicializar con 0
            }
        }
        // Convertimos el objeto en un array con su sumatorio
        const profilesWithTotals = Object.keys(profilesTotals).map(profileName => ({
            profileName,
            hMin: profilesTotals[profileName].totalHMin,
            hMax: profilesTotals[profileName].totalHMax
        }));
        // Ordenamos el array
        profilesWithTotals.sort((a, b) => {
            const indexA = orderOfProfiles.indexOf(a.profileName);
            const indexB = orderOfProfiles.indexOf(b.profileName);
            if (indexA === -1)
                return 1;
            if (indexB === -1)
                return -1;
            return indexA - indexB;
        });
        return profilesWithTotals;
    }
    /**
     * Procesa y añade los totales de los perfiles y la estimación al Excel.
     *
     * @param worksheet Hoja de trabajo donde se agregarán los totales.
     * @param data Datos de la estimación con los totales a agregar.
     * @param styles Estilos definidos para las celdas.
     * @param allProfiles Lista de perfiles disponibles.
     */
    async processTotals(worksheet, data, styles, allProfiles) {
        // Obtenemos las tareas y los perfiles ordenados
        const tasks = this.getAllTasks(data);
        const profiles = await this.getProfilesWithTotals(tasks, allProfiles, ['Dirección', 'Front', 'Back', 'Research', 'Interfaces', 'Total tareas']);
        let currentRow = tasks.length + 3;
        let currentColumn = 4;
        // Agregamos los totales de los perfiles
        for (const profile of profiles) {
            if ((profile.profileName !== 'Total tareas')) {
                worksheet.cell(currentRow, currentColumn).number(profile.hMin).style(styles.totalMinCostStyle);
                currentColumn++;
                worksheet.cell(currentRow, currentColumn).number(profile.hMax).style(styles.totalMaxCostStyle);
                currentColumn++;
            }
            else {
                // Agregamos los totales de la estimación
                worksheet.cell(currentRow, currentColumn).number(data.hMin).style(styles.estimationMinCostStyle);
                ;
                currentColumn++;
                worksheet.cell(currentRow, currentColumn).number(data.hMax).style(styles.estimationMaxCostStyle);
            }
        }
        // Sumatorio por perfil header
        worksheet.cell(currentRow, 1, currentRow, 3, true).string('Sumatorio por perfil').style(styles.sumHeaders);
        // Sumatorio por tareas header
        worksheet.cell(1, 14, 1, 15, true).string('Sumatorio tareas').style(styles.sumHeaders);
        worksheet.cell(2, 14).string('Mín.').style(styles.minSumHeader);
        worksheet.cell(2, 15).string('Máx.').style(styles.maxSumHeader);
    }
}
exports.ExcelUtility = ExcelUtility;
