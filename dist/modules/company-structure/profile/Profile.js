"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const profile_entity_1 = require("./profile.entity");
class Profile extends profile_entity_1.ProfileEntity {
    constructor(name) {
        super();
        this.name = name;
    }
}
exports.Profile = Profile;
