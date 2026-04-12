# 💼 DBS Job Portal App

A modern, full-stack Job Portal built with the powerful **MERN stack** — enabling both job seekers (students) and recruiters to connect seamlessly. With a clean, animated, and responsive UI, this platform allows users to explore opportunities, post jobs, and manage applications with ease.

🌐 **Live Demo → [https://university-job-portal.vercel.app](https://university-job-portal.vercel.app)**

---

## ✨ Features

### ✅ General

- 🔐 **Authentication System** — Secure login & registration using JWT
- 👥 **Role-Based Access** — Separate dashboards for students and recruiters
- 🌐 **Clean, Responsive UI** — Built with Tailwind CSS & shadcn/ui
- 🎯 **Dynamic Routing & State Management** — Smooth navigation across the app
- ☁️ **Cloud File Storage** — Profile photos and resumes uploaded via Cloudinary

### 🎓 Student Role

- Browse and search job listings
- Apply to jobs with one click
- Track application status (Accepted / Pending / Rejected) in personal dashboard
- Upload and manage resume (PDF) from profile
- View and download resume directly from profile page

### 🧑‍💼 Recruiter Role

- Register and manage company profile with logo
- Post new job opportunities
- View applicants for each job
- Update applicant status (Accept / Reject)
- Edit or delete job postings
- Manage all listings from a unified dashboard

---

## 🎨 UI & Animations

The UI is built with **Tailwind CSS** and enhanced with **shadcn/ui** components for consistency and accessibility. Smooth animations and transitions are added using **Framer Motion**, delivering a modern and engaging user experience.

- Responsive layout for mobile, tablet, and desktop
- Animated modals, buttons, and transitions
- Accessible and consistent component design
- Stats strip on profile page showing applied, accepted, pending, and rejected counts

---

## 🛠️ Tech Stack

### 🧑‍💻 Frontend

- **React.js** – Component-based architecture
- **Tailwind CSS** – Utility-first CSS for clean, responsive UI
- **shadcn/ui** – Beautiful, headless UI components
- **Framer Motion** – Animations and motion effects
- **React Router** – Client-side routing
- **Redux Toolkit** – Global state management
- **Axios** – API communication

### 🖥️ Backend

- **Node.js** – Server-side JavaScript runtime
- **Express.js** – Web framework for APIs
- **MongoDB** – NoSQL database for storing user/job data
- **Mongoose** – MongoDB object modeling for Node.js
- **JWT (JSON Web Token)** – Authentication and authorization
- **Cloudinary** – Cloud storage for profile photos and resumes
- **Multer** – Middleware for handling file uploads
- **bcryptjs** – Password hashing

---

## 📁 Project Structure

```
university-job-portal/
├── client/                        # React + Tailwind frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── admin/             # Recruiter dashboard components
│   │   │   ├── auth/              # Login & Register pages
│   │   │   ├── shared/            # Navbar, Footer
│   │   │   ├── ui/                # shadcn/ui components
│   │   │   ├── AppliedJobTable.jsx
│   │   │   ├── Browse.jsx
│   │   │   ├── CategoryCarousel.jsx
│   │   │   ├── FilterCard.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Job.jsx
│   │   │   ├── JobDescription.jsx
│   │   │   ├── Jobs.jsx
│   │   │   ├── LatestJobCards.jsx
│   │   │   ├── LatestJobs.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── UpdateProfileDialog.jsx
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── redux/
│   │   ├── utils/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env                       # VITE_BACKEND_URL=https://university-job-portal.onrender.com
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                        # Express backend API
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   │   ├── cloudinary.js
│   │   └── datauri.js
│   ├── .env
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

## 🔒 Authentication Flow

- Users register/login with their email and password
- JWT tokens are issued and stored securely in HTTP-only cookies
- Access is restricted based on user roles (student / recruiter)
- Protected routes for job posting, applications, and dashboards

---

## ☁️ File Upload Flow

- Profile photos and resumes are uploaded via **Multer** on the backend
- Files are converted to base64 Data URIs and sent to **Cloudinary**
- Cloudinary returns a secure public URL stored in MongoDB
- Resume PDFs can be viewed or downloaded directly from the profile page

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sheikhhamza08/university-job-portal.git
cd university-job-portal
```

### 2. Setup Environment Variables

Create a `.env` file inside the `server/` directory:

```bash
VITE_BACKEND_URL = "http://localhost:8000"
```

```bash
MONGODB_URI = ""
PORT = 8000
SECRET_KEY = ""

CLOUDINARY_API_KEY = ""
CLOUDINARY_SECRET_KEY = ""
CLOUDINARY_NAME = ""

NODE_ENV = ""
```

### 3. Install Dependencies

```bash
# Install frontend packages
cd client
npm install

# Install backend packages
cd ../server
npm install
```

### 4. Run the Application

```bash
# Start backend server
cd server
npm run dev

# Start frontend dev server
cd ../client
npm run dev
```

### Open in browser:

- **Frontend → http://localhost:5173**
- **Backend → http://localhost:8000**

---

## 🌍 Live URLs

| Service  | URL |
|----------|-----|
| Frontend | [https://university-job-portal.vercel.app](https://university-job-portal.vercel.app) |
| Backend  | [https://university-job-portal.onrender.com](https://university-job-portal.onrender.com) |

---


## 👨‍💻 Author
- **Made with 💙 by Hamza Sheikh**
- \*\*🔗 Connect on [LinkedIn](https://www.linkedin.com/in/sheikh-hamza-uddin-745606217/)

---
