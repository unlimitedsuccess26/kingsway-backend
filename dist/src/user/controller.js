"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const enum_1 = require("../utils/enum");
const service_1 = require("./service");
const service_2 = require("../service/service");
const service_3 = require("../job/service");
const service_4 = require("../item/service");
const service_5 = require("../shop/service");
const auth_1 = require("../utils/auth");
class UserController {
    fetchUserData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const userData = yield service_1.userService.findUserById(userId);
            if (!userData) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "User does not exist",
                    data: null,
                });
            }
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "User details retrived successfully!",
                data: userData,
            });
        });
    }
    updateUserData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const userExist = yield service_1.userService.findUserById(userId);
            if (!userExist) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "User does not exist",
                    data: null,
                });
            }
            const updatedUserData = yield service_1.userService.updateUserDataById(userId, req);
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Your details is updated successfully!",
                data: updatedUserData,
            });
        });
    }
    changeUserPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const { newPassword, oldPassword } = req.body;
            const userExist = yield service_1.userService.findUserByIdWithPassword(userId);
            if (!userExist) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "User does not exist",
                    data: null,
                });
            }
            const match = yield (0, auth_1.comparePassword)(oldPassword, userExist.password);
            if (!match) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Invalid Password!",
                    data: null,
                });
            }
            yield service_1.userService.updateUserPasswordById(userId, newPassword);
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Your password is changed successfully!",
                data: null,
            });
        });
    }
    fetchUserService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const userService = yield service_2.servicesService.findServiceByUserId(userId);
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Service fetched successfully!",
                data: userService,
            });
        });
    }
    findUserJobListings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const userJobListing = yield service_3.jobService.findUserJobListings(userId);
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Job listing fetched successfully!",
                data: userJobListing,
            });
        });
    }
    findUserJobListingDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const userJobListing = yield service_3.jobService.findUserJobListingDetails(userId, req);
            if (!userJobListing) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Job listing not found!",
                    data: null,
                });
            }
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Job listing fetched successfully!",
                data: userJobListing,
            });
        });
    }
    findAndDeleteUserJobListing(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const userJobListing = yield service_3.jobService.findAndDeleteUserJobListing(userId, req);
            if (!userJobListing) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Job listing not found!",
                    data: null,
                });
            }
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Job listing deleted successfully!",
                data: null,
            });
        });
    }
    findAndEditUserJobListing(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const userJobListing = yield service_3.jobService.findAndEditUserJobListing(userId, req);
            if (!userJobListing) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Job listing not found!",
                    data: null,
                });
            }
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Job listing updated successfully!",
                data: null,
            });
        });
    }
    fetchUserShopItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const shopDetails = yield service_5.shopService.fetchShopDetailsByUserId(userId);
            if (!shopDetails) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "No shop found!",
                    data: null,
                });
            }
            const shopId = shopDetails._id;
            const allShopItems = yield service_5.shopService.fetchAllShopItems(shopId);
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Fetched successfully!",
                data: {
                    shopDetails: shopDetails,
                    allShopItems: allShopItems
                },
            });
        });
    }
    markUserItemAsSold(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const markAsSold = yield service_4.itemService.markUserItemAsSold(userId, req);
            if (!markAsSold) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Item not found!",
                    data: null,
                });
            }
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Item marked as sold!",
                data: null,
            });
        });
    }
    markUserItemAsOutofStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const markAsSold = yield service_4.itemService.markUserItemAsOutOfStock(userId, req);
            if (!markAsSold) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Item not found!",
                    data: null,
                });
            }
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Item marked as out of stock!",
                data: null,
            });
        });
    }
    markUserJobListingAsSeen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const markAsSeen = yield service_3.jobService.markUserJobListingAsSeen(userId, req);
            if (!markAsSeen) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Job listing not found!",
                    data: null,
                });
            }
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Job listing marked as seen!",
                data: null,
            });
        });
    }
    updateUserServiceSkills(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const updatedUserService = yield service_2.servicesService.updateUserServiceSkills(userId, req);
            if (!updatedUserService) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "User does not exist",
                    data: null,
                });
            }
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Service skills updated successfully!",
                data: updatedUserService,
            });
        });
    }
    updateUserServiceDescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const updatedUserServiceDescription = yield service_2.servicesService.updateUserServiceDescription(userId, req);
            if (!updatedUserServiceDescription) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "User does not exist",
                    data: null,
                });
            }
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Service description updated successfully!",
                data: updatedUserServiceDescription,
            });
        });
    }
    updateUserServiceImages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const updatedUserServiceImages = yield service_2.servicesService.updateUserServiceImages(userId, req);
            if (!updatedUserServiceImages) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "User does not exist",
                    data: null,
                });
            }
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Service images updated successfully!",
                data: updatedUserServiceImages,
            });
        });
    }
    updateUserServiceAvailableToWork(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const updatedUserServiceImages = yield service_2.servicesService.updateUserServiceAvailableToWork(userId, req);
            if (!updatedUserServiceImages) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "User does not exist",
                    data: null,
                });
            }
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Service availability updated successfully!",
                data: updatedUserServiceImages,
            });
        });
    }
    findUserItemDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const userItemDetail = yield service_4.itemService.findUserItemDetails(userId, req);
            if (!userItemDetail) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "No item not found!",
                    data: null,
                });
            }
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "User item fetched successfully!",
                data: userItemDetail,
            });
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const { password } = req.body;
            const userExists = yield service_1.userService.findUserByIdWithPassword(userId);
            if (!userExists) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "User does not exist",
                    data: null,
                });
            }
            const match = yield (0, auth_1.comparePassword)(password, userExists.password);
            if (!match) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Wrong user credentials!",
                    data: null,
                });
            }
            yield service_1.userService.findUserByIdAndDelete(userId);
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "User deleted!",
                data: null,
            });
        });
    }
}
exports.userController = new UserController();
