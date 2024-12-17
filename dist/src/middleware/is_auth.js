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
exports.extactUserIdFromTokenIfLoggedIn = exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const enum_1 = require("../utils/enum");
dotenv_1.default.config();
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.get("Authorization");
    const { email } = req.body;
    if (!authHeader) {
        //await userService.findUserByEmailAndResetpushNotificationToken(email);
        return res.status(401).json({
            message: enum_1.MessageResponse.Error,
            description: "Not authenticated",
            data: null,
        });
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    catch (err) {
        // await userService.findUserByEmailAndResetpushNotificationToken(email);
        return res.status(401).json({
            message: enum_1.MessageResponse.Error,
            description: "Not authenticated",
            data: null,
        });
    }
    if (!decodedToken) {
        // await userService.findUserByEmailAndResetpushNotificationToken(email);
        return res.status(401).json({
            message: enum_1.MessageResponse.Error,
            description: "Not authenticated",
            data: null,
        });
    }
    req.userId = decodedToken.userId;
    next();
});
exports.isAuth = isAuth;
const extactUserIdFromTokenIfLoggedIn = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return next();
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    catch (err) {
        return next();
    }
    if (!decodedToken) {
        return next();
    }
    req.userId = decodedToken.userId;
    next();
};
exports.extactUserIdFromTokenIfLoggedIn = extactUserIdFromTokenIfLoggedIn;
// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from 'express';
// import { MessageResponse } from '../utils/enum';
// export const isAuth = (req: Request, res: Response, next: NextFunction) => {
//     const authHeader = req.get("Authorization");
//     if (!authHeader) {
//       return res.status(401).json({
//         message: MessageResponse.Error,
//         description: "Not authenticated",
//         data: null,
//       });
//     }
//     const token = authHeader.split(" ")[1];
//     let decodedToken;
//     try {
//       decodedToken = jwt.verify(token, "somesupersupersecret");
//     } catch (err) {
//       return next(err);
//     }
//     if (!decodedToken) {
//      return res.status(401).json({
//         message: MessageResponse.Error,
//         description: "Not authenticated",
//         data: null,
//       });
//     }
//     req.userId = decodedToken.userId;
//     next();
//   }
