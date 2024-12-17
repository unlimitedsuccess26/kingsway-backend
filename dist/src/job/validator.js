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
exports.jobValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const enum_1 = require("../utils/enum");
class JobValidator {
    createJob(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                name: joi_1.default.string().required().messages({
                    "string.base": "Job name must be text",
                    "any.required": "Job name is required.",
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
                    .max(10)
                    .required()
                    .messages({
                    "array.base": "Job images must be an array",
                    "array.empty": "Job images cannot be empty",
                    "any.required": "Job images is required.",
                }),
                description: joi_1.default.string().required().messages({
                    "string.base": "Description must be text",
                    "any.required": "Description is required.",
                }),
                location: joi_1.default.string().required().messages({
                    "string.base": "Location must be text",
                    "any.required": "Location is required.",
                }),
                skill: joi_1.default.string().required().messages({
                    "string.base": "Skill must be text",
                    "any.required": "Skill is required.",
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
exports.jobValidator = new JobValidator();
