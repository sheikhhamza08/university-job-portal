import request from "supertest";
import app from "../index.js";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import jwt from "jsonwebtoken";

describe("Company Controller Tests", () => {
  let recruiterToken;
  let recruiterId;

  beforeEach(async () => {
    // Create a recruiter user
    const recruiter = await User.create({
      fullname: "Recruiter User",
      email: "recruiter@example.com",
      phoneNumber: "1234567890",
      password: "hashedpassword",
      role: "recruiter",
    });

    recruiterId = recruiter._id;
    recruiterToken = jwt.sign({ userId: recruiterId }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
  });

  describe("POST /api/v1/company/register", () => {
    it("should register a new company successfully", async () => {
      const response = await request(app)
        .post("/api/v1/company/register")
        .set("Cookie", [`token=${recruiterToken}`])
        .send({
          companyName: "Tech Corp",
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.company.companyName).toBe("Tech Corp");
      expect(response.body.company.userId).toBe(recruiterId.toString());
    });

    it("should return error if company name is missing", async () => {
      const response = await request(app)
        .post("/api/v1/company/register")
        .set("Cookie", [`token=${recruiterToken}`])
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Company name is required");
    });

    it("should return error if company already exists", async () => {
      await Company.create({
        companyName: "Duplicate Corp",
        userId: recruiterId,
      });

      const response = await request(app)
        .post("/api/v1/company/register")
        .set("Cookie", [`token=${recruiterToken}`])
        .send({
          companyName: "Duplicate Corp",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Company already exists");
    });
  });

  describe("GET /api/v1/company/get", () => {
    it("should get all companies for authenticated user", async () => {
      await Company.create([
        { companyName: "Company 1", userId: recruiterId },
        { companyName: "Company 2", userId: recruiterId },
      ]);

      const response = await request(app)
        .get("/api/v1/company/get")
        .set("Cookie", [`token=${recruiterToken}`]);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.companies).toHaveLength(2);
    });
  });

  describe("GET /api/v1/company/get/:id", () => {
    it("should get company by id", async () => {
      const company = await Company.create({
        companyName: "Test Company",
        userId: recruiterId,
      });

      const response = await request(app)
        .get(`/api/v1/company/get/${company._id}`)
        .set("Cookie", [`token=${recruiterToken}`]);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.company.companyName).toBe("Test Company");
    });

    it("should return 404 if company not found", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      const response = await request(app)
        .get(`/api/v1/company/get/${fakeId}`)
        .set("Cookie", [`token=${recruiterToken}`]);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});
