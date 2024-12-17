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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_1 = require("./socket");
const loggin_1 = __importDefault(require("./src/utils/loggin"));
const enum_1 = require("./src/utils/enum");
const router_1 = require("./src/auth/router");
const router_2 = require("./src/user/router");
const router_3 = require("./src/skilled_service/router");
const router_4 = require("./src/market_place/router");
const router_5 = require("./src/shop/router");
const router_6 = require("./src/item/router");
const router_7 = require("./src/job/router");
const router_8 = require("./src/service/router");
const router_9 = require("./src/all/router");
const router_10 = require("./src/saved_items/router");
const router_11 = require("./src/review/router");
const router_12 = require("./src/chat/router");
const auth_socket_1 = __importDefault(require("./src/middleware/auth_socket"));
const controller_1 = require("./src/chat/controller");
const service_1 = require("./src/chat/service");
const router_13 = require("./src/report/router");
// interface ExtendedSocket extends Socket {
//   decoded?: JwtPayload | string;
// }
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 8080;
const StartServer = () => {
    app.use((req, res, next) => {
        loggin_1.default.info(`Incoming ==> Method : [${req.method}] - IP: [${req.socket.remoteAddress}]`);
        res.on("finish", () => {
            // Log the Response
            loggin_1.default.info(`Incomming ==> Method : [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - status: [${res.statusCode}]`);
        });
        next();
    });
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // Cors
    app.use((0, cors_1.default)({
        origin: "*",
        credentials: true,
    }));
    // Routes
    app.use("/api/v1", router_1.AuthRouter, router_2.UserRouter, router_3.SkilledServiceRouter, router_4.MarketPlaceRouter, router_5.ShopRouter, router_6.ItemRouter, router_7.JobRouter, router_8.ServiceRouter, router_9.AllRouter, router_10.SavedItemsRouter, router_11.ReviewRouter, router_12.ChatRouter, router_13.ReportRouter);
    // Health check
    app.get("/api/v1/healthcheck", (_req, res) => {
        res.status(200).json({ status: "UP 🔥🔧🎂" });
    });
    // Invalid url error handling
    app.use((_req, res) => {
        const _error = new Error("Url not found 😟");
        loggin_1.default.error(_error);
        return res.status(404).json({ message: _error.message });
    });
    //error middleware
    app.use((err, _req, res, _next) => {
        if (err) {
            console.error(err);
            res.status(500).json({
                message: enum_1.MessageResponse.Error,
                description: "Internal Server Error",
                data: null,
            });
        }
    });
    const server = app.listen(port, () => loggin_1.default.info(`Server is running on port ${port} 🔥🔧`));
    const io = socket_1.socket.init(server);
    io.use(auth_socket_1.default);
    io.on("connection", (socket) => {
        loggin_1.default.info("Client connected: " + socket.id);
        socket.on("new_message", (_a) => __awaiter(void 0, [_a], void 0, function* ({ content, receiverId, conversationId }) {
            if (socket.decoded && typeof socket.decoded === "object") {
                const userId = socket.decoded.userId;
                try {
                    console.log(`New message received: content:${content} reveiver: ${receiverId} conversation ${conversationId} `);
                    yield controller_1.chatController.sendSocketChat(userId, receiverId, conversationId, content);
                }
                catch (error) {
                    loggin_1.default.error(error);
                }
            }
        }));
        socket.on("mark-as-read", (_b) => __awaiter(void 0, [_b], void 0, function* ({ chatId, receiverId }) {
            try {
                yield service_1.chatService.markMessagesAsRead(chatId, receiverId);
            }
            catch (error) {
                loggin_1.default.error(error);
            }
        }));
    });
};
const MONGODB_URI = process.env.MONGODB_URI || "";
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => {
    loggin_1.default.info(`Database connected 🎂`);
    StartServer();
})
    .catch((_error) => {
    loggin_1.default.error("Error while connecting to Database ===> ");
    loggin_1.default.error(_error);
    process.exit(1);
});
