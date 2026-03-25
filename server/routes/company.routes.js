import express from "express";
import {
  getCompanyDetailsByUser,
  registerCompany,
} from "../controllers/company.controllers.js";
import authUser from "../middlewares/authUser.js";

const companyRouter = express.Router();

companyRouter.post("/register", authUser, registerCompany);
companyRouter.get("/get", authUser, getCompanyDetailsByUser);

export default companyRouter;
