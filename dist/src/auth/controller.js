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
exports.authController = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const google_auth_library_1 = require("google-auth-library");
const apple_signin_auth_1 = __importDefault(require("apple-signin-auth"));
const auth_1 = require("../utils/auth");
const enum_1 = require("../utils/enum");
const auth_2 = require("../utils/auth");
const service_1 = require("../user/service");
const service_2 = require("./service");
const CLIENT_ID = process.env.CLIENT_ID;
const client = new google_auth_library_1.OAuth2Client(CLIENT_ID);
dotenv_1.default.config();
class AuthController {
    completeUserRegistration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield service_2.authService.completeUserRegistration(req);
            if (!user) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "User not found",
                    data: null,
                });
            }
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: process.env.TOKEN_EXPIRY,
            });
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "User creation completed",
                data: {
                    token,
                },
            });
        });
    }
    appleSignIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { identityToken } = req.body;
            const jwtClaims = yield apple_signin_auth_1.default.verifyIdToken(identityToken, {
                audience: "your-app-bundle-id", // e.g. com.example.app
                ignoreExpiration: true, // Optional
            });
            if (!jwtClaims) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Invalid identity token",
                    data: null,
                });
            }
            const email = jwtClaims.email;
            const userExists = yield service_1.userService.findUserByEmail(email);
            if (!userExists) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Wrong user credentials!",
                    data: null,
                });
            }
            const token = jsonwebtoken_1.default.sign({ userId: userExists._id }, process.env.JWT_SECRET, {
                expiresIn: process.env.TOKEN_EXPIRY,
            });
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Logged in successfully",
                data: {
                    token,
                },
            });
        });
    }
    googleSignIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idToken } = req.body;
            const ticket = yield client.verifyIdToken({
                idToken,
                audience: CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if (payload) {
                //  const userId = payload['sub'];
                const email = payload["email"];
                const userExists = yield service_1.userService.findUserByEmail(email);
                if (!userExists) {
                    return res.status(400).json({
                        message: enum_1.MessageResponse.Error,
                        description: "Wrong user credentials!",
                        data: null,
                    });
                }
                const token = jsonwebtoken_1.default.sign({ userId: userExists._id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.TOKEN_EXPIRY,
                });
                return res.status(200).json({
                    message: enum_1.MessageResponse.Success,
                    description: "Logged in successfully",
                    data: {
                        token,
                    },
                });
            }
            return res.status(400).json({
                message: enum_1.MessageResponse.Error,
                description: "Invalid token payload",
                data: null,
            });
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, pushNotificationToken } = req.body;
            const userExists = yield service_1.userService.findUserByEmail(email);
            if (!userExists) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Wrong user credentials!",
                    data: null,
                });
            }
            if (pushNotificationToken) {
                yield service_1.userService.addUserPushNotificationToken(userExists._id, pushNotificationToken);
            }
            const match = yield (0, auth_1.comparePassword)(password, userExists.password);
            if (!match) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Wrong user credentials!",
                    data: null,
                });
            }
            const token = jsonwebtoken_1.default.sign({ userId: userExists._id }, process.env.JWT_SECRET, {
                expiresIn: process.env.TOKEN_EXPIRY,
            });
            const userWithoutPassword = userExists.toObject();
            if ("password" in userWithoutPassword) {
                delete userWithoutPassword.password;
            }
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Logged in successfully",
                data: {
                    token,
                },
            });
        });
    }
    forgotPasswordChange(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, otp, password } = req.body;
            const user = yield service_2.authService.readOTP(email, otp);
            if (!user) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Invalid otp",
                    data: null,
                });
            }
            if (user && user.emailVerifyOTPExpiration !== undefined) {
                const currentDate = new Date();
                const expirationDate = new Date(user.emailVerifyOTPExpiration);
                if (expirationDate < currentDate) {
                    return res.status(400).json({
                        message: enum_1.MessageResponse.Error,
                        description: "Verification OTP expired",
                        data: null,
                    });
                }
            }
            yield service_2.authService.deleteOTP(email, otp);
            yield service_2.authService.changePassword(email, password);
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Password Changed Successfully!",
                data: null,
            });
        });
    }
    forgotPasswordOTP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const userExists = yield service_1.userService.findUserByEmail(email);
            if (userExists) {
                const otp = crypto_1.default.randomBytes(4).toString("hex");
                const emailVerify = yield service_2.authService.saveOTP({ email, otp });
                if (!emailVerify) {
                    return res.status(404).json({
                        message: enum_1.MessageResponse.Error,
                        description: "User not found",
                        data: null,
                    });
                }
                yield (0, auth_2.sendRestPasswordEmail)({
                    email,
                    otp,
                });
                return res.status(201).json({
                    message: enum_1.MessageResponse.Success,
                    description: "An OTP has been sent to your email address",
                    data: null,
                });
            }
            return res.status(409).json({
                message: enum_1.MessageResponse.Error,
                description: "Email does not exists",
                data: null,
            });
        });
    }
    checkEmailExistence(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const userExists = yield service_1.userService.findUserByEmail(email);
            if (!userExists || !(userExists === null || userExists === void 0 ? void 0 : userExists.completedRegistration)) {
                const otp = crypto_1.default.randomBytes(4).toString("hex");
                if (!userExists) {
                    yield service_2.authService.createUserEmail(email);
                }
                const emailVerify = yield service_2.authService.saveOTP({ email, otp });
                if (!emailVerify) {
                    return res.status(404).json({
                        message: enum_1.MessageResponse.Error,
                        description: "User not found",
                        data: null,
                    });
                }
                yield (0, auth_2.sendVerificationEmail)({
                    email,
                    otp,
                });
                return res.status(201).json({
                    message: enum_1.MessageResponse.Success,
                    description: "An OTP has been sent to your email address",
                    data: null,
                });
            }
            return res.status(409).json({
                message: enum_1.MessageResponse.Error,
                description: "Email already exists",
                data: null,
            });
        });
    }
    resendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const userExists = yield service_1.userService.findUserByEmail(email);
            if (userExists) {
                const otp = crypto_1.default.randomBytes(4).toString("hex");
                const emailVerify = yield service_2.authService.saveOTP({ email, otp });
                if (!emailVerify) {
                    return res.status(404).json({
                        message: enum_1.MessageResponse.Error,
                        description: "User not found",
                        data: null,
                    });
                }
                yield (0, auth_2.sendVerificationEmail)({
                    email,
                    otp,
                });
                return res.status(201).json({
                    message: enum_1.MessageResponse.Success,
                    description: "An OTP has been resent to your email address",
                    data: null,
                });
            }
            return res.status(404).json({
                message: enum_1.MessageResponse.Error,
                description: "Email not found",
                data: null,
            });
        });
    }
    confirmOTP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, otp } = req.body;
            const isEmailVerified = yield service_2.authService.checkEmailVerification(email);
            if (isEmailVerified && isEmailVerified.completedRegistration) {
                if (isEmailVerified.emailVerified) {
                    return res.status(400).json({
                        message: enum_1.MessageResponse.Error,
                        description: "Email Already Verified",
                        data: null,
                    });
                }
            }
            const user = yield service_2.authService.readOTP(email, otp);
            if (!user) {
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: "Invalid otp",
                    data: null,
                });
            }
            if (user && user.emailVerifyOTPExpiration !== undefined) {
                const currentDate = new Date();
                const expirationDate = new Date(user.emailVerifyOTPExpiration);
                if (expirationDate < currentDate) {
                    return res.status(400).json({
                        message: enum_1.MessageResponse.Error,
                        description: "Verification OTP expired",
                        data: null,
                    });
                }
            }
            yield service_2.authService.deleteOTP(email, otp);
            const verifiedEmail = {
                email: email,
            };
            const emailVerify = yield service_2.authService.verifyEmail(verifiedEmail);
            if (!emailVerify) {
                return res.status(404).json({
                    message: enum_1.MessageResponse.Error,
                    description: "User not found",
                    data: null,
                });
            }
            return res.status(201).json({
                message: enum_1.MessageResponse.Success,
                description: "Verification successful",
                data: null,
            });
        });
    }
}
exports.authController = new AuthController();
