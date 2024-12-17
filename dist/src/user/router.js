"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const utils_1 = require("../utils");
const is_auth_1 = require("../middleware/is_auth");
const validator_1 = require("./validator");
const validator_2 = require("../service/validator");
const validator_3 = require("../item/validator");
const validator_4 = require("../job/validator");
exports.UserRouter = (0, express_1.Router)();
//old
exports.UserRouter.get("/user-profile", [is_auth_1.isAuth], (0, utils_1.wrapAsync)(controller_1.userController.fetchUserData));
//new
exports.UserRouter.get("/user/profile", [is_auth_1.isAuth], (0, utils_1.wrapAsync)(controller_1.userController.fetchUserData));
//old
exports.UserRouter.patch("/update-user-profile", [is_auth_1.isAuth, validator_1.userValidator.updateUserData], (0, utils_1.wrapAsync)(controller_1.userController.updateUserData));
//new
exports.UserRouter.patch("/user/profile", [is_auth_1.isAuth, validator_1.userValidator.updateUserData], (0, utils_1.wrapAsync)(controller_1.userController.updateUserData));
//old
exports.UserRouter.patch("/change-user-password", [is_auth_1.isAuth, validator_1.userValidator.changeUserPassword], (0, utils_1.wrapAsync)(controller_1.userController.changeUserPassword));
//new
exports.UserRouter.patch("/change/password", [is_auth_1.isAuth, validator_1.userValidator.changeUserPassword], (0, utils_1.wrapAsync)(controller_1.userController.changeUserPassword));
//old
exports.UserRouter.get("/fetch-user-service", [is_auth_1.isAuth], (0, utils_1.wrapAsync)(controller_1.userController.fetchUserService));
//new
exports.UserRouter.get("/user/services", [is_auth_1.isAuth], (0, utils_1.wrapAsync)(controller_1.userController.fetchUserService));
//old
exports.UserRouter.patch("/update-user-service-skills", [is_auth_1.isAuth, validator_2.serviceValidator.updateUserServiceSkills], (0, utils_1.wrapAsync)(controller_1.userController.updateUserServiceSkills));
//new
exports.UserRouter.patch("/user/service/skills", [is_auth_1.isAuth, validator_2.serviceValidator.updateUserServiceSkills], (0, utils_1.wrapAsync)(controller_1.userController.updateUserServiceSkills));
//old
exports.UserRouter.patch("/update-user-service-description", [is_auth_1.isAuth, validator_2.serviceValidator.updateUserServiceDescription], (0, utils_1.wrapAsync)(controller_1.userController.updateUserServiceDescription));
//new
exports.UserRouter.patch("/user/service/description", [is_auth_1.isAuth, validator_2.serviceValidator.updateUserServiceDescription], (0, utils_1.wrapAsync)(controller_1.userController.updateUserServiceDescription));
//old
exports.UserRouter.patch("/update-user-service-images", [is_auth_1.isAuth, validator_2.serviceValidator.updateUserServiceImages], (0, utils_1.wrapAsync)(controller_1.userController.updateUserServiceImages));
//new
exports.UserRouter.patch("/user/service/images", [is_auth_1.isAuth, validator_2.serviceValidator.updateUserServiceImages], (0, utils_1.wrapAsync)(controller_1.userController.updateUserServiceImages));
//old
exports.UserRouter.patch("/update-user-service-available-to-work", [is_auth_1.isAuth, validator_2.serviceValidator.updateUserServiceAvailableToWork], (0, utils_1.wrapAsync)(controller_1.userController.updateUserServiceAvailableToWork));
//new
exports.UserRouter.patch("/user/service/work/availability", [is_auth_1.isAuth, validator_2.serviceValidator.updateUserServiceAvailableToWork], (0, utils_1.wrapAsync)(controller_1.userController.updateUserServiceAvailableToWork));
//old
exports.UserRouter.get("/fetch-user-job-listing", [is_auth_1.isAuth], (0, utils_1.wrapAsync)(controller_1.userController.findUserJobListings));
//new
exports.UserRouter.get("/user/job/listings", [is_auth_1.isAuth], (0, utils_1.wrapAsync)(controller_1.userController.findUserJobListings));
//old
exports.UserRouter.patch("/mark-job-listing-as-seen/:id", [is_auth_1.isAuth, validator_3.itemValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.userController.markUserJobListingAsSeen));
//new
exports.UserRouter.patch("/mark/job/listing/as/seen/:id", [is_auth_1.isAuth, validator_3.itemValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.userController.markUserJobListingAsSeen));
//old
exports.UserRouter.get("/user-job-listing-details/:id", [is_auth_1.isAuth, validator_3.itemValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.userController.findUserJobListingDetails));
//new
exports.UserRouter.get("/user/job/listing/:id", [is_auth_1.isAuth, validator_3.itemValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.userController.findUserJobListingDetails));
//old
exports.UserRouter.delete("/user-job-listing/:id", [is_auth_1.isAuth, validator_3.itemValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.userController.findAndDeleteUserJobListing));
//new
exports.UserRouter.delete("/user/job/listing/:id", [is_auth_1.isAuth, validator_3.itemValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.userController.findAndDeleteUserJobListing));
//old
exports.UserRouter.put("/user-job-listing/:id", [is_auth_1.isAuth, validator_3.itemValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.userController.findAndEditUserJobListing));
//new
exports.UserRouter.put("/user/job/listing/:id", [is_auth_1.isAuth, validator_3.itemValidator.validateParams, validator_4.jobValidator.createJob], (0, utils_1.wrapAsync)(controller_1.userController.findAndEditUserJobListing));
//old
exports.UserRouter.get("/user-shop-items", [is_auth_1.isAuth], (0, utils_1.wrapAsync)(controller_1.userController.fetchUserShopItems));
//new
exports.UserRouter.get("/user/shop/items", [is_auth_1.isAuth], (0, utils_1.wrapAsync)(controller_1.userController.fetchUserShopItems));
//old
exports.UserRouter.patch("/mark-item-as-sold/:id", [is_auth_1.isAuth, validator_3.itemValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.userController.markUserItemAsSold));
//new
exports.UserRouter.patch("/user/mark/item/as/sold/:id", [is_auth_1.isAuth, validator_3.itemValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.userController.markUserItemAsSold));
//old
exports.UserRouter.patch("/mark-item-as-out-of-stock/:id", [is_auth_1.isAuth, validator_3.itemValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.userController.markUserItemAsOutofStock));
//new
exports.UserRouter.patch("/user/mark/item/as/out/of/stock/:id", [is_auth_1.isAuth, validator_3.itemValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.userController.markUserItemAsOutofStock));
//old
exports.UserRouter.get("/user-item-details/:id", [is_auth_1.isAuth, validator_3.itemValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.userController.findUserItemDetails));
//new
exports.UserRouter.get("/user/item/:id", [is_auth_1.isAuth, validator_3.itemValidator.validateParams], (0, utils_1.wrapAsync)(controller_1.userController.findUserItemDetails));
exports.UserRouter.delete("/user/delete", [is_auth_1.isAuth, validator_1.userValidator.deleteUser], (0, utils_1.wrapAsync)(controller_1.userController.deleteUser));
