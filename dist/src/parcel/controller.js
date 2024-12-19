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
exports.createParcelController = void 0;
const enum_1 = require("../utils/enum");
const service_1 = require("./service");
class CreateParcelController {
    createParcel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            yield service_1.parcelService.createParcel(body);
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Parcel created successfully!",
                data: null,
            });
        });
    }
    fetchParcel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const parcels = yield service_1.parcelService.fetchParcel();
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Parcel fetched successfully!",
                data: parcels,
            });
        });
    }
}
exports.createParcelController = new CreateParcelController();
