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
exports.reviewController = void 0;
const enum_1 = require("../utils/enum");
const service_1 = require("../user/service");
const service_2 = require("./service");
class ReviewController {
    createReview(req, res) {
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
            const createReview = yield service_2.reviewService.createReview(userId, req);
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Review created successfully!",
                data: createReview,
            });
        });
    }
    fetchReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield service_2.reviewService.fetchReview(req);
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Review fetched successfully!",
                data: review,
            });
        });
    }
    fetchUserReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            let review = yield service_2.reviewService.fetchReviewByUserId(req, userId);
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Review fetched successfully!",
                data: review,
            });
        });
    }
}
exports.reviewController = new ReviewController();
