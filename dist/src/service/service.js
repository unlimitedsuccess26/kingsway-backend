"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicesService = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const entity_1 = __importDefault(require("./entity"));
const utils_1 = require("../utils");
class ServicesService {
    createService(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { images, description, service } = req.body;
            const slug = (0, utils_1.slugify)(description);
            const newJob = new entity_1.default({
                service: service,
                slug,
                images: images !== null && images !== void 0 ? images : [],
                userId: userId,
                description: description,
            });
            yield newJob.save();
            return newJob;
        });
    }
    findServiceByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const objUserId = new mongoose_1.Types.ObjectId(String(userId));
            const service = yield entity_1.default.findOne({ userId: objUserId });
            return service;
        });
    }
    fetchAllServices() {
        return __awaiter(this, void 0, void 0, function* () {
            const services = yield entity_1.default.find().populate("userId", "firstName lastName region profileImageUrl");
            return services;
        });
    }
    fetchServiceDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let service = yield entity_1.default.findOne({ _id: id }).populate("userId", "firstName lastName region profileImageUrl phoneNumber");
            if (service) {
                service.totalView += 1;
                service = yield service.save();
            }
            return service;
        });
    }
    fetchServiceDetailsBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            let service = yield entity_1.default.findOne({ slug }).populate("userId", "firstName lastName region profileImageUrl phoneNumber");
            if (service) {
                service.totalView += 1;
                service = yield service.save();
            }
            return service;
        });
    }
    fetchServiceCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Using the $unwind operator to deconstruct the service array and then the $group operator to collect all categories into a single array:
            //$project Specifies the fields to include or exclude in the output documents. In this case, we include only the categories array and exclude the _id field.
            const result = yield entity_1.default.aggregate([
                { $match: { _id: new mongoose_1.default.Types.ObjectId(id) } }, // Match documents by _id
                { $unwind: "$service" }, // Deconstruct the service array
                { $group: { _id: null, categories: { $addToSet: "$service.category" } } }, // Collect all categories into a single array
                { $project: { _id: 0, categories: 1 } }, // Exclude the _id field in the output
            ]);
            const categories = result.length > 0 ? result[0].categories : [];
            return categories;
        });
    }
    fetchSimilarServices(skills, id) {
        return __awaiter(this, void 0, void 0, function* () {
            //check if any item in of skill matches any item in the array coming as an argument
            const similarServices = yield entity_1.default.find({
                skill: { $in: skills },
                //Item where the id does not match
                _id: { $ne: new mongoose_1.Types.ObjectId(id) },
            }).populate("userId", "firstName lastName region profileImageUrl");
            return similarServices;
        });
    }
    updateUserServiceSkills(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { service } = req.body;
            const objUserId = new mongoose_1.Types.ObjectId(String(userId));
            const userService = yield entity_1.default.findOne({ userId: objUserId });
            if (userService) {
                userService.service = service;
                yield userService.save();
            }
            return userService;
        });
    }
    updateUserServiceDescription(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description } = req.body;
            const objUserId = new mongoose_1.Types.ObjectId(String(userId));
            const userService = yield entity_1.default.findOne({ userId: objUserId });
            if (userService) {
                const slug = (0, utils_1.slugify)(description);
                userService.description = description;
                userService.slug = slug;
                yield userService.save();
            }
            return userService;
        });
    }
    updateUserServiceImages(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { images } = req.body;
            const objUserId = new mongoose_1.Types.ObjectId(String(userId));
            const userService = yield entity_1.default.findOne({ userId: objUserId });
            if (userService) {
                userService.images = images;
                yield userService.save();
            }
            return userService;
        });
    }
    updateUserServiceAvailableToWork(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { availableToWork } = req.body;
            const objUserId = new mongoose_1.Types.ObjectId(String(userId));
            const userService = yield entity_1.default.findOne({ userId: objUserId });
            if (userService) {
                userService.availableToWork = availableToWork;
                yield userService.save();
            }
            return userService;
        });
    }
}
exports.servicesService = new ServicesService();
