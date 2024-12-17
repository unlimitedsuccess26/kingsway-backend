"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const enum_1 = require("../utils/enum");
class AllValidator {
    searchQuery(req, res, next) {
        const schema = joi_1.default.object({
            word: joi_1.default.string().required().messages({
                'string.base': 'Search word must be a string',
                'any.required': 'Search word is required',
            }),
            sectionType: joi_1.default.string().optional().allow(''),
            location: joi_1.default.string().optional().allow(''),
            itemCategory: joi_1.default.string().optional().allow(''),
            serviceCategory: joi_1.default.string().optional().allow(''),
            condition: joi_1.default.string().optional().allow(''),
            availability: joi_1.default.string().optional().allow(''),
            minPrice: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.number(), joi_1.default.allow(null)).optional(),
            maxPrice: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.number(), joi_1.default.allow(null)).optional(),
            sort: joi_1.default.string().optional(),
        });
        const { error } = schema.validate(req.query);
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
exports.allValidator = new AllValidator();
