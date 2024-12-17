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
exports.reportController = void 0;
const enum_1 = require("../utils/enum");
const service_1 = require("../user/service");
const service_2 = require("./service");
class ReportController {
    reportUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const { accusedUserId } = req.body;
            const userExist = yield service_1.userService.findUserById(accusedUserId);
            if (!userExist) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Sorry the user you are reporting does not exist!",
                    data: null,
                });
            }
            const updatedUserData = yield service_2.reportService.reportUser(userId, req);
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Report submitted successfully!",
                data: updatedUserData,
            });
        });
    }
}
exports.reportController = new ReportController();
