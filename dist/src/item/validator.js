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
exports.itemValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const enum_1 = require("../utils/enum");
class ItemValidator {
    createItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                name: joi_1.default.string().required().messages({
                    "string.base": "Item name must be text",
                    "any.required": "Item name is required.",
                }),
                images: joi_1.default.array()
                    .items(joi_1.default.string()
                    .trim()
                    .uri({ scheme: ["http", "https"] })
                    .message("Item images must be a valid URL")
                    .custom((value, helpers) => {
                    const regex = /^https?:\/\/(?:www\.)?.+\.(?:jpe?g|png|gif|bmp)$/i;
                    if (!regex.test(value)) {
                        return helpers.message({
                            custom: "Invalid items image URL format",
                        });
                    }
                    return value;
                }))
                    .min(2)
                    .max(10)
                    .required()
                    .messages({
                    "array.base": "Item Images must be an array",
                    "array.empty": "Item Images cannot be empty",
                    "any.required": "Item Images is required.",
                    "array.min": "At least two item images are required",
                    "array.max": "Maximum of ten item images are allowed",
                }),
                category: joi_1.default.string().required().messages({
                    "string.base": "Category must be text",
                    "any.required": "Category is required.",
                }),
                categoryName: joi_1.default.string().required().messages({
                    "string.base": "Category aame must be text",
                    "any.required": "Category name is required.",
                }),
                condition: joi_1.default.string().required().messages({
                    "string.base": "Condition must be text",
                    "any.required": "Condition is required.",
                }),
                description: joi_1.default.string()
                    .allow("")
                    .when(joi_1.default.not("").required(), {
                    then: joi_1.default.string().trim().required().messages({
                        "string.base": "Description must be text",
                        "string.empty": "Description cannot be empty",
                    }),
                }),
                price: joi_1.default.number().required().messages({
                    "number.base": "Price must be a number",
                    "any.required": "Price is required.",
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
    validateSlug(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                slug: joi_1.default.string().required().messages({
                    "string.base": "Slug must be text",
                    "any.required": "Slug is required.",
                }),
            });
            const { error } = schema.validate(req.params);
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
    validateParams(req, res, next) {
        const schema = joi_1.default.object({
            id: joi_1.default.string().custom((value, helpers) => {
                if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
                    return helpers.message({
                        custom: "ID must be a valid ObjectId",
                    });
                }
                return value;
            }).required().messages({
                'string.base': 'ID must be a string',
                'any.required': 'ID is required',
            }),
        });
        const { error } = schema.validate(req.params);
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
exports.itemValidator = new ItemValidator();
