"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceConfigController = void 0;
const price_config_service_1 = require("./price-config.service");
const AppError_1 = require("../../../common/utils/AppError");
class PriceConfigController {
    async createPriceConfig(req, res, next) {
        try {
            const accountId = req.params.id;
            const profilePrices = req.body.profilePrices;
            if (!profilePrices || profilePrices.length < 1) {
                throw new AppError_1.AppError('No se han recibido los precios por perfil', 400);
            }
            const priceConfig = await price_config_service_1.priceConfigService.createPriceConfig(accountId, profilePrices);
            res.status(200).json(priceConfig);
        }
        catch (err) {
            next(err);
        }
    }
    async updatePriceConfig(req, res, next) {
        try {
            const priceConfigId = req.params.id;
            const profilePrices = req.body.profilePrices;
            if (!profilePrices || profilePrices.length < 1) {
                throw new AppError_1.AppError('No se han recibido los precios por perfil', 400);
            }
            const priceConfig = await price_config_service_1.priceConfigService.updatePriceConfig(priceConfigId, profilePrices, req.user);
            res.status(200).json(priceConfig);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.priceConfigController = new PriceConfigController();
