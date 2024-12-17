"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savedItemValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const enum_1 = require("../utils/enum");
class SavedItemValidator {
    toggleUserSavedItem(req, res, next) {
        const schema = joi_1.default.object({
            id: joi_1.default.string().custom((value, helpers) => {
                if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
                    return helpers.message({
                        custom: "Id must be a valid ObjectId",
                    });
                }
                return value;
            }).required().messages({
                'string.base': 'Id must be a string',
                'any.required': 'Id is required',
            }),
            type: joi_1.default.string().
                //allows only type="job" or type="item"
                valid('job', 'item', 'service').required().messages({
                'string.base': 'Type must be a string',
                'any.required': 'Type is required',
                'any.only': 'Only type of "item", "service" or "job" is supported!',
            }),
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
exports.savedItemValidator = new SavedItemValidator();
