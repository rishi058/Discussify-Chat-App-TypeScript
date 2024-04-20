import express, {Response} from "express";
import protectRoute from "../middleware/protectRoute";
import { getUsersForSidebar } from "../controllers/user.controller";

const router = express.Router();
router.use(protectRoute);
router.get("/", getUsersForSidebar);

export default router;
