"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const marketPlaceSchema = new Schema({
    name: {
        type: String,
        require,
    },
    imageUrl: {
        type: String,
        require,
    },
    type: {
        type: String,
        require,
    },
});
const MarketPlace = mongoose_1.default.model("MarketPlaces", marketPlaceSchema);
exports.default = MarketPlace;
