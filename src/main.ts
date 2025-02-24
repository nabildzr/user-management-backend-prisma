import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { UserController } from "./interfaces/controllers/UserController";
import userRouter from "./interfaces/routes/userRouter";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
