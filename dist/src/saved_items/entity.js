"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const savedItemSchema = new Schema({
    type: {
        type: String,
        require,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        require
    },
    favItem: {
        item: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            require,
            ref: "Items",
            default: undefined,
        },
        job: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            require,
            ref: "Jobs",
            default: undefined,
        },
        service: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            require,
            ref: "Services",
            default: undefined,
        },
    },
});
const SavedItem = mongoose_1.default.model("SavedItem", savedItemSchema);
exports.default = SavedItem;
