import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.routes";
import messageRoutes from "./routes/message.routes";
import userRoutes from "./routes/user.routes";

import connectToMongoDB from "./db/connectToMongoDB";
import { app, server } from "./socket/socket";
import { customLogger } from "./logger";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cors({ origin: "http://localhost:5173", credentials: true}));
app.use(cookieParser());
app.use(customLogger());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

//-------------- Settings to run FE+BE on same port ------------------

const __myDir = path.resolve();

app.use(express.static(path.join(__myDir, "../frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__myDir, "../frontend", "dist", "index.html"));
});

//-------------------------------------------------------------------

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});