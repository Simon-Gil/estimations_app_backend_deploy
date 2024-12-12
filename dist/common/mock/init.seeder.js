"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_extension_1 = require("typeorm-extension");
const seeder_1 = require("./seeder");
class InitSeeder {
    async run(dataSource, factoryManager) {
        await (0, typeorm_extension_1.runSeeders)(dataSource, {
            seeds: [seeder_1.MockSeeder],
        });
    }
}
exports.default = InitSeeder;
