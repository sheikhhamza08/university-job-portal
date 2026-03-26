import express from "express";
import {
  getCompanyDetailsById,
  getCompanyDetailsByUser,
  registerCompany,
} from "../controllers/company.controllers.js";
import authUser from "../middlewares/authUser.js";

const companyRouter = express.Router();

companyRouter.post("/register", authUser, registerCompany);
companyRouter.get("/get", authUser, getCompanyDetailsByUser);
companyRouter.get("/get/:id", authUser, getCompanyDetailsById);

export default companyRouter;
