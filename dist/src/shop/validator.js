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
exports.shopValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const enum_1 = require("../utils/enum");
class ShopValidator {
    createStore(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                name: joi_1.default.string().required().messages({
                    "string.base": "Shop name must be text",
                    "any.required": "Shop name is required.",
                }),
                imageUrl: joi_1.default.string()
                    .trim()
                    .required()
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
                description: joi_1.default.string().required().max(500).messages({
                    "string.base": "Description must be text",
                    "any.required": "Description is required.",
                    "string.length": "Description must be a maximum of 500 chararcters",
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
}
exports.shopValidator = new ShopValidator();
