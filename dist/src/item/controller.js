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
exports.itemController = void 0;
const enum_1 = require("../utils/enum");
const service_1 = require("../user/service");
const service_2 = require("./service");
const service_3 = require("../shop/service");
const service_4 = require("../saved_items/service");
class ItemController {
    createItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const userData = yield service_1.userService.findUserById(userId);
            if (!userData) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "User does not exist",
                    data: null,
                });
            }
            const shopExist = yield service_3.shopService.findShopByUserId(userId);
            if (!shopExist) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Please create a shop to add item!",
                    data: null,
                });
            }
            const shopId = shopExist._id;
            yield service_2.itemService.createItem(shopId, userId, req);
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Item Created successfully!",
                data: null,
            });
        });
    }
    editItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const userData = yield service_1.userService.findUserById(userId);
            if (!userData) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "User does not exist",
                    data: null,
                });
            }
            const shopExist = yield service_3.shopService.findShopByUserId(userId);
            if (!shopExist) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Please create a shop to add item!",
                    data: null,
                });
            }
            yield service_2.itemService.editItem(userId, req);
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Item edited successfully!",
                data: null,
            });
        });
    }
    fetchAllItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { featured } = req.query;
            let allItems;
            if (featured === "true") {
                allItems = yield service_2.itemService.fetchAllFeaturedItems();
            }
            else {
                allItems = yield service_2.itemService.fetchAllItems();
            }
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Fetched successfully!",
                data: allItems,
            });
        });
    }
    fetchItemDetailBySlug(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = req.params;
            const { featured } = req.query;
            const { userId } = req;
            let itemDetails;
            let isItemSaved = false;
            if (featured === "true") {
                itemDetails = yield service_2.itemService.fetchFeaturedItemDetailsBySlug(slug);
            }
            else {
                itemDetails = yield service_2.itemService.fetchItemDetailsBySlug(slug);
            }
            if (!itemDetails) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "No item found",
                    data: null,
                });
            }
            const id = itemDetails._id;
            itemDetails.totalView += 1;
            yield itemDetails.save();
            if (userId) {
                const isSaved = yield service_4.savedItemService.checkIfItemIsSaved(id, userId);
                if (isSaved) {
                    isItemSaved = true;
                }
            }
            let category = itemDetails.category;
            let itemId = itemDetails._id;
            let similarItems = yield service_2.itemService.fetchSimilarItems(category, itemId);
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Fetched successfully!",
                data: {
                    items: itemDetails,
                    isItemSaved: isItemSaved,
                    similarItems: similarItems,
                },
            });
        });
    }
    fetchItemDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { featured } = req.query;
            const { id } = req.params;
            const { userId } = req;
            let itemDetails;
            let isItemSaved = false;
            if (featured === "true") {
                itemDetails = yield service_2.itemService.fetchFeaturedItemDetails(id);
            }
            else {
                itemDetails = yield service_2.itemService.fetchItemDetails(id);
            }
            if (!itemDetails) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "No item found",
                    data: null,
                });
            }
            itemDetails.totalView += 1;
            yield itemDetails.save();
            if (userId) {
                const isSaved = yield service_4.savedItemService.checkIfItemIsSaved(id, userId);
                if (isSaved) {
                    isItemSaved = true;
                }
            }
            let category = itemDetails.category;
            let itemId = itemDetails._id;
            let similarItems = yield service_2.itemService.fetchSimilarItems(category, itemId);
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Fetched successfully!",
                data: {
                    items: itemDetails,
                    isItemSaved: isItemSaved,
                    similarItems: similarItems,
                },
            });
        });
    }
    findAndDeleteItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const userJobListing = yield service_2.itemService.findAndDeleteItem(userId, req);
            if (!userJobListing) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Item not found!",
                    data: null,
                });
            }
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Item deleted successfully!",
                data: null,
            });
        });
    }
}
exports.itemController = new ItemController();
