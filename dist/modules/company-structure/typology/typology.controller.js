"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typologyController = void 0;
const typology_service_1 = require("./typology.service");
class TypologyController {
    async getAllTypologies(req, res, next) {
        try {
            const typologies = await typology_service_1.typologyService.getTypologies();
            res.status(200).json(typologies);
        }
        catch (err) {
            next(err);
        }
    }
    async createTypology(req, res, next) {
        try {
            const name = req.body.name;
            const typology = await typology_service_1.typologyService.createTypology(name);
            res.status(200).json(typology);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.typologyController = new TypologyController();
