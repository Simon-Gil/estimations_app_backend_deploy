"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstimationUserEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./../../user/user.entity");
const estimation_entity_1 = require("./../estimation.entity");
let EstimationUserEntity = class EstimationUserEntity {
};
exports.EstimationUserEntity = EstimationUserEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'user_id' }),
    __metadata("design:type", String)
], EstimationUserEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'estimation_id' }),
    __metadata("design:type", String)
], EstimationUserEntity.prototype, "estimationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.estimationUsers),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], EstimationUserEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => estimation_entity_1.EstimationEntity, (estimation) => estimation.estimationUsers, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'estimation_id' }),
    __metadata("design:type", estimation_entity_1.EstimationEntity)
], EstimationUserEntity.prototype, "estimation", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], EstimationUserEntity.prototype, "finished", void 0);
exports.EstimationUserEntity = EstimationUserEntity = __decorate([
    (0, typeorm_1.Entity)('estimation_users')
], EstimationUserEntity);
