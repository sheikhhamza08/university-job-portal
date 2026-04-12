import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";

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

// role === "student"
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    // we can use more than two populate at a time

    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "",
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// role === "student"
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job found",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// role === "recruiter"
export const getRecruiterJobs = async (req, res) => {
  try {
    const recruiterId = req.id;
    const jobs = await Job.find({ created_by: recruiterId }).populate({
      path: "company",
      createdAt: -1,
    });
    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Jobs found",
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// role === "recruiter"
export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    if (job.created_by.toString() !== userId) {
      return res.status(403).json({
        message: "Unauthorized to delete this job",
        success: false,
      });
    }

    // ✅ Delete all applications linked to this job
    await Application.deleteMany({ job: jobId });

    await Job.findByIdAndDelete(jobId);

    return res.status(200).json({
      message: "Job deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
