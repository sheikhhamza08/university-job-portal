import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controllers.js";
import { singleUpload } from "../middleware/multer.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", singleUpload, register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/profile/update", authUser, singleUpload, updateProfile);

export default userRouter;
