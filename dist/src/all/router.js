"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const utils_1 = require("../utils");
const validator_1 = require("./validator");
exports.AllRouter = (0, express_1.Router)();
//mobile app
exports.AllRouter.get("/fetch-all", (0, utils_1.wrapAsync)(controller_1.allController.fetchAllForMobileApp));
//webApp
exports.AllRouter.get("/all", (0, utils_1.wrapAsync)(controller_1.allController.fetchAllForWebApp));
exports.AllRouter.get("/search", [validator_1.allValidator.searchQuery], (0, utils_1.wrapAsync)(controller_1.allController.generalSearch));
exports.AllRouter.get("/search/filter", [validator_1.allValidator.searchQuery], (0, utils_1.wrapAsync)(controller_1.allController.generalSearchFilter));
