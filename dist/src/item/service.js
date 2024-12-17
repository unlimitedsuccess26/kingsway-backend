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
exports.itemService = void 0;
const mongoose_1 = require("mongoose");
const entity_1 = __importDefault(require("./entity"));
const entity_2 = __importDefault(require("../saved_items/entity"));
const utils_1 = require("../utils");
class ItemService {
    createItem(shopId, userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, images, category, categoryName, condition, description, price, } = req.body;
            const slug = (0, utils_1.slugify)(description);
            const objUserId = new mongoose_1.Types.ObjectId(String(userId));
            const newItem = new entity_1.default({
                name: name,
                slug,
                images: images,
                shopId: shopId,
                category: category,
                condition: condition,
                description: description !== null && description !== void 0 ? description : "",
                price: price,
                categoryName: categoryName,
                itemPosterUserId: objUserId,
            });
            yield newItem.save();
            return newItem;
        });
    }
    editItem(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, images, category, categoryName, condition, description, price, } = req.body;
            const objUserId = new mongoose_1.Types.ObjectId(String(userId));
            let existingItem = yield entity_1.default.findOne({ itemPosterUserId: objUserId });
            if (existingItem) {
                existingItem.name = name;
                existingItem.images = images;
                existingItem.category = category;
                existingItem.condition = condition;
                existingItem.description = description !== null && description !== void 0 ? description : "";
                existingItem.price = price;
                existingItem.categoryName = categoryName;
                existingItem = yield existingItem.save();
            }
            return existingItem;
        });
    }
    findAndDeleteItem(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const objUserId = new mongoose_1.Types.ObjectId(String(userId));
            const objId = new mongoose_1.Types.ObjectId(String(id));
            const userItem = yield entity_1.default.findOneAndDelete({
                itemPosterUserId: objUserId,
                _id: id,
            });
            yield entity_2.default.findOneAndDelete({
                userId: objUserId,
                "favItem.job": objId,
            });
            return userItem;
        });
    }
    fetchAllItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield entity_1.default.find({ outOfStock: "no", sold: "no" }).populate("shopId", "shopOwnerUserId name");
            return items;
        });
    }
    fetchAllFeaturedItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield entity_1.default.find({
                featured: true,
                outOfStock: "no",
                sold: "no",
            }).populate("shopId", "shopOwnerUserId name");
            return items;
        });
    }
    fetchItemDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield entity_1.default.findOne({
                _id: id,
                outOfStock: "no",
                sold: "no",
            }).populate({
                //this is the name of field used for referncing the model
                path: "shopId",
                select: "shopOwnerUserId name",
                //this is possibe because of the relation btween Items scheme, which is referencing Shop Scheme that refernced User Schema
                populate: {
                    path: "shopOwnerUserId",
                    model: "User",
                    select: "firstName lastName region profileImageUrl phoneNumber",
                },
            });
            return items;
        });
    }
    fetchItemDetailsBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield entity_1.default.findOne({
                slug,
                outOfStock: "no",
                sold: "no",
            }).populate({
                //this is the name of field used for referncing the model
                path: "shopId",
                select: "shopOwnerUserId name",
                //this is possibe because of the relation btween Items scheme, which is referencing Shop Scheme that refernced User Schema
                populate: {
                    path: "shopOwnerUserId",
                    model: "User",
                    select: "firstName lastName region profileImageUrl phoneNumber",
                },
            });
            return items;
        });
    }
    // public async fetchSimilarItems(category: string, id: string) {
    //   const items = await Item.find({
    //     category: category,
    //     //where _id is not equal to the id passed
    //     _id: { $ne: id },
    //   }).populate("shopId", "shopOwnerUserId name");
    //   return items;
    // }
    fetchSimilarItems(category, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield entity_1.default.find({
                category: category,
                outOfStock: "no",
                sold: "no",
                //Item where the id does not match
                _id: { $ne: new mongoose_1.Types.ObjectId(id) },
            }).populate({
                //this is the name of field used for referncing the model
                path: "shopId",
                select: "shopOwnerUserId name",
                //this is possibe because of the relation btween Items scheme, which is referencing Shop Scheme that refernced User Schema
                populate: {
                    path: "shopOwnerUserId",
                    model: "User",
                    select: "firstName lastName",
                },
            });
            return items;
        });
    }
    fetchFeaturedItemDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield entity_1.default.findOne({
                featured: true,
                _id: id,
                outOfStock: "no",
                sold: "no",
            }).populate({
                //this is the name of field used for referncing the model
                path: "shopId",
                //this is possibe because of the relation between Items scheme, which is referencing Shop Scheme that refernced User Schema
                populate: {
                    path: "shopOwnerUserId",
                    model: "User",
                    select: "firstName lastName region profileImageUrl phoneNumber",
                },
            });
            return items;
        });
    }
    fetchFeaturedItemDetailsBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield entity_1.default.findOne({
                featured: true,
                slug,
                outOfStock: "no",
                sold: "no",
            }).populate({
                //this is the name of field used for referncing the model
                path: "shopId",
                //this is possibe because of the relation between Items scheme, which is referencing Shop Scheme that refernced User Schema
                populate: {
                    path: "shopOwnerUserId",
                    model: "User",
                    select: "firstName lastName region profileImageUrl phoneNumber",
                },
            });
            return items;
        });
    }
    markUserItemAsSold(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const objUserId = new mongoose_1.Types.ObjectId(String(userId));
            const userItem = yield entity_1.default.findOne({
                itemPosterUserId: objUserId,
                _id: id,
            });
            if (userItem) {
                userItem.sold = "yes";
                yield userItem.save();
            }
            return userItem;
        });
    }
    markUserItemAsOutOfStock(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const objUserId = new mongoose_1.Types.ObjectId(String(userId));
            const userItem = yield entity_1.default.findOne({
                itemPosterUserId: objUserId,
                _id: id,
            });
            if (userItem) {
                userItem.outOfStock = "yes";
                yield userItem.save();
            }
            return userItem;
        });
    }
    findUserItemDetails(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const objUserId = new mongoose_1.Types.ObjectId(String(userId));
            const userItemDetails = yield entity_1.default.findOne({
                itemPosterUserId: objUserId,
                _id: id,
            }).populate({
                //this is the name of field used for referncing the model
                path: "shopId",
                select: "shopOwnerUserId name",
                //this is possibe because of the relation btween Items scheme, which is referencing Shop Scheme that refernced User Schema
                populate: {
                    path: "shopOwnerUserId",
                    model: "User",
                    select: "firstName lastName region profileImageUrl phoneNumber",
                },
            });
            return userItemDetails;
        });
    }
}
exports.itemService = new ItemService();
