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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobService = void 0;
const entity_1 = __importDefault(require("./entity"));
const entity_2 = __importDefault(require("../saved_items/entity"));
const mongoose_1 = require("mongoose");
const utils_1 = require("../utils");
class JobService {
    createJob(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, images, description, location, skill } = req.body;
            const slug = (0, utils_1.slugify)(description);
            const newJob = new entity_1.default({
                name: name,
                slug,
                images: images,
                userId: userId,
                description: description,
                location: location,
                skill: skill,
            });
            yield newJob.save();
            return newJob;
        });
    }
    fetchAllJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            // use the userId refernce which was defined in the Job Entity to query the user db to extract the first and last name
            const jobs = yield entity_1.default.find({ seen: "no" }).populate("userId", "firstName lastName profileImageUrl");
            return jobs;
        });
    }
    fetchJobDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobDetail = yield entity_1.default.findOne({ _id: id, seen: "no" }).populate("userId", "firstName lastName region profileImageUrl phoneNumber");
            if (jobDetail) {
                jobDetail.totalView += 1;
                yield jobDetail.save();
            }
            return jobDetail;
        });
    }
    fetchJobDetailsBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobDetail = yield entity_1.default.findOne({ slug, seen: "no" }).populate("userId", "firstName lastName region profileImageUrl phoneNumber");
            if (jobDetail) {
                jobDetail.totalView += 1;
                yield jobDetail.save();
            }
            return jobDetail;
        });
    }
    findUserJobListings(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const objUserId = new mongoose_1.Types.ObjectId(String(userId));
            const userJobListing = yield entity_1.default.find({ userId: objUserId });
            return userJobListing;
        });
    }
    findUserJobListingDetails(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const objUserId = new mongoose_1.Types.ObjectId(String(userId));
            const userJobListing = yield entity_1.default.findOne({ userId: objUserId, _id: id });
            return userJobListing;
        });
    }
    findAndDeleteUserJobListing(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const objUserId = new mongoose_1.Types.ObjectId(String(userId));
            const objId = new mongoose_1.Types.ObjectId(String(id));
            const userJobListing = yield entity_1.default.findOneAndDelete({
                userId: objUserId,
                _id: id,
            });
            yield entity_2.default.findOneAndDelete({ userId: objUserId, "favItem.job": objId });
            return userJobListing;
        });
    }
    findAndEditUserJobListing(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, images, description, location, skill } = req.body;
            const objUserId = new mongoose_1.Types.ObjectId(String(userId));
            let userJobListing;
            userJobListing = yield entity_1.default.findOne({
                userId: objUserId,
                _id: id,
            });
            if (userJobListing) {
                const slug = (0, utils_1.slugify)(description);
                userJobListing.name = name;
                userJobListing.images = images;
                userJobListing.description = description;
                userJobListing.location = location;
                userJobListing.skill = skill;
                userJobListing.slug = slug;
                userJobListing = yield userJobListing.save();
            }
            return userJobListing;
        });
    }
    markUserJobListingAsSeen(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const objUserId = new mongoose_1.Types.ObjectId(String(userId));
            const userJobListing = yield entity_1.default.findOne({ userId: objUserId, _id: id });
            if (userJobListing) {
                userJobListing.seen = "yes";
                yield userJobListing.save();
            }
            return userJobListing;
        });
    }
}
exports.jobService = new JobService();
