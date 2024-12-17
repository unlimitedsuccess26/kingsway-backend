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
exports.shopController = void 0;
const enum_1 = require("../utils/enum");
const service_1 = require("../user/service");
const service_2 = require("./service");
class ShopController {
    createShop(req, res) {
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
            const shopExist = yield service_2.shopService.findShopByUserId(userId);
            if (shopExist) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "You already have a shop!",
                    data: null,
                });
            }
            yield service_2.shopService.createShop(userId, req);
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Shop Created successfully!",
                data: userData,
            });
        });
    }
    editShop(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const userData = yield service_1.userService.findUserById(userId);
            if (!userData) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "User does not exist!",
                    data: null,
                });
            }
            const shop = yield service_2.shopService.editShop(userId, req);
            if (!shop) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Success,
                    description: "Shop not found!",
                    data: shop,
                });
            }
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Shop edited successfully!",
                data: shop,
            });
        });
    }
    fetchAllShops(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allShops = yield service_2.shopService.fetchAllShops();
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Fetched successfully!",
                data: allShops,
            });
        });
    }
    fetchShopDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const shopDetails = yield service_2.shopService.fetchShopDetails(id);
            if (!shopDetails) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "No shop found!",
                    data: null,
                });
            }
            const shopId = shopDetails._id;
            const allShopItems = yield service_2.shopService.fetchAllShopItems(shopId);
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Fetched successfully!",
                data: {
                    shopDetails: shopDetails,
                    allShopItems: allShopItems,
                },
            });
        });
    }
    fetchShopDetailsSlug(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = req.params;
            const shopDetails = yield service_2.shopService.fetchShopDetailsBySlug(slug);
            if (!shopDetails) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "No shop found!",
                    data: null,
                });
            }
            const shopId = shopDetails._id;
            const allShopItems = yield service_2.shopService.fetchAllShopItems(shopId);
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Fetched successfully!",
                data: {
                    shopDetails: shopDetails,
                    allShopItems: allShopItems,
                },
            });
        });
    }
}
exports.shopController = new ShopController();
