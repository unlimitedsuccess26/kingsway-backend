"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketPlaceRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const utils_1 = require("../utils");
const validator_1 = require("../skilled_service/validator");
exports.MarketPlaceRouter = (0, express_1.Router)();
exports.MarketPlaceRouter.post("/create-market-place", [validator_1.skilledServiceValidator.createSkilledService], (0, utils_1.wrapAsync)(controller_1.marketPlaceController.createMarketPlace));
//old
exports.MarketPlaceRouter.get("/market-places", (0, utils_1.wrapAsync)(controller_1.marketPlaceController.getAllMarketPlaces));
//new
exports.MarketPlaceRouter.get("/marketplace", (0, utils_1.wrapAsync)(controller_1.marketPlaceController.getAllMarketPlaces));
//old
exports.MarketPlaceRouter.get("/fetch-market-place-items", [validator_1.skilledServiceValidator.validateQuery], (0, utils_1.wrapAsync)(controller_1.marketPlaceController.fetchMarketPlaceItems));
//new
exports.MarketPlaceRouter.get("/marketplace/items", [validator_1.skilledServiceValidator.validateQuery], (0, utils_1.wrapAsync)(controller_1.marketPlaceController.fetchMarketPlaceItems));
