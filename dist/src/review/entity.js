"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const reviewSchema = new Schema({
    reviewItemId: { type: mongoose_1.default.Schema.Types.ObjectId, require },
    senderDetails: { type: mongoose_1.default.Schema.Types.ObjectId, require, ref: "User" },
    reviewReceiverDetailsUserId: { type: mongoose_1.default.Schema.Types.ObjectId, require },
    date: {
        type: Date,
        default: Date.now,
    },
    rating: {
        type: Number,
        require,
    },
    content: {
        type: String,
        default: 0,
    },
});
const Review = mongoose_1.default.model("Reviews", reviewSchema);
exports.default = Review;
