"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const parcelSchema = new Schema({
    senderName: {
        type: String,
        required: true,
    },
    receiverName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    receiverEmail: {
        type: String,
        required: true,
    },
    freightDate: {
        type: String,
        required: true,
    },
    arrivalDate: {
        type: String,
        required: true,
    },
    parcelWeight: {
        type: String,
        required: true,
    },
    parcelsDesignation: {
        type: String,
        required: true,
    },
    newLocation: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
});
const Parcel = mongoose_1.default.model("Parcel", parcelSchema);
exports.default = Parcel;
