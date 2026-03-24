import express from "express";
import { register } from "../controllers/user.controllers.js";
import { singleUpload } from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", singleUpload, register);

export default userRouter;
