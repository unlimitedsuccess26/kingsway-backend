"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const utils_1 = require("../utils");
const validator_1 = require("./validator");
const is_auth_1 = require("../middleware/is_auth");
exports.ItemRouter = (0, express_1.Router)();
//old
exports.ItemRouter.post("/create-item", [is_auth_1.isAuth, validator_1.itemValidator.createItem], (0, utils_1.wrapAsync)(controller_1.itemController.createItem));
//new
exports.ItemRouter.post("/create/item", [is_auth_1.isAuth, validator_1.itemValidator.createItem], (0, utils_1.wrapAsync)(controller_1.itemController.createItem));
//old
exports.ItemRouter.get("/fetch-items", (0, utils_1.wrapAsync)(controller_1.itemController.fetchAllItems));
//new
exports.ItemRouter.get("/items", (0, utils_1.wrapAsync)(controller_1.itemController.fetchAllItems));
//old
exports.ItemRouter.get("/fetch-item-details/:id", [is_auth_1.extactUserIdFromTokenIfLoggedIn, validator_1.itemValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.itemController.fetchItemDetails));
//new
exports.ItemRouter.get("/item/:id", [is_auth_1.extactUserIdFromTokenIfLoggedIn, validator_1.itemValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.itemController.fetchItemDetails));
exports.ItemRouter.get("/item/by/slug/:slug", [is_auth_1.extactUserIdFromTokenIfLoggedIn, validator_1.itemValidator.validateSlug], (0, utils_1.wrapAsync)(controller_1.itemController.fetchItemDetailBySlug));
exports.ItemRouter.put("/item", [is_auth_1.isAuth, validator_1.itemValidator.createItem], (0, utils_1.wrapAsync)(controller_1.itemController.editItem));
exports.ItemRouter.delete("/item/:id", [is_auth_1.isAuth, validator_1.itemValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.itemController.findAndDeleteItem));
