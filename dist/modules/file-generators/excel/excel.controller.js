"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excelController = void 0;
const estimation_service_1 = require("../../estimations/estimation.service");
const excel_utility_1 = require("./excel.utility");
class ExcelController {
    async downloadExcel(req, res, next) {
        try {
            const estimationId = req.params.id;
            const data = await estimation_service_1.estimationService.getEstimationDetail(estimationId, req.user);
            const excelUtility = new excel_utility_1.ExcelUtility();
            const workbook = await excelUtility.generateExcel(data);
            const opportunityName = data.opportunity.name;
            workbook.writeToBuffer().then((buffer) => {
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', `attachment; filename=${opportunityName}.xlsx`);
                res.send(buffer);
            }).catch((err) => {
                next(err);
            });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.excelController = new ExcelController();
