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
Object.defineProperty(exports, "__esModule", { value: true });
exports.savedItemController = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../utils/enum");
const service_1 = require("./service");
class SavedItemController {
    toggleUserSavedItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const { id, type } = req.query;
            const itemId = new mongoose_1.Types.ObjectId(String(id));
            const objUserId = new mongoose_1.Types.ObjectId(String(userId));
            const typeStr = type;
            const updatedUserItems = yield service_1.savedItemService.toggleUserSavedItem(objUserId, itemId, typeStr);
            if (!updatedUserItems) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "User does not exist",
                    data: null,
                });
            }
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "User Items Updated SUccessfully!",
                data: updatedUserItems,
            });
        });
    }
    fetchUserSavedItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const objUserId = new mongoose_1.Types.ObjectId(String(userId));
            const savedItems = yield service_1.savedItemService.fetchSavedItems(objUserId);
            if (!savedItems) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "User does not exist",
                    data: null,
                });
            }
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Saved items fetched sccessfully!",
                data: savedItems,
            });
        });
    }
}
exports.savedItemController = new SavedItemController();
