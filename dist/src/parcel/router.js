"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const utils_1 = require("../utils");
const validator_1 = require("./validator");
exports.ParcelRouter = (0, express_1.Router)();
//create Parcel
exports.ParcelRouter.post("/create/parcel", [validator_1.createParcelValidator.createParcel], (0, utils_1.wrapAsync)(controller_1.createParcelController.createParcel));