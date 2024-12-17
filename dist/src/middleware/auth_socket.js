"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const socketAuthenticate = (socket, next) => {
    const token = socket.handshake.query.token;
    console.log(`Received token: ${token}`); // Log the received token
    if (!token) {
        console.log("Token not provided");
        return next(new Error(`Unauthorized: Token not provided tojen-- ${token}`));
    }
    let decodedToken = null;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log(`Decoded token: ${JSON.stringify(decodedToken)}`); // Log the decoded token
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Token verification failed: ${err.message} t`);
            // Uncomment if you want to reset the push notification token
            // await userService.findUserByEmailAndResetpushNotificationToken(email);
            return next(new Error(`Unauthorized: ${err.message} ${token}`));
        }
        else {
            console.error('Unknown error during token verification');
            return next(new Error(`Unauthorized: Unknown error during token verification -- ${token}`));
        }
    }
    if (!decodedToken) {
        console.log("Token is invalid or expired");
        // Uncomment if you want to reset the push notification token
        // await userService.findUserByEmailAndResetpushNotificationToken(email);
        return next(new Error(`Unauthorized: Token is invalid or expired ${token}`));
    }
    socket.decoded = decodedToken;
    console.log("Token verified and connection authorized");
    next();
};
exports.default = socketAuthenticate;
