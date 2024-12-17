"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatController = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const app_1 = require("firebase-admin/app");
const messaging_1 = require("firebase-admin/messaging");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const service_1 = require("./service");
const service_2 = require("../user/service");
const enum_1 = require("../utils/enum");
const socket_1 = require("../../socket");
dotenv_1.default.config();
process.env.GOOGLE_PUSH_NOTIFICATION_CREDENTIALS;
const serviceAccountPath = path_1.default.resolve(__dirname, "../../../config/bustle-up-firebase-adminsdk-rnzv5-efeaf34b39.json");
(0, app_1.initializeApp)({
    credential: firebase_admin_1.default.credential.cert(serviceAccountPath),
});
class ChatController {
    sendChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            //conversationId is the id of the item, service or job the converstation was started with
            const { receiverId, conversationId } = req.query;
            const { content } = req.body;
            const chatExist = yield service_1.chatService.findChatById(userId, receiverId, conversationId);
            const chat = yield service_1.chatService.sendChat(userId, receiverId, conversationId, content);
            const chatSenderUserData = yield service_2.userService.findUserById(userId);
            const chatReceiverData = yield service_2.userService.findUserById(receiverId);
            if (!chatSenderUserData) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "User does not exist",
                    data: null,
                });
            }
            const lastMessage = chat.messages[chat.messages.length - 1];
            const lastTimestamp = lastMessage.timestamp;
            const chatId = chat._id.toString();
            const io = socket_1.socket.getIO();
            console.log("sent toooooooooo", chatId);
            const unreadCount = yield service_1.chatService.countUnreadMessagesInChats(chatId, receiverId);
            //when sending to a room
            // io.to(chatId).emit("new_message", {
            //   chatId,
            //   chat: content,
            //   senderId: userId,
            //   lastTimestamp,
            //   unreadCount
            // });
            //when sending to an individual
            if (chatExist) {
                io.emit(chatId, {
                    chatId,
                    chat: content,
                    senderId: userId,
                    lastTimestamp,
                    unreadCount,
                });
            }
            else {
                //  when sending a new chat
                io.emit(receiverId, {
                    receiverId: receiverId,
                    id: chatId,
                    conversationId: conversationId,
                    chatSenderId: userId,
                    latestMessage: content,
                    senderFullName: `${chatSenderUserData.firstName} ${chatSenderUserData.lastName}`,
                    senderProfileImage: chatSenderUserData.profileImageUrl,
                    timeStamp: lastTimestamp,
                    chatExist: chatExist,
                });
            }
            // if (chatReceiverData) {
            //   if (chatReceiverData.pushNotificationToken) {
            //     const message = {
            //       notification: {
            //         title: `${chatSenderUserData.firstName} ${chatSenderUserData.lastName}`,
            //         body: content,
            //       },
            //       token: chatReceiverData.pushNotificationToken,
            //     };
            //     await getMessaging().send(message);
            //   }
            // }
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Chat sent successfully!",
                data: { chat, receiveDetails: chatSenderUserData, unreadCount },
            });
        });
    }
    sendSocketChat(userId, receiverId, conversationId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            let chat = yield service_1.chatService.sendChat(userId, receiverId, conversationId, content);
            console.log("sentttt");
            const chatId = chat._id.toString();
            //await chatService.markMessagesAsRead(chatId, receiverId);
            const lastMessage = chat.messages[chat.messages.length - 1];
            const lastTimestamp = lastMessage.timestamp;
            // const unreadCount = await chatService.countUnreadMessagesInChats(
            //   chatId,
            //   receiverId
            // );
            yield service_1.chatService.markMessagesAsRead(chatId, receiverId);
            const io = socket_1.socket.getIO();
            io.emit(chatId, {
                chatId,
                chat: content,
                senderId: userId,
                lastTimestamp,
                // unreadCount,
                sentData: {
                    receiverId: receiverId,
                    conversationId: conversationId,
                    content: content,
                },
            });
            const chatReceiverData = yield service_2.userService.findUserById(receiverId);
            const chatSenderUserData = yield service_2.userService.findUserById(userId);
            if (chatReceiverData && chatSenderUserData) {
                if (chatReceiverData.pushNotificationToken) {
                    const message = {
                        notification: {
                            title: `${chatSenderUserData.firstName} ${chatSenderUserData.lastName}`,
                            body: content,
                        },
                        token: chatReceiverData.pushNotificationToken,
                    };
                    yield (0, messaging_1.getMessaging)().send(message);
                }
            }
        });
    }
    getChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const { id, receiverId } = req.params;
            const chat = yield service_1.chatService.getChat(id);
            if (!chat) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Chat not found",
                    data: null,
                });
            }
            const chatId = chat._id.toString();
            yield service_1.chatService.markMessagesAsRead(chatId, receiverId);
            const userData = yield service_2.userService.findUserById(receiverId);
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Chat fetched successfully!",
                data: { chat, receiveDetails: userData },
            });
        });
    }
    getUserChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const chat = yield service_1.chatService.getUserChats(userId);
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Chat fetched successfully!",
                data: chat,
            });
        });
    }
}
exports.chatController = new ChatController();
// import { Request, Response } from "express";
// import { chatService } from "./service";
// import { userService } from "../user/service";
// import { CustomRequest } from "../utils/interface";
// import { MessageResponse } from "../utils/enum";
// import { socket } from "../../socket";
// class ChatController {
//   public async sendChat(req: Request, res: Response) {
//     const { userId } = req as CustomRequest;
//     const { receiverId } = req.params;
//     const { content } = req.body;
//     const chat = await chatService.sendChat(userId, req);
//     const userData = await userService.findUserById(userId);
//     if (!userData) {
//       return res.status(404).json({
//         message: MessageResponse.Error,
//         description: "User does not exist",
//         data: null,
//       });
//     }
//     const lastMessage = chat.messages[chat.messages.length - 1];
//     // Access the timestamp of the last message
//     const lastTimestamp = lastMessage.timestamp;
//     const io = socket.getIO();
//     io.to(receiverId).emit("new_message", { chat: content, senderId: userId, lastTimestamp: lastTimestamp });
//     return res.status(201).json({
//       message: MessageResponse.Success,
//       description: "Chat sent successfully!",
//       data: { chat: chat, receiveDetails: userData },
//     });
//   }
//   public async getChat(req: Request, res: Response) {
//     const { userId } = req as CustomRequest;
//     const chat = await chatService.getChat(userId, req);
//     const userData = await userService.findUserById(userId);
//     if (!userData) {
//       return res.status(404).json({
//         message: MessageResponse.Error,
//         description: "User does not exist",
//         data: null,
//       });
//     }
//     return res.status(201).json({
//       message: MessageResponse.Success,
//       description: "Chat sent successfully!",
//       data: { chat: chat, receiveDetails: userData },
//     });
//   }
//   public async getUserChat(req: Request, res: Response) {
//     const { userId } = req as CustomRequest;
//     const chat = await chatService.getUserLatestMessage(userId);
//     return res.status(200).json({
//       message: MessageResponse.Success,
//       description: "Chat sent successfully!",
//       data: chat,
//     });
//   }
// }
// export const chatController = new ChatController();
