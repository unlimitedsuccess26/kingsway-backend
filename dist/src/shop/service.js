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
exports.shopService = void 0;
const entity_1 = __importDefault(require("./entity"));
const entity_2 = __importDefault(require("../user/entity"));
const entity_3 = __importDefault(require("../item/entity"));
const utils_1 = require("../utils");
class ShopService {
    createShop(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, imageUrl, description } = req.body;
            const slug = (0, utils_1.slugify)(description);
            const user = yield entity_2.default.findById({
                _id: userId,
            });
            if (user) {
                const shop = new entity_1.default({
                    name: name,
                    slug,
                    shopOwnerUserId: userId,
                    imageUrl: imageUrl,
                    description: description,
                });
                yield shop.save();
                user.createdShop = true;
                yield user.save();
            }
            return user;
        });
    }
    editShop(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, imageUrl, description } = req.body;
            let shop;
            shop = yield entity_1.default.findOne({
                shopOwnerUserId: userId,
            });
            if (shop) {
                const slug = (0, utils_1.slugify)(description);
                shop.name = name;
                shop.imageUrl = imageUrl;
                shop.description = description;
                shop.slug = slug;
                shop = yield shop.save();
            }
            return shop;
        });
    }
    findShopByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const shop = yield entity_1.default.findOne({
                shopOwnerUserId: userId,
            });
            return shop;
        });
    }
    fetchAllShops() {
        return __awaiter(this, void 0, void 0, function* () {
            const shops = yield entity_1.default.find().populate("shopOwnerUserId", "firstName lastName profileImageUrl region");
            return shops;
        });
    }
    fetchShopDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const shopDetail = yield entity_1.default.findOne({ _id: id });
            return shopDetail;
        });
    }
    fetchShopDetailsBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const shopDetail = yield entity_1.default.findOne({ slug });
            return shopDetail;
        });
    }
    fetchShopDetailsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const shopDetail = yield entity_1.default.findOne({ shopOwnerUserId: userId });
            return shopDetail;
        });
    }
    fetchAllShopItems(shopId) {
        return __awaiter(this, void 0, void 0, function* () {
            const shopItems = yield entity_3.default.find({ shopId: shopId });
            return shopItems;
        });
    }
}
exports.shopService = new ShopService();
