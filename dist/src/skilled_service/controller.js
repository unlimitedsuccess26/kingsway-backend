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
exports.skilledServiceController = void 0;
const enum_1 = require("../utils/enum");
const service_1 = require("./service");
class SkilledServiceController {
    createSkilledService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const skilledServicesExist = yield service_1.skilledServiceService.getSkilledServiceByType(req);
            if (skilledServicesExist) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "This Skiled Service Already Exist",
                    data: null,
                });
            }
            yield service_1.skilledServiceService.createSkilledService(req);
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Skiled Service creation completed",
                data: null,
            });
        });
    }
    getAllSkilledServices(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const skilledServices = yield service_1.skilledServiceService.getAllSkilledServices();
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Skilled Services Fetched Successfully!",
                data: skilledServices,
            });
        });
    }
    fetchSkilledServicesItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { categoryId } = req.query;
            const categoryIdStr = categoryId;
            const skilledServicesItems = yield service_1.skilledServiceService.fetchSkilledServicesItems(categoryIdStr);
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Fetched successfully!",
                data: skilledServicesItems,
            });
        });
    }
}
exports.skilledServiceController = new SkilledServiceController();
