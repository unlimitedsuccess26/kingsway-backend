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
exports.jobController = void 0;
const enum_1 = require("../utils/enum");
const service_1 = require("../user/service");
const service_2 = require("./service");
const service_3 = require("../saved_items/service");
class JobController {
    createJob(req, res) {
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
            yield service_2.jobService.createJob(userId, req);
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Job Created successfully!",
                data: null,
            });
        });
    }
    fetchAllJobs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allJobs = yield service_2.jobService.fetchAllJobs();
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Fetched successfully!",
                data: allJobs,
            });
        });
    }
    fetchJobDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { userId } = req;
            let jobDetails = yield service_2.jobService.fetchJobDetails(id);
            let isItemSaved = false;
            if (!jobDetails) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "No job found",
                    data: null,
                });
            }
            if (userId) {
                const isSaved = yield service_3.savedItemService.checkIfItemIsSaved(id, userId);
                if (isSaved) {
                    isItemSaved = true;
                }
            }
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Fetched successfully!",
                data: { jobDetails: jobDetails, isItemSaved: isItemSaved },
            });
        });
    }
    fetchJobDetailsBySlug(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = req.params;
            const { userId } = req;
            let jobDetails = yield service_2.jobService.fetchJobDetailsBySlug(slug);
            let isItemSaved = false;
            if (!jobDetails) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "No job found",
                    data: null,
                });
            }
            const id = jobDetails._id;
            if (userId) {
                const isSaved = yield service_3.savedItemService.checkIfItemIsSaved(id, userId);
                if (isSaved) {
                    isItemSaved = true;
                }
            }
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Fetched successfully!",
                data: { jobDetails: jobDetails, isItemSaved: isItemSaved },
            });
        });
    }
}
exports.jobController = new JobController();
