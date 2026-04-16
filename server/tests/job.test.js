import request from "supertest";
import app from "../index.js";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import jwt from "jsonwebtoken";

describe("Job Controller Tests", () => {
  let recruiterToken;
  let recruiterId;
  let companyId;

  beforeEach(async () => {
    // Create recruiter
    const recruiter = await User.create({
      fullname: "Job Recruiter",
      email: "jobrecruiter@example.com",
      phoneNumber: "1234567890",
      password: "hashedpassword",
      role: "recruiter",
    });

    recruiterId = recruiter._id;
    recruiterToken = jwt.sign({ userId: recruiterId }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Create company
    const company = await Company.create({
      companyName: "Job Corp",
      userId: recruiterId,
    });
    companyId = company._id;
  });

  describe("POST /api/v1/job/post", () => {
    it("should post a new job successfully", async () => {
      const jobData = {
        title: "Software Engineer",
        description: "Develop amazing applications",
        location: "Remote",
        requirements: "React,Node,MongoDB",
        salary: 120000,
        jobType: "Full-time",
        experience: 3,
        position: 2,
        companyId: companyId,
      };

      const response = await request(app)
        .post("/api/v1/job/post")
        .set("Cookie", [`token=${recruiterToken}`])
        .send(jobData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.job.title).toBe("Software Engineer");
      expect(response.body.job.salary).toBe(120000);
      expect(response.body.job.requirements).toEqual([
        "React",
        "Node",
        "MongoDB",
      ]);
    });

    it("should return error if required fields are missing", async () => {
      const response = await request(app)
        .post("/api/v1/job/post")
        .set("Cookie", [`token=${recruiterToken}`])
        .send({
          title: "Software Engineer",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Something is missing");
    });
  });

  describe("GET /api/v1/job/get", () => {
    beforeEach(async () => {
      await Job.create([
        {
          title: "React Developer",
          description: "React expert needed",
          location: "Remote",
          requirements: ["React"],
          salary: 100000,
          jobType: "Full-time",
          experienceLevel: 2,
          position: 1,
          company: companyId,
          created_by: recruiterId,
        },
        {
          title: "Node.js Developer",
          description: "Backend expert needed",
          location: "New York",
          requirements: ["Node.js"],
          salary: 110000,
          jobType: "Full-time",
          experienceLevel: 3,
          position: 1,
          company: companyId,
          created_by: recruiterId,
        },
      ]);
    });

    it("should get all jobs", async () => {
      const response = await request(app).get("/api/v1/job/get");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.jobs).toHaveLength(2);
    });

    it("should search jobs by keyword", async () => {
      const response = await request(app).get("/api/v1/job/get?keyword=React");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.jobs).toHaveLength(1);
      expect(response.body.jobs[0].title).toBe("React Developer");
    });
  });

  describe("GET /api/v1/job/get/:id", () => {
    it("should get job by id", async () => {
      const job = await Job.create({
        title: "Test Job",
        description: "Test description",
        location: "Remote",
        requirements: ["Test"],
        salary: 100000,
        jobType: "Full-time",
        experienceLevel: 1,
        position: 1,
        company: companyId,
        created_by: recruiterId,
      });

      const response = await request(app).get(`/api/v1/job/get/${job._id}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.job.title).toBe("Test Job");
    });
  });

  describe("DELETE /api/v1/job/delete/:id", () => {
    it("should delete job if user is the creator", async () => {
      const job = await Job.create({
        title: "Job to Delete",
        description: "Will be deleted",
        location: "Remote",
        requirements: ["Test"],
        salary: 100000,
        jobType: "Full-time",
        experienceLevel: 1,
        position: 1,
        company: companyId,
        created_by: recruiterId,
      });

      const response = await request(app)
        .delete(`/api/v1/job/delete/${job._id}`)
        .set("Cookie", [`token=${recruiterToken}`]);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Job deleted successfully");

      const deletedJob = await Job.findById(job._id);
      expect(deletedJob).toBeNull();
    });
  });
});
