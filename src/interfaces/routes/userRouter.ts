import express from "express";
import { UserController } from "../controllers/UserController";
import authMiddleware from "../middleware/authMiddleware";

const userRouter = express.Router();

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.get("/profile", authMiddleware, UserController.getProfile);
userRouter.delete("/", authMiddleware, UserController.deleteUser);

export default userRouter;
