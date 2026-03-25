import express from "express";
import { registerCompany } from "../controllers/company.controllers.js";
import authUser from "../middlewares/authUser.js";

const companyRouter = express.Router();

companyRouter.post("/register", authUser, registerCompany);

export default companyRouter;
