import request from "supertest";
import app from "../index.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

describe("Authentication Middleware Tests", () => {
  let validToken;
  let userId;

  beforeEach(async () => {
    const user = await User.create({
      fullname: "Auth Test User",
      email: "authtest@example.com",
      phoneNumber: "1234567890",
      password: "hashedpassword",
      role: "student",
    });
    userId = user._id;
    validToken = jwt.sign({ userId }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
  });

  it("should allow access with valid token", async () => {
    const response = await request(app)
      .get("/api/v1/company/get")
      .set("Cookie", [`token=${validToken}`]);

    expect(response.status).not.toBe(401);
  });

  it("should block access without token", async () => {
    const response = await request(app).get("/api/v1/company/get");

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("User not authorized");
  });

  it("should block access with invalid token", async () => {
    const response = await request(app)
      .get("/api/v1/company/get")
      .set("Cookie", ["token=invalidtoken"]);

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  it("should block access with expired token", async () => {
    const expiredToken = jwt.sign({ userId }, process.env.SECRET_KEY, {
      expiresIn: "0s",
    });

    const response = await request(app)
      .get("/api/v1/company/get")
      .set("Cookie", [`token=${expiredToken}`]);

    expect(response.status).toBe(401);
  });
});
