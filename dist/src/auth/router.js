"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const utils_1 = require("../utils");
const validator_1 = require("./validator");
exports.AuthRouter = (0, express_1.Router)();
//old
exports.AuthRouter.post("/check-email-existence", [validator_1.authValidator.checkEmail], (0, utils_1.wrapAsync)(controller_1.authController.checkEmailExistence));
//new
exports.AuthRouter.post("/check/email/existence", [validator_1.authValidator.checkEmail], (0, utils_1.wrapAsync)(controller_1.authController.checkEmailExistence));
//old
exports.AuthRouter.post("/resend-otp", [validator_1.authValidator.checkEmail], (0, utils_1.wrapAsync)(controller_1.authController.resendOtp));
//new
exports.AuthRouter.post("/resend/otp", [validator_1.authValidator.checkEmail], (0, utils_1.wrapAsync)(controller_1.authController.resendOtp));
//old
exports.AuthRouter.post("/confirm-otp", [validator_1.authValidator.confirmOTP], (0, utils_1.wrapAsync)(controller_1.authController.confirmOTP));
//new
exports.AuthRouter.post("/confirm/otp", [validator_1.authValidator.confirmOTP], (0, utils_1.wrapAsync)(controller_1.authController.confirmOTP));
//old
exports.AuthRouter.post("/complete-registration", [validator_1.authValidator.completeUserRegistration], (0, utils_1.wrapAsync)(controller_1.authController.completeUserRegistration));
//new
exports.AuthRouter.post("/complete/registration", [validator_1.authValidator.completeUserRegistration], (0, utils_1.wrapAsync)(controller_1.authController.completeUserRegistration));
exports.AuthRouter.post("/signin", [validator_1.authValidator.signIn], (0, utils_1.wrapAsync)(controller_1.authController.signIn));
//to impelment
exports.AuthRouter.post("/auth/apple", [validator_1.authValidator.validateAppleSignIn], (0, utils_1.wrapAsync)(controller_1.authController.appleSignIn));
//to impelment
exports.AuthRouter.post("/auth/google", [validator_1.authValidator.validateGoogleSignIn], (0, utils_1.wrapAsync)(controller_1.authController.googleSignIn));
//old
exports.AuthRouter.post("/forgot-password", [validator_1.authValidator.checkEmail], (0, utils_1.wrapAsync)(controller_1.authController.forgotPasswordOTP));
//new
exports.AuthRouter.post("/forgot/password", [validator_1.authValidator.checkEmail], (0, utils_1.wrapAsync)(controller_1.authController.forgotPasswordOTP));
//old
exports.AuthRouter.post("/forgot-password-change", [validator_1.authValidator.forgotPasswordChange], (0, utils_1.wrapAsync)(controller_1.authController.forgotPasswordChange));
//new
exports.AuthRouter.post("/forgot/password/change", [validator_1.authValidator.forgotPasswordChange], (0, utils_1.wrapAsync)(controller_1.authController.forgotPasswordChange));
