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
exports.marketPlaceService = void 0;
const entity_1 = __importDefault(require("./entity"));
const entity_2 = __importDefault(require("../item/entity"));
class MarketPlaceService {
    createMarketPlace(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, imageUrl, type } = req.body;
            const marketPlace = new entity_1.default({
                name,
                imageUrl,
                type
            });
            yield marketPlace.save();
            return marketPlace;
        });
    }
    getAllMarketPlaces() {
        return __awaiter(this, void 0, void 0, function* () {
            const marketPlace = yield entity_1.default.find();
            return marketPlace;
        });
    }
    getMarketPlaceByType(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type } = req.body;
            const skilledServices = yield entity_1.default.findOne({ type });
            return skilledServices;
        });
    }
    fetchMarketPlaceItems(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            //Items that matches any categoryId in the category array
            const marketPlaceItems = yield entity_2.default.find({
                category: { $in: [categoryId] }
            }).populate("shopId", "shopOwnerUserId name");
            return marketPlaceItems;
        });
    }
}
exports.marketPlaceService = new MarketPlaceService();
