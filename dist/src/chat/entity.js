"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const chatSchema = new Schema({
    //This is the id of the item, service or job the converstation was started with
    conversationId: { type: Schema.Types.ObjectId, required: true },
    participants: [
        { type: Schema.Types.ObjectId, ref: "User", required: true },
        { type: Schema.Types.ObjectId, ref: "User", required: true },
    ],
    messages: [
        {
            sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
            content: { type: String, required: true },
            timestamp: { type: Date, required: true },
            isRead: { type: Boolean, default: false },
        },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
chatSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});
const Chat = mongoose_1.default.model("Chat", chatSchema);
exports.default = Chat;
// import mongoose from "mongoose";
// import { IChat } from "./interface";
// const Schema = mongoose.Schema;
// const chatSchema = new Schema({
//   participants: [
//     { type: Schema.Types.ObjectId, ref: "User", required: true },
//     { type: Schema.Types.ObjectId, ref: "User", required: true },
//   ],
//   messages: [
//     {
//       sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
//       content: { type: String, required: true },
//       timestamp: { type: Date, required: true },
//     },
//   ],
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });
// chatSchema.pre("save", function (next) {
//   this.updatedAt = new Date();
//   next();
// });
// const Item = mongoose.model<IChat>("Chats", chatSchema);
// export default Item;
