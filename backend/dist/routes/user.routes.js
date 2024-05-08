"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const protectRoute_1 = __importDefault(require("../middleware/protectRoute"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
router.use(protectRoute_1.default);
router.get("/", user_controller_1.getUsersForSidebar);
exports.default = router;
//# sourceMappingURL=user.routes.js.map