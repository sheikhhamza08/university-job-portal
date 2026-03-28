import express from "express";
import { getAllJobs, postJob } from "../controllers/job.controllers.js";
import authUser from "../middlewares/authUser.js";

const jobRouter = express.Router();

jobRouter.post("/post", authUser, postJob);
jobRouter.get("/get", getAllJobs);

export default jobRouter;
