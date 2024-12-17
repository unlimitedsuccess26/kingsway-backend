"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const utils_1 = require("../utils");
const validator_1 = require("./validator");
const is_auth_1 = require("../middleware/is_auth");
exports.ChatRouter = (0, express_1.Router)();
// Send Chat
exports.ChatRouter.post("/chat", [is_auth_1.isAuth, validator_1.chatValidator.validateParamsAndBody], (0, utils_1.wrapAsync)(controller_1.chatController.sendChat));
// Fetch Chat
exports.ChatRouter.get("/chat/:id/:receiverId", [is_auth_1.isAuth, validator_1.chatValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.chatController.getChat));
// Fetch latest user chat message
//To consume
exports.ChatRouter.get("/user/chat", [is_auth_1.isAuth], (0, utils_1.wrapAsync)(controller_1.chatController.getUserChat));
// ChatRouter.get(
//   "/user/unread-count/:chatId",
//   [],
//   wrapAsync(chatController.getUnreadMessageCount)
// );
// import { Router } from "express";
// import { chatController } from "./controller";
// import { wrapAsync } from "../utils";
// import { chatValidator } from "./validator";
// import { isAuth } from "../middleware/is_auth";
// export const ChatRouter = Router();
// //Send Chat
// ChatRouter.post(
//   "/chat/:receiverId",
//   [isAuth, chatValidator.validateParamsAndBody],
//   wrapAsync(chatController.sendChat)
// );
// //Fetch Chat
// ChatRouter.get(
//     "/chat/:receiverId",
//     [isAuth, chatValidator.validateParams],
//     wrapAsync(chatController.getChat)
//   );
// //Fetch all User Chat
// ChatRouter.get(
//   "/user/chat",
//   [isAuth],
//   wrapAsync(chatController.getUserChat)
// );
