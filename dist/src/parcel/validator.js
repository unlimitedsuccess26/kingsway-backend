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
exports.createParcelValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const enum_1 = require("../utils/enum");
class CreateParcelValidator {
    createParcel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                senderName: joi_1.default.string().required().messages({
                    "string.base": "Sender name must be text",
                    "any.required": "Sender name is required.",
                }),
                receiverName: joi_1.default.string().required().messages({
                    "string.base": "Receiver name must be text",
                    "any.required": "Receiver name is required.",
                }),
                email: joi_1.default.string().email().required().messages({
                    "string.email": "Please enter a valid email address",
                    "any.required": "Email address is required",
                }),
                receiverEmail: joi_1.default.string().email().required().messages({
                    "string.email": "Please enter a valid receiver email address",
                    "any.required": " Receiver email address is required",
                }),
                freightDate: joi_1.default.string().required().messages({
                    "string.base": "Freight date must be text",
                    "any.required": "Freight date is required.",
                }),
                arrivalDate: joi_1.default.string().required().messages({
                    "string.base": "Arrival date must be text",
                    "any.required": "Arrival date is required.",
                }),
                parcelWeight: joi_1.default.string().required().messages({
                    "string.base": "Parcel weight must be text",
                    "any.required": "Parcel weight is required.",
                }),
                parcelsDesignation: joi_1.default.string().required().messages({
                    "string.base": "Parcel designation must be text",
                    "any.required": "Parcel designation is required.",
                }),
                newLocation: joi_1.default.string()
                    .pattern(/^https:\/\/www\.google\.com\/maps\/embed\/v1\/place\?key=[A-Za-z0-9_-]+&q=[^&]+(&zoom=\d+)?(&maptype=[a-z]+)?$/i)
                    .required()
                    .messages({
                    "string.pattern.base": "New location must be a valid Google Maps embed URL.",
                    "any.required": "New location is required.",
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
exports.createParcelValidator = new CreateParcelValidator();
