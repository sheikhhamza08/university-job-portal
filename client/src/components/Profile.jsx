import React, { useState } from "react";
import { Mail, Phone, Pen, FileText } from "lucide-react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const SectionLabel = ({ children }) => (
  <p
    className="text-xs font-semibold uppercase tracking-widest mb-2.5"
    style={{ color: "oklch(0.554 0.046 257.417)", letterSpacing: "0.08em" }}
  >
    {children}
  </p>
);

function Profile() {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { allAppliedJobs } = useSelector((store) => store.job);

  const accepted =
    allAppliedJobs?.filter((j) => j.status === "accepted").length || 0;
  const pending =
    allAppliedJobs?.filter((j) => j.status === "pending").length || 0;
  const rejected =
    allAppliedJobs?.filter((j) => j.status === "rejected").length || 0;

  return (
    <div
      style={{
        fontFamily: "'Sora', sans-serif",
        background: "oklch(1 0 0)",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <div className="px-[6%] max-sm:px-[3%] py-8 max-w-4xl mx-auto">
        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex overflow-hidden rounded-xl mb-5"
          style={{ border: "0.5px solid oklch(0.929 0.013 255.508)" }}
        >
          {[
            {
              n: allAppliedJobs?.length || 0,
              l: "Applied",
              color: "oklch(0.129 0.042 264.695)",
            },
            { n: accepted, l: "Accepted", color: "#15803d" },
            { n: pending, l: "Pending", color: "#a16207" },
            { n: rejected, l: "Rejected", color: "#be123c" },
          ].map(({ n, l, color }, i, arr) => (
            <div
              key={l}
              className="flex-1 flex flex-col items-center py-3 gap-0.5"
              style={{
                borderRight:
                  i < arr.length - 1
                    ? "0.5px solid oklch(0.929 0.013 255.508)"
                    : "none",
              }}
            >
              <span
                className="font-bold"
                style={{
                  fontSize: "18px",
                  letterSpacing: "-0.03em",
                  color,
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {n}
              </span>
              <span
                className="text-xs"
                style={{ color: "oklch(0.554 0.046 257.417)" }}
              >
                {l}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl sm:p-6 p-3 mb-5"
          style={{ border: "0.5px solid oklch(0.929 0.013 255.508)" }}
        >
          {/* Top row */}
          <div
            className="flex items-start justify-between gap-4 mb-6 pb-6 flex-col-reverse sm:flex-row"
            style={{ borderBottom: "0.5px solid oklch(0.929 0.013 255.508)" }}
          >
            <div className="sm:flex items-center gap-4">
              <img
                src={
                  user?.profile?.profilePhoto || "https://github.com/shadcn.png"
                }
                alt="profile"
                className="rounded-full object-cover flex-shrink-0"
                style={{
                  width: "72px",
                  height: "72px",
                  border: "0.5px solid oklch(0.929 0.013 255.508)",
                }}
              />
              <div>
                <h1
                  className="font-bold mb-1"
                  style={{ fontSize: "1.2rem", letterSpacing: "-0.025em" }}
                >
                  {user?.fullname}
                </h1>
                <p
                  className="text-xs"
                  style={{
                    color: "oklch(0.554 0.046 257.417)",
                    lineHeight: "1.55",
                    maxWidth: "360px",
                  }}
                >
                  {user?.profile?.bio || "No bio added yet."}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg transition-colors flex-shrink-0"
              style={{
                border: "0.5px solid oklch(0.929 0.013 255.508)",
                background: "oklch(1 0 0)",
                fontFamily: "'Sora', sans-serif",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  "oklch(0.968 0.007 247.896)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "oklch(1 0 0)")
              }
            >
              <Pen size={12} /> Edit Profile
            </button>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {[
              { icon: <Mail size={14} />, label: "Email", value: user?.email },
              {
                icon: <Phone size={14} />,
                label: "Phone",
                value: user?.phoneNumber,
              },
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                className="flex items-center sm:gap-3 gap-2 sm:px-3.5 px-2 sm:py-2.5 py-1.5 rounded-xl"
                style={{
                  border: "0.5px solid oklch(0.929 0.013 255.508)",
                  background: "oklch(0.968 0.007 247.896)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "oklch(1 0 0)",
                    border: "0.5px solid oklch(0.929 0.013 255.508)",
                    color: "oklch(0.554 0.046 257.417)",
                  }}
                >
                  {icon}
                </div>
                <div>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.554 0.046 257.417)" }}
                  >
                    {label}
                  </p>
                  <p className="text-xs font-medium">
                    {value || "Not provided"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="mb-6">
            <SectionLabel>Skills</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      border: "0.5px solid oklch(0.929 0.013 255.508)",
                      background: "oklch(1 0 0)",
                      color: "oklch(0.129 0.042 264.695)",
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span
                  className="text-xs"
                  style={{ color: "oklch(0.554 0.046 257.417)" }}
                >
                  No skills added yet.
                </span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div>
            <SectionLabel>Resume</SectionLabel>
            {user?.profile?.resume ? (
              <div
                className="flex items-center sm:gap-3 gap-2 sm:px-3.5 px-2 sm:py-2.5 py-1.5 rounded-xl"
                style={{ border: "0.5px solid oklch(0.929 0.013 255.508)" }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "oklch(0.968 0.007 247.896)",
                    border: "0.5px solid oklch(0.929 0.013 255.508)",
                    color: "oklch(0.554 0.046 257.417)",
                  }}
                >
                  <FileText size={14} />
                </div>
                <div className="flex-1">
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.554 0.046 257.417)" }}
                  >
                    Uploaded Resume
                  </p>
                  <a
                    href={user.profile.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium hover:underline"
                    style={{ color: "#1d4ed8" }}
                  >
                    {user.profile.resumeOriginalName || "View Resume"}
                  </a>
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: "#f0fdf4",
                    color: "#15803d",
                    border: "0.5px solid #bbf7d0",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  PDF
                </span>
              </div>
            ) : (
              <span
                className="text-xs"
                style={{ color: "oklch(0.554 0.046 257.417)" }}
              >
                No resume uploaded.
              </span>
            )}
          </div>
        </motion.div>

        {/* Applied jobs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl overflow-hidden"
          style={{ border: "0.5px solid oklch(0.929 0.013 255.508)" }}
        >
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: "0.5px solid oklch(0.929 0.013 255.508)" }}
          >
            <h2
              className="text-sm font-bold"
              style={{ letterSpacing: "-0.015em" }}
            >
              Applied Jobs
            </h2>
            <span
              className="text-xs px-2.5 py-1 rounded-full"
              style={{
                background: "oklch(0.968 0.007 247.896)",
                color: "oklch(0.554 0.046 257.417)",
                border: "0.5px solid oklch(0.929 0.013 255.508)",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {allAppliedJobs?.length || 0} application
              {allAppliedJobs?.length !== 1 ? "s" : ""}
            </span>
          </div>
          <AppliedJobTable />
        </motion.div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
      <Footer />
    </div>
  );
}

export default Profile;
