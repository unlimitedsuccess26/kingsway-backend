"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const utils_1 = require("../utils");
const validator_1 = require("./validator");
const isAuth_1 = require("../middleware/isAuth");
exports.ParcelRouter = (0, express_1.Router)();
//create Parcel
exports.ParcelRouter.post("/create/parcel", [isAuth_1.isAuth, validator_1.parcelValidator.createParcel], (0, utils_1.wrapAsync)(controller_1.createParcelController.createParcel));
//fetch parcel
exports.ParcelRouter.get("/parcel", [isAuth_1.isAuth], (0, utils_1.wrapAsync)(controller_1.createParcelController.fetchParcel));
//Delete a single parcel with _id
exports.ParcelRouter.delete("/parcel/:id", [isAuth_1.isAuth, validator_1.parcelValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.createParcelController.deleteParcel));
