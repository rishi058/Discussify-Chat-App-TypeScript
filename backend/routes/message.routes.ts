import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller";
import protectRoute from "../middleware/protectRoute";

const router = express.Router();

router.use(protectRoute);
router.get("/", getMessages);
router.post("/send", sendMessage);

export default router;
