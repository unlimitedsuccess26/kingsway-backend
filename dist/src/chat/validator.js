"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const enum_1 = require("../utils/enum");
class ChatValidator {
    validateParamsAndBody(req, res, next) {
        const paramsSchema = joi_1.default.object({
            conversationId: joi_1.default.string()
                .custom((value, helpers) => {
                if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
                    return helpers.message({
                        custom: "Conversation ID must be a valid ObjectId",
                    });
                }
                return value;
            })
                .required()
                .messages({
                "string.base": "Conversation ID must be a string",
                "any.required": "Conversation ID is required",
            }),
            receiverId: joi_1.default.string()
                .custom((value, helpers) => {
                if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
                    return helpers.message({
                        custom: "Receiver ID must be a valid ObjectId",
                    });
                }
                return value;
            })
                .required()
                .messages({
                "string.base": "Receiver ID must be a string",
                "any.required": "Receiver ID is required",
            }),
        });
        const bodySchema = joi_1.default.object({
            content: joi_1.default.string().required().messages({
                "string.base": "Content must be text",
                "any.required": "Content is required.",
            }),
        });
        // Validate parameters
        const { error: paramsError } = paramsSchema.validate(req.query);
        if (paramsError) {
            return res.status(400).json({
                message: enum_1.MessageResponse.Error,
                description: paramsError.details[0].message,
                data: null,
            });
        }
        // Validate request body
        const { error: bodyError } = bodySchema.validate(req.body);
        if (bodyError) {
            return res.status(400).json({
                message: enum_1.MessageResponse.Error,
                description: bodyError.details[0].message,
                data: null,
            });
        }
        next();
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
            receiverId: joi_1.default.string().custom((value, helpers) => {
                if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
                    return helpers.message({
                        custom: "receiverID must be a valid ObjectId",
                    });
                }
                return value;
            }).required().messages({
                'string.base': 'receiverID must be a string',
                'any.required': 'receiverID is required',
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
exports.chatValidator = new ChatValidator();
