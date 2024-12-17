"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedItemsRouter = void 0;
const express_1 = require("express");
const controlller_1 = require("./controlller");
const utils_1 = require("../utils");
const is_auth_1 = require("../middleware/is_auth");
const validator_1 = require("./validator");
exports.SavedItemsRouter = (0, express_1.Router)();
//old
exports.SavedItemsRouter.patch("/update-save-items", [is_auth_1.isAuth, validator_1.savedItemValidator.toggleUserSavedItem], (0, utils_1.wrapAsync)(controlller_1.savedItemController.toggleUserSavedItem));
//new
exports.SavedItemsRouter.patch("/saved/item", [is_auth_1.isAuth, validator_1.savedItemValidator.toggleUserSavedItem], (0, utils_1.wrapAsync)(controlller_1.savedItemController.toggleUserSavedItem));
//old
exports.SavedItemsRouter.get("/fetch-save-items", [is_auth_1.isAuth], (0, utils_1.wrapAsync)(controlller_1.savedItemController.fetchUserSavedItem));
//new
exports.SavedItemsRouter.get("/saved/items", [is_auth_1.isAuth], (0, utils_1.wrapAsync)(controlller_1.savedItemController.fetchUserSavedItem));
