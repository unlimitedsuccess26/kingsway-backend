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
exports.marketPlaceController = void 0;
const enum_1 = require("../utils/enum");
const service_1 = require("./service");
class MarketPlaceController {
    createMarketPlace(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const marketPlaceExist = yield service_1.marketPlaceService.getMarketPlaceByType(req);
            if (marketPlaceExist) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Market Place Already Exist",
                    data: null,
                });
            }
            yield service_1.marketPlaceService.createMarketPlace(req);
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Market Place creation completed!",
                data: null,
            });
        });
    }
    getAllMarketPlaces(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const marketPlaces = yield service_1.marketPlaceService.getAllMarketPlaces();
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Market Place Fetched Successfully!",
                data: marketPlaces,
            });
        });
    }
    fetchMarketPlaceItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { categoryId } = req.query;
            const categoryIdStr = categoryId;
            const marketPlaceItems = yield service_1.marketPlaceService.fetchMarketPlaceItems(categoryIdStr);
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Fetched successfully!",
                data: marketPlaceItems,
            });
        });
    }
}
exports.marketPlaceController = new MarketPlaceController();
