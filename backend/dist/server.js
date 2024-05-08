"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const connectToMongoDB_1 = __importDefault(require("./db/connectToMongoDB"));
const socket_1 = require("./socket/socket");
const logger_1 = require("./logger");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
socket_1.app.use(express_1.default.json()); // to parse the incoming requests with JSON payloads (from req.body)
socket_1.app.use((0, cors_1.default)({ origin: "http://localhost:5173", credentials: true }));
socket_1.app.use((0, cookie_parser_1.default)());
socket_1.app.use((0, logger_1.customLogger)());
socket_1.app.use("/api/auth", auth_routes_1.default);
socket_1.app.use("/api/messages", message_routes_1.default);
socket_1.app.use("/api/users", user_routes_1.default);
//-------------- Settings to run FE+BE on same port ------------------
const __myDir = path_1.default.resolve();
socket_1.app.use(express_1.default.static(path_1.default.join(__myDir, "../frontend/dist")));
socket_1.app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__myDir, "../frontend", "dist", "index.html"));
});
//-------------------------------------------------------------------
socket_1.server.listen(PORT, () => {
    (0, connectToMongoDB_1.default)();
    console.log(`Server Running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map