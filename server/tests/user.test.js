import request from "supertest";
import app from "../index.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

describe("User Controller Tests", () => {
  describe("POST /api/v1/user/register", () => {
    it("should register a new user successfully", async () => {
      const userData = {
        fullname: "John Doe",
        email: "john@example.com",
        phoneNumber: "1234567890",
        password: "password123",
        role: "student",
      };

      const response = await request(app)
        .post("/api/v1/user/register")
        .field("fullname", userData.fullname)
        .field("email", userData.email)
        .field("phoneNumber", userData.phoneNumber)
        .field("password", userData.password)
        .field("role", userData.role);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Account created");
    });

    it("should return error if required fields are missing", async () => {
      const response = await request(app)
        .post("/api/v1/user/register")
        .field("fullname", "John Doe")
        .field("email", "john@example.com");

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Someting is missing");
    });

    it("should return error if user already exists", async () => {
      const userData = {
        fullname: "Jane Doe",
        email: "jane@example.com",
        phoneNumber: "9876543210",
        password: "password123",
        role: "student",
      };

      // First registration
      await request(app)
        .post("/api/v1/user/register")
        .field("fullname", userData.fullname)
        .field("email", userData.email)
        .field("phoneNumber", userData.phoneNumber)
        .field("password", userData.password)
        .field("role", userData.role);

      // Duplicate registration
      const response = await request(app)
        .post("/api/v1/user/register")
        .field("fullname", userData.fullname)
        .field("email", userData.email)
        .field("phoneNumber", userData.phoneNumber)
        .field("password", userData.password)
        .field("role", userData.role);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("User already exists");
    });
  });

  describe("POST /api/v1/user/login", () => {
    beforeEach(async () => {
      // Create a test user
      const hashedPassword = await bcrypt.hash("password123", 10);
      await User.create({
        fullname: "Test User",
        email: "test@example.com",
        phoneNumber: "1234567890",
        password: hashedPassword,
        role: "student",
      });
    });

    it("should login successfully with correct credentials", async () => {
      const response = await request(app).post("/api/v1/user/login").send({
        email: "test@example.com",
        password: "password123",
        role: "student",
      });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.user).toBeDefined();
      expect(response.body.user.email).toBe("test@example.com");
      expect(response.headers["set-cookie"]).toBeDefined();
    });

    it("should return error with incorrect password", async () => {
      const response = await request(app).post("/api/v1/user/login").send({
        email: "test@example.com",
        password: "wrongpassword",
        role: "student",
      });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Incorrect Credentials");
    });

    it("should return error if user not found", async () => {
      const response = await request(app).post("/api/v1/user/login").send({
        email: "nonexistent@example.com",
        password: "password123",
        role: "student",
      });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("User not found");
    });

    it("should return error if role does not match", async () => {
      const response = await request(app).post("/api/v1/user/login").send({
        email: "test@example.com",
        password: "password123",
        role: "recruiter",
      });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Incorrect Credentials");
    });
  });

  describe("POST /api/v1/user/logout", () => {
    it("should logout successfully", async () => {
      const response = await request(app).post("/api/v1/user/logout");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Logged out successfully");
    });
  });
});
