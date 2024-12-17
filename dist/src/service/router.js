"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const utils_1 = require("../utils");
const validator_1 = require("./validator");
const validator_2 = require("../item/validator");
const is_auth_1 = require("../middleware/is_auth");
exports.ServiceRouter = (0, express_1.Router)();
//old
exports.ServiceRouter.post("/create-service", [is_auth_1.isAuth, validator_1.serviceValidator.createService], (0, utils_1.wrapAsync)(controller_1.serviceController.createService));
//new
exports.ServiceRouter.post("/service", [is_auth_1.isAuth, validator_1.serviceValidator.createService], (0, utils_1.wrapAsync)(controller_1.serviceController.createService));
//old
exports.ServiceRouter.get("/fetch-services", (0, utils_1.wrapAsync)(controller_1.serviceController.fetchAllServices));
//new
exports.ServiceRouter.get("/services", (0, utils_1.wrapAsync)(controller_1.serviceController.fetchAllServices));
//old
exports.ServiceRouter.get("/fetch-service-details/:id", [is_auth_1.extactUserIdFromTokenIfLoggedIn, validator_2.itemValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.serviceController.fetchServiceDetails));
//new
exports.ServiceRouter.get("/service/:id", [is_auth_1.extactUserIdFromTokenIfLoggedIn, validator_2.itemValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.serviceController.fetchServiceDetails));
//old
exports.ServiceRouter.get("/fetch-service-details/:slug", [is_auth_1.extactUserIdFromTokenIfLoggedIn, validator_2.itemValidator.validateSlug], (0, utils_1.wrapAsync)(controller_1.serviceController.fetchServiceDetailsBySlug));
//new
exports.ServiceRouter.get("/service/by/slug/:slug", [is_auth_1.extactUserIdFromTokenIfLoggedIn, validator_2.itemValidator.validateSlug], (0, utils_1.wrapAsync)(controller_1.serviceController.fetchServiceDetailsBySlug));
