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
exports.serviceController = void 0;
const enum_1 = require("../utils/enum");
const service_1 = require("../user/service");
const service_2 = require("./service");
const service_3 = require("../saved_items/service");
class ServiceController {
    createService(req, res) {
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
            const serviceExist = yield service_2.servicesService.findServiceByUserId(userId);
            if (serviceExist) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "You have already created a service!",
                    data: null,
                });
            }
            yield service_2.servicesService.createService(userId, req);
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Service Created successfully!",
                data: null,
            });
        });
    }
    fetchAllServices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allItems = yield service_2.servicesService.fetchAllServices();
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Fetched successfully!",
                data: allItems,
            });
        });
    }
    fetchServiceDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { userId } = req;
            let isServiceSaved = false;
            let servicesDetails = yield service_2.servicesService.fetchServiceDetails(id);
            if (!servicesDetails) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "No service found",
                    data: null,
                });
            }
            const categoryIds = yield service_2.servicesService.fetchServiceCategory(id);
            const retrivedServiceId = servicesDetails._id;
            let similarServices = yield service_2.servicesService.fetchSimilarServices(categoryIds, retrivedServiceId);
            if (userId) {
                const isSaved = yield service_3.savedItemService.checkIfItemIsSaved(id, userId);
                if (isSaved) {
                    isServiceSaved = true;
                }
            }
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Fetched successfully!",
                data: {
                    service: servicesDetails,
                    isServiceSaved: isServiceSaved,
                    similarServices: similarServices,
                },
            });
        });
    }
    fetchServiceDetailsBySlug(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = req.params;
            const { userId } = req;
            let isServiceSaved = false;
            let servicesDetails = yield service_2.servicesService.fetchServiceDetailsBySlug(slug);
            if (!servicesDetails) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "No service found",
                    data: null,
                });
            }
            const id = servicesDetails._id;
            const categoryIds = yield service_2.servicesService.fetchServiceCategory(id);
            const retrivedServiceId = servicesDetails._id;
            let similarServices = yield service_2.servicesService.fetchSimilarServices(categoryIds, retrivedServiceId);
            if (userId) {
                const isSaved = yield service_3.savedItemService.checkIfItemIsSaved(id, userId);
                if (isSaved) {
                    isServiceSaved = true;
                }
            }
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Fetched successfully!",
                data: {
                    service: servicesDetails,
                    isServiceSaved: isServiceSaved,
                    similarServices: similarServices,
                },
            });
        });
    }
}
exports.serviceController = new ServiceController();
