
import express from 'express';
import { UserController } from '../controllers/UserController';

const userRouter = express.Router();

userRouter.post("/", UserController.register)

export default userRouter;  