"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const userRouter = express_1.default.Router();
userRouter.post("/register", UserController_1.UserController.register);
userRouter.post("/login", UserController_1.UserController.login);
userRouter.get("/profile", authMiddleware_1.default, UserController_1.UserController.getProfile);
exports.default = userRouter;
