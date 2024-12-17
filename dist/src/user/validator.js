"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const enum_1 = require("../utils/enum");
class UserValidator {
    fetchUserData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                userId: joi_1.default.string().required().messages({
                    "any.required": "User id is required",
                }),
            });
            const { error } = schema.validate(req.body);
            if (!error) {
                return next();
            }
            else {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: error.details[0].message,
                    data: null,
                });
            }
        });
    }
    updateUserData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                firstName: joi_1.default.string().required().messages({
                    "string.base": "Firstname must be text",
                    "any.required": "Firstname is required.",
                }),
                lastName: joi_1.default.string().required().messages({
                    "string.base": "Lastname must be text",
                    "any.required": "Lastname is required.",
                }),
                profileImageUrl: joi_1.default.string()
                    .trim()
                    .allow("")
                    .custom((value, helpers) => {
                    if (value) {
                        const regex = /^https?:\/\/(?:www\.)?.+\.(?:jpe?g|png|gif|bmp)$/i;
                        if (!regex.test(value)) {
                            return helpers.message({ custom: "Invalid image URL format" });
                        }
                    }
                    return value;
                })
                    .messages({
                    "string.base": "Image URL must be text",
                    "string.empty": "Image URL cannot be empty",
                }),
                phoneNumber: joi_1.default.string().length(11).required().messages({
                    "string.base": "Phone Number must be text",
                    "any.required": "Phone Number is required.",
                    "string.length": "Phone must be exactly 11 characters long",
                }),
                region: joi_1.default.string().required().messages({
                    "string.base": "Region must be text",
                    "any.required": "Region is required.",
                }),
            });
            const { error } = schema.validate(req.body);
            if (!error) {
                return next();
            }
            else {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: error.details[0].message,
                    data: null,
                });
            }
        });
    }
    changeUserPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                oldPassword: joi_1.default.string().required().messages({
                    "any.required": "Old password is required.",
                }),
                newPassword: joi_1.default.string()
                    .min(8)
                    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
                    .required()
                    .messages({
                    "any.required": "New password is required.",
                    "string.min": "New password must be at least 8 characters long",
                    "string.pattern.base": "New password must contain at least one uppercase letter, one lowercase letter, and one number",
                }),
                confirmNewPassword: joi_1.default.string()
                    .valid(joi_1.default.ref("newPassword"))
                    .required()
                    .messages({
                    "any.required": "Confirm new password is required.",
                    "any.only": "Passwords do not match",
                }),
            });
            const { error } = schema.validate(req.body);
            if (!error) {
                return next();
            }
            else {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: error.details[0].message,
                    data: null,
                });
            }
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                password: joi_1.default.string().required().messages({
                    "any.required": "Password is required.",
                }),
            });
            const { error } = schema.validate(req.body);
            if (!error) {
                return next();
            }
            else {
                console.log(error);
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: error.details[0].message,
                    data: null,
                });
            }
        });
    }
}
exports.userValidator = new UserValidator();
