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
exports.createParcelService = void 0;
const entity_1 = __importDefault(require("./entity"));
class CreateParcelService {
    createParcel(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { arrivalDate, email, freightDate, newLocation, parcelWeight, parcelsDesignation, receiverEmail, receiverName, senderName } = input;
            const newParcel = new entity_1.default({
                arrivalDate,
                email,
                freightDate,
                newLocation,
                parcelWeight,
                parcelsDesignation,
                receiverEmail,
                receiverName,
                senderName
            });
            yield newParcel.save();
            return;
        });
    }
}
exports.createParcelService = new CreateParcelService();
