import request from "supertest";
import app from "../index.js";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
import jwt from "jsonwebtoken";

describe("Application Controller Tests", () => {
  let studentToken;
  let recruiterToken;
  let studentId;
  let recruiterId;
  let jobId;

  beforeEach(async () => {
    // Create student
    const student = await User.create({
      fullname: "Test Student",
      email: "student@example.com",
      phoneNumber: "1234567890",
      password: "hashedpassword",
      role: "student",
    });
    studentId = student._id;
    studentToken = jwt.sign({ userId: studentId }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Create recruiter
    const recruiter = await User.create({
      fullname: "Test Recruiter",
      email: "recruiter2@example.com",
      phoneNumber: "0987654321",
      password: "hashedpassword",
      role: "recruiter",
    });
    recruiterId = recruiter._id;
    recruiterToken = jwt.sign({ userId: recruiterId }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Create company
    const company = await Company.create({
      companyName: "Test Company",
      userId: recruiterId,
    });

    // Create job
    const job = await Job.create({
      title: "Test Job",
      description: "Test Description",
      location: "Remote",
      requirements: ["Skill1"],
      salary: 100000,
      jobType: "Full-time",
      experienceLevel: 2,
      position: 2,
      company: company._id,
      created_by: recruiterId,
      applications: [],
    });
    jobId = job._id;
  });

  describe("POST /api/v1/application/apply/:id", () => {
    it("should apply for a job successfully", async () => {
      const response = await request(app)
        .post(`/api/v1/application/apply/${jobId}`)
        .set("Cookie", [`token=${studentToken}`]);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Application created successfully");

      const application = await Application.findOne({
        job: jobId,
        applicant: studentId,
      });
      expect(application).toBeDefined();
      expect(application.status).toBe("pending");
    });

    it("should prevent duplicate applications", async () => {
      await Application.create({
        job: jobId,
        applicant: studentId,
        status: "pending",
      });

      const response = await request(app)
        .post(`/api/v1/application/apply/${jobId}`)
        .set("Cookie", [`token=${studentToken}`]);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "You have already applied for this job",
      );
    });
  });

  describe("GET /api/v1/application/get-applied", () => {
    it("should get all applied jobs for student", async () => {
      await Application.create({
        job: jobId,
        applicant: studentId,
        status: "pending",
      });

      const response = await request(app)
        .get("/api/v1/application/get-applied")
        .set("Cookie", [`token=${studentToken}`]);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.validApplications).toHaveLength(1);
    });
  });

  describe("GET /api/v1/application/get-applicants/:id", () => {
    it("should get all applicants for a job", async () => {
      await Application.create({
        job: jobId,
        applicant: studentId,
        status: "pending",
      });

      const response = await request(app)
        .get(`/api/v1/application/get-applicants/${jobId}`)
        .set("Cookie", [`token=${recruiterToken}`]);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.job.applications).toHaveLength(1);
    });
  });

  describe("POST /api/v1/application/status/:id", () => {
    it("should update application status", async () => {
      const application = await Application.create({
        job: jobId,
        applicant: studentId,
        status: "pending",
      });

      const response = await request(app)
        .post(`/api/v1/application/status/${application._id}`)
        .set("Cookie", [`token=${recruiterToken}`])
        .send({ status: "accepted" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Status updated successfully");

      const updatedApp = await Application.findById(application._id);
      expect(updatedApp.status).toBe("accepted");
    });
  });
});
