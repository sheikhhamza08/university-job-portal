import express from "express";
import { login, register } from "../controllers/user.controllers.js";
import { singleUpload } from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", singleUpload, register);
userRouter.post("/login", login);

export default userRouter;
