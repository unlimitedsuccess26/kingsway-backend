"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkilledServiceRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const utils_1 = require("../utils");
const validator_1 = require("./validator");
exports.SkilledServiceRouter = (0, express_1.Router)();
exports.SkilledServiceRouter.post("/create-skilled-service", [validator_1.skilledServiceValidator.createSkilledService], (0, utils_1.wrapAsync)(controller_1.skilledServiceController.createSkilledService));
//old
exports.SkilledServiceRouter.get("/skilled-services", (0, utils_1.wrapAsync)(controller_1.skilledServiceController.getAllSkilledServices));
//new
exports.SkilledServiceRouter.get("/skilled/services", (0, utils_1.wrapAsync)(controller_1.skilledServiceController.getAllSkilledServices));
//old
exports.SkilledServiceRouter.get("/fetch-skilled-services-items", [validator_1.skilledServiceValidator.validateQuery], (0, utils_1.wrapAsync)(controller_1.skilledServiceController.fetchSkilledServicesItems));
//new
exports.SkilledServiceRouter.get("/skilledservice/items", [validator_1.skilledServiceValidator.validateQuery], (0, utils_1.wrapAsync)(controller_1.skilledServiceController.fetchSkilledServicesItems));
