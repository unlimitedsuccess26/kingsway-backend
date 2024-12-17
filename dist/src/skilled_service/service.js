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
exports.skilledServiceService = void 0;
const entity_1 = __importDefault(require("./entity"));
const entity_2 = __importDefault(require("../service/entity"));
class SkilledServiceService {
    createSkilledService(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, imageUrl, type } = req.body;
            const user = new entity_1.default({
                name,
                imageUrl,
                type
            });
            yield user.save();
            return user;
        });
    }
    getAllSkilledServices() {
        return __awaiter(this, void 0, void 0, function* () {
            const skilledServices = yield entity_1.default.find();
            return skilledServices;
        });
    }
    getSkilledServiceByType(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type } = req.body;
            const skilledServices = yield entity_1.default.findOne({ type });
            return skilledServices;
        });
    }
    fetchSkilledServicesItems(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const skilledServicesItem = yield entity_2.default.find({
                "service.category": categoryId
            }).populate("userId", "firstName lastName region");
            return skilledServicesItem;
        });
    }
}
exports.skilledServiceService = new SkilledServiceService();
