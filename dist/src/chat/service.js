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
exports.chatService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const entity_1 = __importDefault(require("./entity"));
class ChatService {
    sendChat(userId, receiverId, conversationId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            let chat = yield entity_1.default.findOne({
                conversationId: new mongoose_1.default.Types.ObjectId(conversationId),
                participants: {
                    $all: [
                        new mongoose_1.default.Types.ObjectId(receiverId),
                        new mongoose_1.default.Types.ObjectId(userId),
                    ],
                },
            });
            if (!chat) {
                chat = new entity_1.default({
                    conversationId: new mongoose_1.default.Types.ObjectId(conversationId),
                    participants: [
                        new mongoose_1.default.Types.ObjectId(userId),
                        new mongoose_1.default.Types.ObjectId(receiverId),
                    ],
                    messages: [
                        {
                            sender: new mongoose_1.default.Types.ObjectId(userId),
                            content,
                            timestamp: new Date(),
                            isRead: false,
                        },
                    ],
                });
            }
            else {
                chat.messages.push({
                    sender: new mongoose_1.default.Types.ObjectId(userId),
                    content,
                    timestamp: new Date(),
                    isRead: false,
                });
            }
            chat = yield chat.save();
            return chat;
        });
    }
    findChatById(userId, receiverId, conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield entity_1.default.findOne({
                conversationId: new mongoose_1.default.Types.ObjectId(conversationId),
                participants: {
                    $all: [
                        new mongoose_1.default.Types.ObjectId(receiverId),
                        new mongoose_1.default.Types.ObjectId(userId),
                    ],
                },
            });
            return chat;
        });
    }
    getChat(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield entity_1.default.findById(id)
                .select("-participants")
                .populate("messages.sender", "_id");
            return chat;
        });
    }
    // public async markMessagesAsRead(chatId: string, receiverId: string) {
    //   const chat = await Chat.updateOne(
    //     {
    //       _id: new mongoose.Types.ObjectId(chatId),
    //       messages: {
    //         $all: [
    //           {
    //             sender: new mongoose.Types.ObjectId(receiverId),
    //           },
    //         ],
    //       },
    //     },
    //     {
    //       $set: { "messages.$[].isRead": true },
    //     }
    //   );
    //   return chat;
    // }
    markMessagesAsRead(chatId, receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield entity_1.default.updateOne({
                _id: new mongoose_1.default.Types.ObjectId(chatId),
                "messages.sender": new mongoose_1.default.Types.ObjectId(receiverId),
                // "messages.isRead": false
            }, {
                $set: { "messages.$[elem].isRead": true },
            }, {
                arrayFilters: [
                    { "elem.sender": new mongoose_1.default.Types.ObjectId(receiverId) },
                ],
            });
            return result;
        });
    }
    //This fetches user latest chat, The unread messages of the chat and details of the chat reciever
    getUserChats(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
            const chats = yield entity_1.default.aggregate([
                { $match: { participants: { $in: [userObjectId] } } },
                { $unwind: "$messages" },
                { $sort: { "messages.timestamp": -1 } },
                {
                    $lookup: {
                        from: "users",
                        localField: "messages.sender",
                        foreignField: "_id",
                        as: "senderInfo",
                    },
                },
                { $unwind: "$senderInfo" },
                {
                    $addFields: {
                        otherParticipantId: {
                            $arrayElemAt: [
                                {
                                    $filter: {
                                        input: "$participants",
                                        as: "participant",
                                        cond: { $ne: ["$$participant", userObjectId] },
                                    },
                                },
                                0,
                            ],
                        },
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "otherParticipantId",
                        foreignField: "_id",
                        as: "otherParticipantInfo",
                    },
                },
                { $unwind: "$otherParticipantInfo" },
                {
                    $group: {
                        _id: "$_id",
                        conversationId: { $first: "$conversationId" },
                        participants: { $first: "$participants" },
                        recentMessage: {
                            $first: {
                                _id: "$messages._id",
                                sender: {
                                    _id: "$senderInfo._id",
                                    firstName: "$senderInfo.firstName",
                                    lastName: "$senderInfo.lastName",
                                    profileImageUrl: "$senderInfo.profileImageUrl",
                                },
                                content: "$messages.content",
                                timestamp: "$messages.timestamp",
                            },
                        },
                        otherParticipant: { $first: "$otherParticipantInfo" },
                    },
                },
                {
                    $lookup: {
                        from: "chats",
                        let: { chatId: "$_id", userId: userObjectId },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$chatId"] } } },
                            { $unwind: "$messages" },
                            {
                                $match: {
                                    $and: [
                                        { $expr: { $ne: ["$messages.sender", "$$userId"] } },
                                        { "messages.isRead": false },
                                    ],
                                },
                            },
                            { $group: { _id: null, unreadMessagesCount: { $sum: 1 } } },
                        ],
                        as: "unreadCount",
                    },
                },
                {
                    $unwind: {
                        path: "$unreadCount",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $project: {
                        conversationId: 1,
                        participants: 1,
                        recentMessage: 1,
                        otherParticipant: {
                            _id: "$otherParticipant._id",
                            firstName: "$otherParticipant.firstName",
                            lastName: "$otherParticipant.lastName",
                            profileImageUrl: "$otherParticipant.profileImageUrl",
                        },
                        unreadMessagesCount: {
                            $ifNull: ["$unreadCount.unreadMessagesCount", 0],
                        },
                    },
                },
            ]);
            console.log("Retrieved Chats:", chats); // Debugging line
            return chats;
        });
    }
    //This function fetches the latest messages of the user with the total number of unread messages
    // public async getUserChats(userId: string) {
    //   const userObjectId = new mongoose.Types.ObjectId(userId);
    //   console.log("Converted User ID:", userObjectId);
    //   const chats = await Chat.aggregate([
    //     { $match: { participants: { $in: [userObjectId] } } },
    //     // Unwind: Flattens the messages array to work with individual messages.
    //     { $unwind: "$messages" },
    //     // Sort messages by timestamp in descending order.
    //     { $sort: { "messages.timestamp": -1 } },
    //     {
    //       // "$lookup" refers to the operation of combining data from two separate collections based on a common field or condition. MongoDB supports a form of left outer join using the $lookup stage, which allows you to fetch related documents from another collection and include them in the result.
    //       $lookup: {
    //         from: "users",
    //         localField: "messages.sender",
    //         foreignField: "_id",
    //         as: "senderInfo",
    //       },
    //     },
    //     { $unwind: "$senderInfo" },
    //     {
    //       // Grouping by _id: Each chat document has a unique _id, so each chat is treated as a separate group.
    //       // Preserving Chat Data: By using $first for conversationId and participants, the aggregation retains these fields as they are consistent within each chat.
    //       // Selecting the Most Recent Message: Since messages were sorted by timestamp in descending order earlier in the pipeline, the first message encountered is the most recent one. The $first operator ensures that only this message is included in the recentMessage field of the grouped result.
    //       $group: {
    //         _id: "$_id",
    //         conversationId: { $first: "$conversationId" },
    //         participants: { $first: "$participants" },
    //         recentMessage: {
    //           $first: {
    //             _id: "$messages._id",
    //             sender: {
    //               _id: "$senderInfo._id",
    //               firstName: "$senderInfo.firstName",
    //               lastName: "$senderInfo.lastName",
    //               profileImageUrl: "$senderInfo.profileImageUrl",
    //             },
    //             content: "$messages.content",
    //             timestamp: "$messages.timestamp",
    //           },
    //         },
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: "chats",
    //         let: { chatId: "$_id" },
    //         pipeline: [
    //           { $match: { $expr: { $eq: ["$_id", "$$chatId"] } } },
    //           { $unwind: "$messages" },
    //           { $match: { "messages.isRead": false } },
    //           // Groups the filtered documents to calculate the count of unread messages. The _id: null indicates that all documents are grouped into a single group. The unreadMessagesCount field sums up the count of unread messages.
    //           { $group: { _id: null, unreadMessagesCount: { $sum: 1 } } },
    //         ],
    //         as: "unreadCount",
    //       },
    //     },
    //     // Unwind the unreadCount array and preserve null and empty arrays.
    //     {
    //       $unwind: {
    //         path: "$unreadCount",
    //         //This option ensures that documents with null or empty arrays in the unreadCount field are included in the output. If unreadCount is null or an empty array, the document will still be retained in the output, but the unreadCount field will not be unwound.
    //         // The preserveNullAndEmptyArrays: true option ensures that documents without any unread messages (i.e., where unreadCount is null or an empty array) are still included in the result.
    //         preserveNullAndEmptyArrays: true,
    //       },
    //     },
    //     // Project the final output.
    //     {
    //       $project: {
    //         conversationId: 1, // Include conversationId in the final output
    //         participants: 1,
    //         recentMessage: 1, // Use recentMessage instead of messages
    //         unreadMessagesCount: {
    //           $ifNull: ["$unreadCount.unreadMessagesCount", 0],
    //         },
    //       },
    //     },
    //   ]);
    //   return chats;
    // }
    //Get userLatestMessage and total number of unread message for a chat
    // public async getUserLatestMessage(userId: string) {
    //   const userObjectId = new mongoose.Types.ObjectId(userId);
    //   const chat = await Chat.aggregate([
    //     { $match: { participants: { $all: [userObjectId] } } },
    //     { $unwind: "$messages" },
    //      { $sort: { "messages.timestamp": -1 } },
    //     { $limit: 1 },
    //     {
    //       // "$lookup" refers to the operation of combining data from two separate collections based on a common field or condition. MongoDB supports a form of left outer join using the $lookup stage, which allows you to fetch related documents from another collection and include them in the result.
    //       //from: "users"
    //       // Specifies the collection to join. In this case, it is the users collection.
    //       // localField: "messages.sender"
    //       // Specifies the field from the input documents (the Chat collection) that will be matched against the foreignField of the from collection. Here, it is the sender field in the messages array, which is a reference to a user ID in the users collection.
    //       // foreignField: "_id"
    //       // Specifies the field from the from collection (the users collection) that will be matched against the localField of the input documents. Here, it is the _id field of the users collection.
    //       // as: "senderInfo"
    //       // Specifies the name of the new array field to add to the input documents. This field will contain the matched documents from the users collection. Here, the matched user documents will be stored in the senderInfo field.
    //       $lookup: {
    //         from: "users",
    //         localField: "messages.sender",
    //         foreignField: "_id",
    //         as: "senderInfo",
    //       },
    //     },
    //     { $unwind: "$senderInfo" },
    //     {
    //       //Project: Creates the latestMessage field with the desired structure.
    //       $project: {
    //         latestMessage: {
    //           _id: "$messages._id",
    //           sender: {
    //             _id: "$senderInfo._id",
    //             firstName: "$senderInfo.firstName",
    //             lastName: "$senderInfo.lastName",
    //             profileImageUrl: "$senderInfo.profileImageUrl",
    //           },
    //           content: "$messages.content",
    //           timestamp: "$messages.timestamp",
    //         },
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: "chats",
    //       //  let: { chatId: "$_id" }: Defines variables (chatId) for use within the pipeline stages. Here, $_id refers to the _id field of the current document from the collection where this aggregation is being applied above.
    //         let: { chatId: "$_id" },
    //         pipeline: [
    //           // $match Stage: Filters documents from the chats collection where _id matches the chatId from the current document ($expr: { $eq: ["$_id", "$$chatId"] }).
    //           { $match: { $expr: { $eq: ["$_id", "$$chatId"] } } },
    //           { $unwind: "$messages" },
    //           { $match: { "messages.isRead": false } },
    //           // $group Stage: Groups the filtered documents to calculate the count of unread messages (unreadMessagesCount). The _id: null indicates that we're computing a total across all documents that match the previous stages.
    //           { $group: { _id: null, unreadMessagesCount: { $sum: 1 } } },
    //         ],
    //         as: "unreadCount",
    //       },
    //     },
    //     {
    //       $unwind: {
    //         path: "$unreadCount",
    //         preserveNullAndEmptyArrays: true,
    //       },
    //     },
    //     {
    //       $project: {
    //         //latestMessage: 1, ensures that the latestMessage and unreadMessagesCount are included in the final output, and the rest of the fields are excluded
    //         latestMessage: 1,
    //         unreadMessagesCount: {
    //           $ifNull: ["$unreadCount.unreadMessagesCount", 0],
    //         },
    //       },
    //     },
    //   ]);
    //   return chat;
    // }
    countUnreadMessagesInChats(chatId, senderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chats = yield entity_1.default.aggregate([
                {
                    $match: {
                        _id: new mongoose_1.default.Types.ObjectId(chatId),
                    },
                },
                {
                    $project: {
                        unreadMessagesCount: {
                            $size: {
                                $filter: {
                                    input: "$messages",
                                    as: "message",
                                    cond: {
                                        $and: [
                                            { $eq: ["$$message.isRead", false] },
                                            {
                                                $eq: [
                                                    "$$message.sender",
                                                    new mongoose_1.default.Types.ObjectId(senderId),
                                                ],
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                    },
                },
            ]);
            return chats.length > 0 ? chats[0].unreadMessagesCount : 0;
        });
    }
}
exports.chatService = new ChatService();
// import { Request } from "express";
// import mongoose from "mongoose";
// import Chat from "./entity";
// class ChatService {
//   public async sendChat(userId: string, req: Request) {
//     const { receiverId } = req.params;
//     const { content } = req.body;
//     let chat = await Chat.findOne({
//       participants: {
//         $all: [
//           new mongoose.Types.ObjectId(receiverId),
//           new mongoose.Types.ObjectId(userId),
//         ],
//       },
//     });
//     if (!chat) {
//       chat = new Chat({
//         participants: [
//           new mongoose.Types.ObjectId(userId),
//           new mongoose.Types.ObjectId(receiverId),
//         ],
//         messages: [
//           {
//             sender: new mongoose.Types.ObjectId(userId),
//             content,
//             timestamp: new Date(),
//           },
//         ],
//       });
//     } else {
//       chat.messages.push({
//         sender: new mongoose.Types.ObjectId(userId),
//         content,
//         timestamp: new Date(),
//       });
//     }
//     chat = await chat.save();
//     return chat;
//   }
//   public async getChat(userId: string, req: Request) {
//     const { receiverId } = req.params;
//     const chat = await Chat.findOne({
//       participants: {
//         $all: [
//           new mongoose.Types.ObjectId(receiverId),
//           new mongoose.Types.ObjectId(userId),
//         ],
//       },
//     })
//       .select("-participants")
//       .populate("messages.sender", "_id");
//     return chat;
//   }
//   public async getUserLatestMessage(userId: string) {
//     const userObjectId = new mongoose.Types.ObjectId(userId);
//     // Aggregate to get the latest message sent by the user
//     const chat = await Chat.aggregate([
//       { $match: { participants: { $all: [userObjectId] } } },
//       { $unwind: "$messages" },
//       { $match: { "messages.sender": userObjectId } },
//       { $sort: { "messages.timestamp": -1 } },
//       { $limit: 1 },
//       {
//         $lookup: {
//           from: "users",
//           localField: "messages.sender",
//           foreignField: "_id",
//           as: "senderInfo"
//         }
//       },
//       { $unwind: "$senderInfo" },
//       {
//         $project: {
//           latestMessage: {
//             _id: "$messages._id",
//             sender: {
//               _id: "$senderInfo._id",
//               firstName: "$senderInfo.firstName",
//               lastName: "$senderInfo.lastName",
//               profileImageUrl: "$senderInfo.profileImageUrl"
//             },
//             content: "$messages.content",
//             timestamp: "$messages.timestamp"
//           }
//         }
//       }
//     ]);
//     return chat.length > 0 ? chat[0].latestMessage : null;
//   }
// }
// export const chatService = new ChatService();
