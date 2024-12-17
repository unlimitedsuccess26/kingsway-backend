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
exports.savedItemService = void 0;
const entity_1 = __importDefault(require("./entity"));
const entity_2 = __importDefault(require("../service/entity"));
const entity_3 = __importDefault(require("../job/entity"));
const entity_4 = __importDefault(require("../item/entity"));
class SavedItemService {
    toggleUserSavedItem(userId, newReferenceId, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                userId: userId,
                $or: [
                    { "favItem.item": newReferenceId },
                    { "favItem.job": newReferenceId },
                    { "favItem.service": newReferenceId },
                ],
            };
            // Find and delete the document based on the query
            const deletedItem = yield entity_1.default.findOneAndDelete(query, {
                //ensured that the updated doc. is retunrned
                new: true,
            });
            let updateTotalSave;
            if (type === "job") {
                updateTotalSave = yield entity_3.default.findOne({ userId: userId });
            }
            else if (type === "service") {
                updateTotalSave = yield entity_2.default.findOne({ userId: userId });
            }
            else {
                updateTotalSave = yield entity_4.default.findOne({ itemPosterUserId: userId });
            }
            if (deletedItem) {
                if (updateTotalSave) {
                    updateTotalSave.totalSave = updateTotalSave.totalSave -= 1;
                    yield updateTotalSave.save();
                }
            }
            if (!deletedItem) {
                const newItem = new entity_1.default({
                    type: type,
                    userId: userId,
                    favItem: type === "job"
                        ? { job: newReferenceId }
                        : type === "item"
                            ? { item: newReferenceId }
                            : { service: newReferenceId },
                });
                if (updateTotalSave) {
                    updateTotalSave.totalSave = updateTotalSave.totalSave += 1;
                    yield updateTotalSave.save();
                }
                yield newItem.save();
            }
            const updatedSavedItem = yield entity_1.default.find({
                userId: userId,
            });
            return updatedSavedItem;
        });
    }
    fetchSavedItems(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield entity_1.default.find({ userId: userId })
                .populate({
                path: "favItem.item",
                populate: { path: "shopId" }, // Nested population for favItem.item
            })
                .populate({
                path: "favItem.job",
                populate: { path: "userId" }, // Nested population for favItem.job
            })
                .populate({
                path: "favItem.service",
                populate: { path: "userId" }, // Nested population for favItem.service
            })
                .select("type favItem");
            return items;
        });
    }
    checkIfItemIsSaved(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                userId: userId,
                $or: [
                    { "favItem.item": id },
                    { "favItem.job": id },
                    { "favItem.service": id },
                ],
            };
            // Find and delete the document based on the query
            const isSaved = yield entity_1.default.findOne(query);
            return isSaved;
        });
    }
}
exports.savedItemService = new SavedItemService();
