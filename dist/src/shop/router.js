"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const utils_1 = require("../utils");
const validator_1 = require("./validator");
const validator_2 = require("../item/validator");
const is_auth_1 = require("../middleware/is_auth");
exports.ShopRouter = (0, express_1.Router)();
//old
exports.ShopRouter.post("/create-shop", [is_auth_1.isAuth, validator_1.shopValidator.createStore], (0, utils_1.wrapAsync)(controller_1.shopController.createShop));
//new
exports.ShopRouter.post("/shop", [is_auth_1.isAuth, validator_1.shopValidator.createStore], (0, utils_1.wrapAsync)(controller_1.shopController.createShop));
//old
exports.ShopRouter.get("/all-shops", (0, utils_1.wrapAsync)(controller_1.shopController.fetchAllShops));
//new
exports.ShopRouter.get("/shops", (0, utils_1.wrapAsync)(controller_1.shopController.fetchAllShops));
//old
exports.ShopRouter.get("/fetch-shop-details/:id", [validator_2.itemValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.shopController.fetchShopDetails));
//new
exports.ShopRouter.get("/shop/:id", [validator_2.itemValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.shopController.fetchShopDetails));
//old
exports.ShopRouter.get("/fetch-shop-details/:slug", [validator_2.itemValidator.validateSlug], (0, utils_1.wrapAsync)(controller_1.shopController.fetchShopDetailsSlug));
//new
exports.ShopRouter.get("/shop/by/slug/:slug", [validator_2.itemValidator.validateSlug], (0, utils_1.wrapAsync)(controller_1.shopController.fetchShopDetailsSlug));
exports.ShopRouter.put("/shop", [is_auth_1.isAuth, validator_1.shopValidator.createStore], (0, utils_1.wrapAsync)(controller_1.shopController.editShop));
