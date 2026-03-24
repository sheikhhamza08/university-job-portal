import express from "express";
import { login, logout, register } from "../controllers/user.controllers.js";
import { singleUpload } from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", singleUpload, register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

export default userRouter;
