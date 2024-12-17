"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        require,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    gender: {
        type: String,
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    region: {
        type: String,
    },
    pushNotificationToken: {
        type: String,
    },
    city: {
        type: String,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    completedRegistration: {
        type: Boolean,
        default: false,
    },
    createdShop: {
        type: Boolean,
        default: false,
    },
    profileImageUrl: {
        type: String,
    },
    emailVerifyOTP: String,
    emailVerifyOTPExpiration: Date,
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
