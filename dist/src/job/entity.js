"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const jobSchema = new Schema({
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
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, require, ref: 'User' },
    description: {
        type: String,
        require,
    },
    location: {
        type: String,
        require,
    },
    skill: {
        type: String,
        require,
    },
    seen: {
        type: String,
        //ensures that "seen" is either "yes" or "no"
        enum: ["yes", "no"],
        default: "no"
    },
    totalView: {
        type: Number,
        default: 0
    },
    totalSave: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now,
    },
    type: {
        type: String,
        default: "job",
    },
    createdAt: { type: Date, default: Date.now },
});
const Job = mongoose_1.default.model("Jobs", jobSchema);
exports.default = Job;
