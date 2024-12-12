"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Typology = void 0;
const typology_entity_1 = require("./typology.entity");
class Typology extends typology_entity_1.TypologyEntity {
    constructor(name) {
        super();
        this.name = name;
    }
}
exports.Typology = Typology;
