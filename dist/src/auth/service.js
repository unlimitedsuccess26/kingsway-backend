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
exports.authService = void 0;
const entity_1 = __importDefault(require("../user/entity"));
const auth_1 = require("../utils/auth");
class AuthService {
    createUserEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new entity_1.default({
                email,
            });
            const userData = yield user.save();
            return userData;
        });
    }
    completeUserRegistration(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, firstName, lastName, gender, password, phoneNumber, region, city, } = req.body;
            const user = yield entity_1.default.findOne({
                email: email,
            });
            if (user) {
                const hashedPassword = (yield (0, auth_1.hashPassword)(password));
                user.firstName = firstName;
                user.lastName = lastName;
                user.gender = gender;
                user.password = hashedPassword;
                user.phoneNumber = phoneNumber;
                user.region = region;
                user.city = city;
                user.completedRegistration = true;
                yield user.save();
            }
            return user;
        });
    }
    verifyEmail(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = input;
            const user = yield entity_1.default.findOne({ email });
            if (user) {
                user.emailVerified = true;
                user.save();
            }
            return user;
        });
    }
    deleteOTP(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findOne({ email, emailVerifyOTP: otp });
            if (user) {
                user.emailVerifyOTP = undefined;
                user.emailVerifyOTPExpiration = undefined;
                yield user.save();
            }
            return user;
        });
    }
    changePassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findOne({ email });
            const hashedPassword = (yield (0, auth_1.hashPassword)(password));
            if (user) {
                user.password = hashedPassword;
                yield user.save();
            }
            return user;
        });
    }
    checkEmailVerification(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield entity_1.default.findOne({ email });
            return user;
        });
    }
    saveOTP(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { otp, email } = input;
            const user = yield entity_1.default.findOne({
                email: email,
            });
            if (user) {
                user.emailVerifyOTP = otp;
                //3600000 is in milisecs and this is 1hr, so the token is valid for 1 hour
                user.emailVerifyOTPExpiration = new Date(Date.now() + 3600000);
                yield user.save();
            }
            return user;
        });
    }
    readOTP(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const emailVerify = yield entity_1.default.findOne({ email, emailVerifyOTP: otp });
            return emailVerify;
        });
    }
}
exports.authService = new AuthService();
