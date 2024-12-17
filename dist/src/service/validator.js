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
exports.serviceValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const enum_1 = require("../utils/enum");
class ServiceValidator {
    createService(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                service: joi_1.default.array()
                    .items(joi_1.default.object({
                    skill: joi_1.default.string().required().messages({
                        "string.base": "Skill must be text",
                        "any.required": "Skill is required.",
                    }),
                    category: joi_1.default.string().required().messages({
                        "string.base": "Category must be text",
                        "any.required": "Category is required.",
                    }),
                }).required())
                    .min(1)
                    .required()
                    .messages({
                    "array.base": "Service must be an array",
                    "array.min": "At least one service must be provided",
                    "any.required": "Service is required.",
                }),
                description: joi_1.default.string().required().messages({
                    "string.base": "Description must be text",
                    "any.required": "Description is required.",
                }),
                images: joi_1.default.array()
                    .items(joi_1.default.string()
                    .trim()
                    .uri({ scheme: ["http", "https"] })
                    .message("Job images must be a valid URL")
                    .custom((value, helpers) => {
                    const regex = /^https?:\/\/(?:www\.)?.+\.(?:jpe?g|png|gif|bmp)$/i;
                    if (!regex.test(value)) {
                        return helpers.message({
                            custom: "Invalid job image URL format",
                        });
                    }
                    return value;
                }))
                    .min(2)
                    .optional()
                    .messages({
                    "array.base": "Service images must be an array",
                    "array.empty": "Service images cannot be empty",
                    "array.min": "Service images must contain at least 2 items",
                    "any.required": "Service images is required.",
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
    updateUserServiceSkills(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                service: joi_1.default.array()
                    .items(joi_1.default.object({
                    skill: joi_1.default.string().required().messages({
                        "string.base": "Skill must be text",
                        "any.required": "Skill is required.",
                    }),
                    category: joi_1.default.string().required().messages({
                        "string.base": "Category must be text",
                        "any.required": "Category is required.",
                    }),
                }).required())
                    .min(1)
                    .required()
                    .messages({
                    "array.base": "Service must be an array",
                    "array.min": "At least one service must be provided",
                    "any.required": "Service is required.",
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
    updateUserServiceDescription(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                description: joi_1.default.string().required().messages({
                    "string.base": "Description must be text",
                    "any.required": "Description is required.",
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
    updateUserServiceImages(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                images: joi_1.default.array()
                    .items(joi_1.default.string()
                    .trim()
                    .uri({ scheme: ["http", "https"] })
                    .message("Job images must be a valid URL")
                    .custom((value, helpers) => {
                    const regex = /^https?:\/\/(?:www\.)?.+\.(?:jpe?g|png|gif|bmp)$/i;
                    if (!regex.test(value)) {
                        return helpers.message({
                            custom: "Invalid job image URL format",
                        });
                    }
                    return value;
                }))
                    .min(2)
                    .required()
                    .messages({
                    "array.base": "Service images must be an array",
                    "array.empty": "Service images cannot be empty",
                    "array.min": "Service images must contain at least 2 items",
                    "any.required": "Service images is required.",
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
    updateUserServiceAvailableToWork(req, res, next) {
        const schema = joi_1.default.object({
            availableToWork: joi_1.default.string().
                //allows only type="job" or type="item"
                valid('yes', 'no').required().messages({
                'string.base': 'Type must be a string',
                'any.required': 'availableToWork required',
                'any.only': 'availableToWork should be either no or yes!',
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
    }
}
exports.serviceValidator = new ServiceValidator();
