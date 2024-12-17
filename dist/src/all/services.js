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
exports.allService = void 0;
const entity_1 = __importDefault(require("../item/entity"));
const entity_2 = __importDefault(require("../job/entity"));
const entity_3 = __importDefault(require("../service/entity"));
const entity_4 = __importDefault(require("../shop/entity"));
class AllService {
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    allForMobileApp() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield entity_1.default.find({ outOfStock: "no", sold: "no" }).populate("shopId", "shopOwnerUserId name");
            // use the userId refernce which was defined in the Job Entity to query the user db to extract the first and last name
            const jobs = yield entity_2.default.find().populate("userId", "firstName lastName profileImageUrl");
            const services = yield entity_3.default.find().populate("userId", "firstName lastName region profileImageUrl");
            const totalItems = [...items, ...jobs, ...services];
            const shuffledData = this.shuffle(totalItems);
            return shuffledData;
        });
    }
    allForWebApp() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield entity_1.default.find({ outOfStock: "no", sold: "no" }).populate("shopId", "shopOwnerUserId name");
            // use the userId refernce which was defined in the Job Entity to query the user db to extract the first and last name
            const jobs = yield entity_2.default.find().populate("userId", "firstName lastName profileImageUrl");
            const services = yield entity_3.default.find().populate("userId", "firstName lastName region profileImageUrl");
            const shops = yield entity_4.default.find().populate("shopOwnerUserId", "firstName lastName profileImageUrl region");
            const totalItems = [...items, ...jobs, ...services, ...shops];
            const shuffledData = this.shuffle(totalItems);
            return shuffledData;
        });
    }
    generalFilterSearch(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { word, sectionType, location, itemCategory, serviceCategory, condition, availability, minPrice, maxPrice, jobCategory, sort, } = req.query;
            const sanitizedInputs = {
                name: word,
                sectionType: sectionType,
                location: location,
                itemCategory: itemCategory,
                serviceCategory: serviceCategory,
                condition: condition,
                availability: availability,
                jobCategory: jobCategory,
                minPrice: minPrice ? parseFloat(minPrice) : null,
                maxPrice: maxPrice ? parseFloat(maxPrice) : null,
                sort: sort ? parseInt(sort, 10) : null,
            };
            const regex = sanitizedInputs.name
                ? new RegExp(sanitizedInputs.name, "i")
                : null;
            let items = [];
            let jobs = [];
            let services = [];
            let shop = [];
            //-1 sorts from newest, 1 sorts from oldest
            const sortOrder = sanitizedInputs.sort === 0 ? -1 : 1;
            if (!sectionType || sectionType === "item" || sectionType === "all") {
                const priceQuery = {};
                if (sanitizedInputs.minPrice !== null) {
                    priceQuery.$gte = sanitizedInputs.minPrice;
                }
                if (sanitizedInputs.maxPrice !== null) {
                    priceQuery.$lte = sanitizedInputs.maxPrice;
                }
                items = yield entity_1.default.find({
                    $and: [
                        {
                            outOfStock: "no",
                            sold: "no",
                            featured: sanitizedInputs.sort === 2 ? true : false,
                        },
                        {
                            $or: [
                                ...(regex ? [{ name: { $regex: regex } }] : []),
                                ...(itemCategory && itemCategory !== "all"
                                    ? [{ category: itemCategory }]
                                    : []),
                                ...(regex ? [{ categoryName: { $regex: regex } }] : []),
                                ...(condition && condition !== "all"
                                    ? [{ condition: condition }]
                                    : []),
                            ],
                        },
                        ...(Object.keys(priceQuery).length ? [{ price: priceQuery }] : []),
                    ],
                })
                    .sort({ createdAt: sortOrder })
                    .populate("shopId", "shopOwnerUserId name");
            }
            if (!sectionType || sectionType === "job" || sectionType === "all") {
                jobs = yield entity_2.default.find({
                    $and: [
                        { seen: "no" },
                        ...(location ? [{ location: location }] : []),
                        {
                            $or: [
                                ...(regex ? [{ name: { $regex: regex } }] : []),
                                ...(regex ? [{ skill: { $regex: regex } }] : []),
                                ...(jobCategory ? [{ skill: jobCategory }] : []),
                                ...(regex ? [{ type: { $regex: regex } }] : []),
                            ],
                        },
                    ],
                })
                    .sort({ createdAt: sortOrder })
                    .populate("userId", "firstName lastName profileImageUrl");
            }
            if (!sectionType || sectionType === "service" || sectionType === "all") {
                services = yield entity_3.default.find({
                    $and: [
                        { name: { $regex: regex } },
                        {
                            $or: [
                                ...(availability && availability !== "all"
                                    ? [{ availableToWork: availability }]
                                    : []),
                                ...(serviceCategory && serviceCategory !== "all"
                                    ? [{ "service.category": { $in: [serviceCategory] } }]
                                    : []),
                                ...(regex ? [{ "service.skill": { $regex: regex } }] : []),
                                ...(regex ? [{ "service.category": { $regex: regex } }] : []),
                            ],
                        },
                    ],
                })
                    .sort({ createdAt: sortOrder })
                    .populate("userId", "firstName lastName region profileImageUrl");
            }
            if (!sectionType || sectionType === "item" || sectionType === "shop") {
                shop = yield entity_4.default.find({ name: { $regex: regex } })
                    .sort({ createdAt: sortOrder })
                    .populate("shopOwnerUserId", "firstName lastName profileImageUrl region");
            }
            const totalItems = [...items, ...jobs, ...services, ...shop];
            return totalItems;
        });
    }
    generalSearch(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const regex = new RegExp(name, "i"); // Case-insensitive regex match for name etc
            const items = yield entity_1.default.find({
                $and: [
                    { outOfStock: "no", sold: "no" },
                    {
                        $or: [
                            { name: { $regex: regex } },
                            { category: { $regex: regex } },
                            { categoryName: { $regex: regex } },
                            { type: { $regex: regex } },
                        ],
                    },
                ],
            }).populate("shopId", "shopOwnerUserId name");
            const jobs = yield entity_2.default.find({
                $and: [
                    { seen: "no" },
                    {
                        $or: [
                            { name: { $regex: regex } },
                            { skill: { $regex: regex } },
                            { type: { $regex: regex } },
                        ],
                    },
                ],
            }).populate("userId", "firstName lastName profileImageUrl");
            const services = yield entity_3.default.find({
                $or: [
                    { name: { $regex: regex } },
                    { "service.skill": { $regex: regex } },
                    { "service.category": { $regex: regex } },
                ],
            }).populate("userId", "firstName lastName region profileImageUrl");
            const totalItems = [...items, ...jobs, ...services];
            const shuffledData = this.shuffle(totalItems);
            return shuffledData;
        });
    }
}
exports.allService = new AllService();
