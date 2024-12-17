"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const serviceSchema = new Schema({
    slug: {
        type: String,
        require,
    },
    service: [
        {
            skill: {
                type: String,
                require,
            },
            category: {
                type: String,
                require,
            },
        },
    ],
    images: {
        type: [String],
        require,
    },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, require, ref: "User" },
    description: {
        type: String,
        require,
    },
    availableToWork: {
        type: String,
        default: "yes",
    },
    totalView: {
        type: Number,
        default: 0,
    },
    totalSave: {
        type: Number,
        default: 0,
    },
    type: {
        type: String,
        default: "service",
    },
    createdAt: { type: Date, default: Date.now },
});
const Service = mongoose_1.default.model("Services", serviceSchema);
exports.default = Service;
