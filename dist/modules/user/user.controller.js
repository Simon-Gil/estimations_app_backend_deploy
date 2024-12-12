"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dtos/create-user.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class UserController {
    async createUser(req, res, next) {
        try {
            const userDto = (0, class_transformer_1.plainToInstance)(create_user_dto_1.CreateUserDto, req.body);
            const errors = await (0, class_validator_1.validate)(userDto);
            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }
            const newUser = await user_service_1.userService.createUser(userDto);
            console.log(JSON.stringify(newUser));
            res.status(201).json({ message: 'User created succesfully', user: newUser });
        }
        catch (err) {
            next(err);
        }
    }
    async getFilteredUsers(req, res, next) {
        try {
            const departmentIds = req.query.departments ? req.query.departments.split(',') : [];
            const gradeIds = req.query.grades ? req.query.grades.split(',') : [];
            const users = await user_service_1.userService.getFilteredUsers(departmentIds, gradeIds);
            res.status(200).json(users);
        }
        catch (err) {
            next(err);
        }
    }
    async updateUser(req, res, next) {
        try {
            const userId = req.params.id;
            const userData = req.body;
            const updatedUser = await user_service_1.userService.updateUser(userId, userData);
            res.status(200).json(updatedUser);
        }
        catch (error) {
            next(error);
        }
    }
    async setUserBlock(req, res, next) {
        try {
            const blocked = req.body.block;
            const userId = req.params.id;
            const user = await user_service_1.userService.setUserBlock(blocked, userId);
            res.status(200).json(user);
        }
        catch (err) {
            next(err);
        }
    }
    async getCurrentUser(req, res, next) {
        try {
            const user = await user_service_1.userService.getCurrentUserWithPermissions(req.user.id);
            res.status(200).json(user);
        }
        catch (err) {
            next(err);
        }
    }
    async getUsers(req, res, next) {
        try {
            const offset = typeof req.query.offset === 'string' ? req.query.offset : undefined;
            const limit = typeof req.query.limit === 'string' ? req.query.limit : undefined;
            const users = await user_service_1.userService.getUsers(offset, limit);
            res.status(200).json(users);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.userController = new UserController();
