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
exports.allController = void 0;
const enum_1 = require("../utils/enum");
;
const services_1 = require("./services");
class AllController {
    fetchAllForMobileApp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const all = yield services_1.allService.allForMobileApp();
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Fetched successfully!",
                data: all,
            });
        });
    }
    fetchAllForWebApp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const all = yield services_1.allService.allForWebApp();
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Fetched successfully!",
                data: all,
            });
        });
    }
    generalSearch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { word } = req.query;
            const result = yield services_1.allService.generalSearch(word);
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Fetched successfully!",
                data: result,
            });
        });
    }
    generalSearchFilter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield services_1.allService.generalFilterSearch(req);
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Fetched successfully!",
                data: result,
            });
        });
    }
}
exports.allController = new AllController();
