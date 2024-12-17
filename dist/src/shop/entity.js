"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const shopSchema = new Schema({
    name: {
        type: String,
        require,
    },
    slug: {
        type: String,
        require,
    },
    shopOwnerUserId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        require,
        ref: "User",
    },
    imageUrl: {
        type: String,
        require,
    },
    description: {
        type: String,
        require,
    },
    createdAt: { type: Date, default: Date.now },
});
const Shop = mongoose_1.default.model("Shops", shopSchema);
exports.default = Shop;
