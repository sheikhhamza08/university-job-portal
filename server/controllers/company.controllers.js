import { Company } from "../models/company.models.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    let company = await Company.findOne({ companyName: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already exists",
        success: false,
      });
    }

    company = await Company.create({
      companyName: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const getCompanyDetailsByUser = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId: userId });

    if (!companies) {
      return res.status(404).json({
        message: "No company found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Companies found",
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// get informations/details of a particular company
export const getCompanyDetailsById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "No company found",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
