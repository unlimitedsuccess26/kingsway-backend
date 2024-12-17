"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const itemSchema = new Schema({
    name: {
        type: String,
        require,
    },
    slug: {
        type: String,
        require
    },
    images: {
        type: [String],
        require,
    },
    shopId: { type: mongoose_1.default.Schema.Types.ObjectId, require, ref: "Shops" },
    itemPosterUserId: { type: mongoose_1.default.Schema.Types.ObjectId, require },
    category: {
        type: String,
        require,
    },
    categoryName: {
        type: String,
        require,
    },
    condition: {
        type: String,
        require,
    },
    description: {
        type: String,
        require,
    },
    price: {
        type: Number,
        require,
    },
    type: {
        type: String,
        default: "item",
    },
    sold: {
        type: String,
        //ensures that "sold" is either "yes" or "no"
        enum: ["yes", "no"],
        default: "no"
    },
    outOfStock: {
        type: String,
        enum: ["yes", "no"],
        default: "no"
    },
    totalView: {
        type: Number,
        default: 0,
    },
    totalSave: {
        type: Number,
        default: 0,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    createdAt: { type: Date, default: Date.now },
});
const Item = mongoose_1.default.model("Items", itemSchema);
exports.default = Item;
