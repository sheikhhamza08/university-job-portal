import { Job } from "../models/job.models.js";

// role === "recruiter"

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      requirements,
      salary,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !location ||
      !requirements ||
      !salary ||
      !jobType ||
      experience < 0 ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      location,
      requirements: requirements.split(","),
      salary: Number(salary),
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "New job created",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
