import express, {RequestHandler} from "express";
import { getMessages, sendMessage } from "../controllers/message.controller";
import protectRoute from "../middleware/protectRoute";

const router = express.Router();

router.use(protectRoute);
router.get("/:id", getMessages);
router.post("/send/:id", sendMessage);

export default router;
