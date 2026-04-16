import request from "supertest";
import app from "../index.js";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";

describe("Full Workflow Integration Test", () => {
  let recruiterToken;
  let studentToken;
  let companyId;
  let jobId;
  let applicationId;

  it("should complete full job application workflow", async () => {
    // 1. Register recruiter
    const recruiterRes = await request(app)
      .post("/api/v1/user/register")
      .field("fullname", "Integration Recruiter")
      .field("email", "integrecruiter@example.com")
      .field("phoneNumber", "1111111111")
      .field("password", "password123")
      .field("role", "recruiter");

    expect(recruiterRes.status).toBe(201);

    // 2. Login recruiter
    const recruiterLogin = await request(app).post("/api/v1/user/login").send({
      email: "integrecruiter@example.com",
      password: "password123",
      role: "recruiter",
    });

    expect(recruiterLogin.status).toBe(200);
    recruiterToken = recruiterLogin.headers["set-cookie"][0]
      .split("=")[1]
      .split(";")[0];

    // 3. Register company
    const companyRes = await request(app)
      .post("/api/v1/company/register")
      .set("Cookie", [`token=${recruiterToken}`])
      .send({ companyName: "Integration Corp" });

    expect(companyRes.status).toBe(201);
    companyId = companyRes.body.company._id;

    // 4. Post a job
    const jobRes = await request(app)
      .post("/api/v1/job/post")
      .set("Cookie", [`token=${recruiterToken}`])
      .send({
        title: "Integration Engineer",
        description: "Test job",
        location: "Remote",
        requirements: "Testing,Jest",
        salary: 150000,
        jobType: "Full-time",
        experience: 3,
        position: 1,
        companyId: companyId,
      });

    expect(jobRes.status).toBe(201);
    jobId = jobRes.body.job._id;

    // 5. Register student
    const studentRes = await request(app)
      .post("/api/v1/user/register")
      .field("fullname", "Integration Student")
      .field("email", "integstudent@example.com")
      .field("phoneNumber", "2222222222")
      .field("password", "password123")
      .field("role", "student");

    expect(studentRes.status).toBe(201);

    // 6. Login student
    const studentLogin = await request(app).post("/api/v1/user/login").send({
      email: "integstudent@example.com",
      password: "password123",
      role: "student",
    });

    expect(studentLogin.status).toBe(200);
    studentToken = studentLogin.headers["set-cookie"][0]
      .split("=")[1]
      .split(";")[0];

    // 7. Apply for job
    const applyRes = await request(app)
      .post(`/api/v1/application/apply/${jobId}`)
      .set("Cookie", [`token=${studentToken}`]);

    expect(applyRes.status).toBe(201);

    // 8. Get applications for student
    const studentApps = await request(app)
      .get("/api/v1/application/get-applied")
      .set("Cookie", [`token=${studentToken}`]);

    expect(studentApps.status).toBe(200);
    expect(studentApps.body.validApplications).toHaveLength(1);
    applicationId = studentApps.body.validApplications[0]._id;

    // 9. Get applicants for recruiter
    const applicantsRes = await request(app)
      .get(`/api/v1/application/get-applicants/${jobId}`)
      .set("Cookie", [`token=${recruiterToken}`]);

    expect(applicantsRes.status).toBe(200);
    expect(applicantsRes.body.job.applications).toHaveLength(1);

    // 10. Update application status
    const statusRes = await request(app)
      .post(`/api/v1/application/status/${applicationId}`)
      .set("Cookie", [`token=${recruiterToken}`])
      .send({ status: "accepted" });

    expect(statusRes.status).toBe(200);
  }, 30000);
});
