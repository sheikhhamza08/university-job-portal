# 💼 DBS Job Portal App

**Name:** Hamza Sheikh
**Student ID:** 20094037
**Programme:** Masters of Information Systems and Computing
**Module:** Programming for Information Systems
**Lecturer:** Paul Laird
**Date:** 12 April 2026

🌐 **Live Demo → [https://university-job-portal.vercel.app](https://university-job-portal.vercel.app)**
🔗 **Backend API → [https://university-job-portal.onrender.com](https://university-job-portal.onrender.com)**

---

## Table of Contents

| Section | Title                              |
| ------- | ---------------------------------- |
| 1       | Introduction                       |
| 2       | Organisation & Problem Statement   |
| 3       | System Requirements & Business Rules |
| 4       | Data Requirements & Storage        |
| 5       | System Architecture                |
| 6       | Implementation                     |
| 7       | Features                           |
| 8       | Testing                            |
| 9       | Tools & Technologies               |
| 10      | Use of External Resources / AI     |
| 11      | Challenges & Improvements          |
| 12      | Conclusion                         |
| 13      | References & Attributions          |
| 14      | Appendix                           |
| 15      | How to Run the Project             |

---

## 1. Introduction

The DBS Job Portal is a full-stack web application developed as part of the Programming for Information Systems module. The platform connects job seekers (students) and recruiters in a seamless digital environment. It allows students to browse job listings, apply for positions, and track their application status, while recruiters can post jobs, manage listings, and review applicants — all through a modern, responsive interface.

The system is built using the MERN stack (MongoDB, Express.js, React.js, Node.js), with cloud-based file storage via Cloudinary and secure authentication using JSON Web Tokens (JWT). The application is fully deployed and accessible online.

---

## 2. Organisation & Problem Statement

### Organisation

The application is designed to serve a university or educational institution environment — referred to here as **DBS (Dublin Business School)** — where students actively seek internships and graduate employment, and companies recruit directly from the student talent pool.

### Problem Statement

Traditional job application processes are fragmented — students rely on emails or physical CVs, recruiters manage spreadsheets, and there is no centralised tracking of application statuses. This creates inefficiencies on both sides:

- Students have no visibility into the status of their applications.
- Recruiters have no structured pipeline for managing applicants.
- There is no single platform connecting both parties within the institutional context.

The DBS Job Portal solves this by providing a centralised, role-based platform where both students and recruiters interact efficiently through a single system.

---

## 3. System Requirements & Business Rules

### Functional Requirements

- Users must be able to register and log in with a unique email and password.
- The system must support two distinct roles: **Student** and **Recruiter**.
- Students must be able to browse, filter, and search job listings.
- Students must be able to apply for a job only once per listing.
- Students must be able to upload a resume (PDF) to their profile.
- Recruiters must be able to register a company and post job listings.
- Recruiters must be able to view all applicants for their posted jobs.
- Recruiters must be able to update the status of each application (Accepted / Pending / Rejected).
- Recruiters must be able to edit or delete their job postings.
- Deleting a job must automatically remove all associated applications.

### Non-Functional Requirements

- The application must be responsive across mobile, tablet, and desktop.
- Authentication tokens must be stored securely in HTTP-only cookies.
- All file uploads must be handled via cloud storage (Cloudinary).
- The system must provide meaningful error messages for invalid inputs.

### Business Rules

- A user cannot register with an email that already exists in the system.
- A student cannot apply to the same job more than once.
- Only recruiters can post, edit, or delete jobs.
- Only students can apply for jobs.
- A recruiter can only edit or delete jobs they have created.
- Deleting a job cascades to delete all related applications.

---

## 4. Data Requirements & Storage

### Data Entities

**User**
- `_id`, `fullname`, `email`, `phoneNumber`, `password` (hashed), `role` (student/recruiter)
- `profile`: `bio`, `skills[]`, `resume` (URL), `resumeOriginalName`, `profilePhoto` (URL)

**Company**
- `_id`, `companyName`, `description`, `website`, `location`, `logo` (URL), `userId` (ref: User)

**Job**
- `_id`, `title`, `description`, `requirements[]`, `salary`, `location`, `jobType`, `experienceLevel`, `position`, `company` (ref: Company), `created_by` (ref: User), `applications[]` (ref: Application)

**Application**
- `_id`, `job` (ref: Job), `applicant` (ref: User), `status` (pending/accepted/rejected)

### Storage

- **MongoDB Atlas** — Cloud-hosted NoSQL database storing all structured data.
- **Cloudinary** — Cloud storage for binary assets (profile photos and resume PDFs).
- Passwords are hashed using **bcryptjs** before storage; plain-text passwords are never persisted.

---

## 5. System Architecture

The application follows a standard **3-tier client-server architecture**:

```
┌─────────────────────────────────┐
│         CLIENT (React.js)       │
│  Redux Store │ Axios │ Router   │
└────────────────┬────────────────┘
                 │ HTTPS REST API
┌────────────────▼────────────────┐
│       SERVER (Express.js)       │
│  Routes │ Controllers │ Middleware│
└────────────────┬────────────────┘
                 │
       ┌─────────┴──────────┐
       │                    │
┌──────▼──────┐     ┌───────▼──────┐
│  MongoDB    │     │  Cloudinary  │
│  Atlas DB   │     │  File Store  │
└─────────────┘     └──────────────┘
```

### API Structure

| Method | Endpoint                              | Description                   | Role      |
| ------ | ------------------------------------- | ----------------------------- | --------- |
| POST   | /api/v1/user/register                 | Register new user             | Public    |
| POST   | /api/v1/user/login                    | Login user                    | Public    |
| POST   | /api/v1/user/logout                   | Logout user                   | Auth      |
| POST   | /api/v1/user/profile/update           | Update profile & resume       | Auth      |
| POST   | /api/v1/company/register              | Register a company            | Recruiter |
| GET    | /api/v1/company/get                   | Get recruiter's companies     | Recruiter |
| GET    | /api/v1/company/get/:id               | Get company by ID             | Recruiter |
| PUT    | /api/v1/company/update/:id            | Update company info           | Recruiter |
| POST   | /api/v1/job/post                      | Post a new job                | Recruiter |
| GET    | /api/v1/job/get                       | Get all jobs (with search)    | Public    |
| GET    | /api/v1/job/get/:id                   | Get job by ID                 | Public    |
| GET    | /api/v1/job/get-recruiter-job         | Get recruiter's jobs          | Recruiter |
| DELETE | /api/v1/job/delete/:id                | Delete a job                  | Recruiter |
| POST   | /api/v1/application/apply/:id         | Apply for a job               | Student   |
| GET    | /api/v1/application/get               | Get applied jobs              | Student   |
| GET    | /api/v1/application/:id/applicants    | Get applicants for a job      | Recruiter |
| PUT    | /api/v1/application/status/:id/update | Update application status     | Recruiter |

---

## 6. Implementation

### Frontend

The frontend is built with **React.js** using a component-based architecture. Global state is managed with **Redux Toolkit**, including slices for authentication (`authSlice`), jobs (`jobSlice`), companies (`companySlice`), and applications (`applicationSlice`). Custom hooks such as `useGetAppliedJobs`, `useGetAllJobs`, and `useGetCompanies` are used to fetch and sync data with the Redux store via Axios API calls.

Routing is handled by **React Router v6**, with protected routes ensuring that only authenticated users with the correct role can access certain pages. UI components are built using **shadcn/ui** and styled with **Tailwind CSS**. Page transitions and element animations are handled by **Framer Motion**.

### Backend

The backend is a **Node.js/Express.js** REST API organised into controllers, routes, models, and middleware. **Mongoose** is used for schema definition and database interaction with MongoDB Atlas. File uploads are handled by **Multer** (in-memory storage), converted to base64 Data URIs using a custom `getDataUri` utility, and uploaded to **Cloudinary**.

Authentication middleware (`isAuthenticated`) verifies JWT tokens from HTTP-only cookies on protected routes. Role-based logic is enforced at the controller level.

### Folder Structure

```
university-job-portal/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── shared/
│   │   │   └── ui/
│   │   ├── hooks/
│   │   ├── redux/
│   │   └── utils/
│   └── .env
└── server/
    ├── controllers/
    ├── middlewares/
    ├── models/
    ├── routes/
    └── utils/
```

---

## 7. Features

### Student Features
- Register and log in with secure JWT authentication
- Browse all active job listings
- Search jobs by keyword (title or description)
- Filter jobs by category, location, and job type
- View detailed job descriptions
- Apply for jobs with one click
- Track application statuses: **Accepted**, **Pending**, **Rejected**
- Upload and update profile photo and resume (PDF)
- View and download resume from profile page
- View application stats on profile dashboard

### Recruiter Features
- Register and manage a company profile with logo
- Post new job listings with full details (salary, type, experience level)
- View all posted jobs from a recruiter dashboard
- View list of applicants for each job
- Update individual application statuses
- Edit job postings
- Delete job postings (cascades to remove all applications)

### General Features
- Role-based access control (Student / Recruiter)
- Fully responsive UI (mobile, tablet, desktop)
- Animated transitions and modals via Framer Motion
- Secure HTTP-only cookie session management
- Cloud-hosted files via Cloudinary

---

## 8. Testing

Testing was carried out manually across all key user flows. The following scenarios were verified:

| # | Test Case                              | Expected Result                          | Status |
|---|----------------------------------------|------------------------------------------|--------|
| 1 | Register with valid details            | Account created, redirected to login     | ✅ Pass |
| 2 | Register with duplicate email          | Error: "User already exists"             | ✅ Pass |
| 3 | Login with correct credentials         | JWT issued, redirected to home           | ✅ Pass |
| 4 | Login with wrong password              | Error: "Incorrect Credentials"           | ✅ Pass |
| 5 | Student applies for a job              | Application created, status = Pending    | ✅ Pass |
| 6 | Student applies for same job twice     | Error: "Already applied"                 | ✅ Pass |
| 7 | Recruiter posts a job                  | Job appears in listings                  | ✅ Pass |
| 8 | Recruiter updates application status   | Status updated in student dashboard      | ✅ Pass |
| 9 | Recruiter deletes a job                | Job and all applications removed         | ✅ Pass |
| 10| Upload resume PDF                      | Resume stored on Cloudinary, link saved  | ✅ Pass |
| 11| View/download resume from profile      | PDF opens or downloads correctly         | ✅ Pass |
| 12| Access protected route without login   | Redirected to login page                 | ✅ Pass |

---

## 9. Tools & Technologies

| Category       | Tool / Technology     | Purpose                                    |
| -------------- | --------------------- | ------------------------------------------ |
| Frontend       | React.js              | Component-based UI development             |
| Frontend       | Tailwind CSS          | Utility-first CSS styling                  |
| Frontend       | shadcn/ui             | Accessible, headless UI components         |
| Frontend       | Framer Motion         | Animations and transitions                 |
| Frontend       | Redux Toolkit         | Global state management                    |
| Frontend       | React Router v6       | Client-side routing                        |
| Frontend       | Axios                 | HTTP API requests                          |
| Backend        | Node.js               | Server-side JavaScript runtime             |
| Backend        | Express.js            | REST API framework                         |
| Backend        | Mongoose              | MongoDB object modelling                   |
| Backend        | JWT                   | Secure authentication tokens               |
| Backend        | bcryptjs              | Password hashing                           |
| Backend        | Multer                | File upload middleware                     |
| Database       | MongoDB Atlas         | Cloud-hosted NoSQL database                |
| File Storage   | Cloudinary            | Cloud storage for images and PDFs          |
| Deployment     | Vercel                | Frontend hosting                           |
| Deployment     | Render                | Backend hosting                            |
| Version Control| Git & GitHub          | Source control and collaboration           |

---

## 10. Use of External Resources / AI

### External Libraries & Services
- **shadcn/ui** — Open-source component library used for UI elements such as dialogs, buttons, and inputs.
- **Framer Motion** — Animation library used for page transitions and component animations.
- **Cloudinary** — Third-party cloud service used for storing and serving uploaded files.
- **MongoDB Atlas** — Cloud database platform used for hosting the application database.
- **Lucide React** — Icon library used throughout the UI.

### AI Tools
- **Claude (Anthropic)** — Used during development to assist with debugging Cloudinary upload configuration issues, specifically resolving `resource_type` conflicts that caused 401 errors when serving PDF resumes. AI was also used to assist in drafting and formatting this README document.

All AI-assisted code was reviewed, understood, and integrated by the developer. No code was blindly copied without comprehension.

---

## 11. Challenges & Improvements

### Challenges Encountered

**1. Cloudinary PDF Upload Issue**
The most significant challenge was configuring Cloudinary to correctly store and serve PDF resume files. Using `resource_type: "image"` caused 401 errors, `resource_type: "raw"` caused 404s on previously uploaded files, and `resource_type: "auto"` was overridden by the Cloudinary account settings back to `image`. The final solution was to save the `secure_url` as returned by Cloudinary and apply the `fl_attachment:false` transformation flag in the frontend URL to force inline browser rendering.

**2. CORS and Cookie Configuration**
Deploying to separate domains (Vercel for frontend, Render for backend) required careful CORS configuration with `credentials: true` and appropriate `sameSite: "none"` and `secure: true` cookie settings to allow cross-origin authentication.

**3. Cascading Deletes**
When a recruiter deleted a job, orphaned application records remained in the database. This was resolved by adding `Application.deleteMany({ job: jobId })` before deleting the job document.

### Potential Improvements

- **Email Notifications** — Notify students via email when their application status changes.
- **Pagination** — Add pagination to job listings and applicant lists for scalability.
- **Search Filters** — Expand filtering options by salary range, experience level, and job type.
- **Real-time Updates** — Use WebSockets or Server-Sent Events for live status updates.
- **Admin Dashboard** — A super-admin panel to manage all users, companies, and jobs.
- **OAuth Login** — Support Google or LinkedIn login for faster onboarding.

---

## 12. Conclusion

The DBS Job Portal successfully delivers a functional, full-stack web application that addresses the core problem of fragmented job application processes within a university context. The system provides distinct, role-based experiences for students and recruiters, with secure authentication, cloud-based file handling, and a clean responsive interface.

Through this project, practical experience was gained in building and deploying a complete MERN stack application, handling real-world challenges such as cross-origin authentication, cloud storage configuration, and cascading database operations. The application is live, tested, and accessible at [https://university-job-portal.vercel.app](https://university-job-portal.vercel.app).

---

## 13. References & Attributions

- MongoDB Documentation — https://www.mongodb.com/docs/
- Express.js Documentation — https://expressjs.com/
- React.js Documentation — https://react.dev/
- Node.js Documentation — https://nodejs.org/en/docs/
- Cloudinary Documentation — https://cloudinary.com/documentation
- shadcn/ui — https://ui.shadcn.com/
- Framer Motion — https://www.framer.com/motion/
- Redux Toolkit — https://redux-toolkit.js.org/
- Tailwind CSS — https://tailwindcss.com/docs
- JWT (jsonwebtoken) — https://www.npmjs.com/package/jsonwebtoken
- bcryptjs — https://www.npmjs.com/package/bcryptjs
- Multer — https://www.npmjs.com/package/multer
- Lucide Icons — https://lucide.dev/

---

## 14. Appendix

### Environment Variables

**server/.env**
```
MONGODB_URI = ""
PORT = 8000
SECRET_KEY = ""
CLOUDINARY_API_KEY = ""
CLOUDINARY_SECRET_KEY = ""
CLOUDINARY_NAME = ""
NODE_ENV = ""
```

**client/.env**
```
VITE_BACKEND_URL = "http://localhost:8000"
```

### Live URLs

| Service  | URL                                                    |
| -------- | ------------------------------------------------------ |
| Frontend | https://university-job-portal.vercel.app               |
| Backend  | https://university-job-portal.onrender.com             |

### GitHub Repository

https://github.com/sheikhhamza08/university-job-portal

---

## 15. How to Run the Project

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Cloudinary account

### 1. Clone the Repository

```bash
git clone https://github.com/sheikhhamza08/university-job-portal.git
cd university-job-portal
```

### 2. Setup Environment Variables

Create a `.env` file inside the `server/` directory:

```
MONGODB_URI = "your_mongodb_connection_string"
PORT = 8000
SECRET_KEY = "your_jwt_secret"
CLOUDINARY_API_KEY = "your_cloudinary_api_key"
CLOUDINARY_SECRET_KEY = "your_cloudinary_secret"
CLOUDINARY_NAME = "your_cloudinary_name"
NODE_ENV = "development"
```

Create a `.env` file inside the `client/` directory:

```
VITE_BACKEND_URL = "http://localhost:8000"
```

### 3. Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 4. Run the Application

```bash
# Start backend (from /server)
npm run dev

# Start frontend (from /client)
npm run dev
```

### 5. Open in Browser

- **Frontend → http://localhost:5173**
- **Backend  → http://localhost:8000**


