"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userService = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const entity_1 = __importDefault(require("./entity"));
const entity_2 = __importDefault(require("../service/entity"));
const entity_3 = __importDefault(require("../chat/entity"));
const entity_4 = __importDefault(require("../item/entity"));
const entity_5 = __importDefault(require("../job/entity"));
const entity_6 = __importDefault(require("../saved_items/entity"));
const entity_7 = __importDefault(require("../shop/entity"));
const auth_1 = require("../utils/auth");
class UserService {
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findOne({
                email: email,
            });
            return user;
        });
    }
    //set pushNotificationToken to undefined
    findUserByEmailAndResetpushNotificationToken(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findOne({
                email: email,
            }, { $unset: { pushNotificationToken: 1 } });
            return user;
        });
    }
    addUserPushNotificationToken(userId, pushNotificationToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findById(userId).select("-password");
            if (user) {
                if (user.pushNotificationToken != pushNotificationToken) {
                    user.pushNotificationToken = pushNotificationToken;
                    yield user.save();
                }
            }
            return user;
        });
    }
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findById(userId).select("-password");
            return user;
        });
    }
    findUserByIdWithPassword(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findById({
                _id: userId,
            });
            return user;
        });
    }
    updateUserDataById(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, phoneNumber, region, profileImageUrl } = req.body;
            const user = yield entity_1.default.findById({ _id: userId }).select("-password");
            if (user) {
                user.firstName = firstName;
                user.lastName = lastName;
                user.phoneNumber = phoneNumber;
                user.region = region;
                user.profileImageUrl = profileImageUrl !== null && profileImageUrl !== void 0 ? profileImageUrl : undefined;
                yield user.save();
            }
            return user;
        });
    }
    updateUserPasswordById(userId, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findById({ _id: userId });
            if (user) {
                const hashedPassword = (yield (0, auth_1.hashPassword)(newPassword));
                user.password = hashedPassword;
                yield user.save();
            }
            return user;
        });
    }
    findUserByIdAndDelete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const objUserId = new mongoose_1.Types.ObjectId(String(userId));
            // In the context of MongoDB with Mongoose, a session is used to handle transactions, which allow you to execute multiple operations in an all-or-nothing manner. This means that either all operations within the transaction succeed or none do. This is crucial for maintaining data consistency and integrity, especially when performing multiple related operations
            const session = yield mongoose_1.default.startSession();
            session.startTransaction();
            try {
                yield entity_1.default.findByIdAndDelete(userId, { session });
                yield entity_3.default.deleteMany({ participants: { $in: [objUserId] } }, { session });
                yield entity_4.default.deleteMany({ itemPosterUserId: objUserId }, { session });
                yield entity_5.default.deleteMany({ userId: objUserId }, { session });
                yield entity_6.default.deleteMany({ userId: objUserId }, { session });
                yield entity_2.default.deleteMany({ userId: objUserId }, { session });
                yield entity_7.default.deleteMany({ shopOwnerUserId: objUserId }, { session });
                //    If all operations succeed, the transaction is committed, meaning all changes are applied to the database.
                yield session.commitTransaction();
            }
            catch (error) {
                yield session.abortTransaction();
                throw error;
            }
            finally {
                session.endSession();
            }
        });
    }
}
exports.userService = new UserService();
