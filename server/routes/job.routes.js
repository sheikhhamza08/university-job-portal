import express from "express";
import { postJob } from "../controllers/job.controllers.js";
import authUser from "../middlewares/authUser.js";

const jobRouter = express.Router();

jobRouter.post("/post", authUser, postJob);

export default jobRouter;
