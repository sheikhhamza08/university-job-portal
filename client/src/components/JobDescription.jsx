import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICANT_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";

const DetailRow = ({ label, value, mono = false }) => (
  <div
    className="flex flex-col sm:flex-row sm:items-baseline py-2.5 gap-4"
    style={{ borderBottom: "0.5px solid oklch(0.929 0.013 255.508)" }}
  >
    <span
      className="text-xs font-semibold flex-shrink-0 mb-1 sm:mb-0"
      style={{
        width: "auto sm:w-[140px]",
        color: "oklch(0.129 0.042 264.695)",
      }}
    >
      {label}
    </span>
    <span
      className="text-xs flex-1"
      style={{
        color: "oklch(0.554 0.046 257.417)",
        lineHeight: "1.6",
        fontFamily: mono ? "'DM Mono', monospace" : "'Sora', sans-serif",
      }}
    >
      {value}
    </span>
  </div>
);

const SectionCard = ({ children, className = "" }) => (
  <div
    className={`rounded-xl p-3 sm:p-5 ${className}`}
    style={{
      border: "0.5px solid oklch(0.929 0.013 255.508)",
      padding: "1rem",
    }}
  >
    {children}
  </div>
);

const SectionHeading = ({ children }) => (
  <div
    className="text-xs font-semibold uppercase tracking-widest mb-4 pb-3"
    style={{
      color: "oklch(0.554 0.046 257.417)",
      borderBottom: "0.5px solid oklch(0.929 0.013 255.508)",
      letterSpacing: "0.08em",
    }}
  >
    {children}
  </div>
);

const JobDescription = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleJob } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id,
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const params = useParams();
  const jobId = params.id;

  const applyJobHandler = async () => {
    try {
      const response = await axios.post(
        `${APPLICANT_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true },
      );
      if (response.data.success) {
        setIsApplied(true);
        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [
              ...singleJob.applications,
              { applicant: user?._id, status: "pending" },
            ],
          }),
        );
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply");
    }
  };

  useEffect(() => {
    const fetchSingleJobDescription = async () => {
      try {
        const response = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch(setSingleJob(response.data.job));
          setIsApplied(
            response.data.job.applications?.some(
              (application) => application.applicant === user?._id,
            ) || false,
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleJobDescription();
  }, [jobId, dispatch, user?._id]);

  const fillRate =
    singleJob?.applications?.length && singleJob?.position
      ? Math.min(
          (singleJob.applications.length / singleJob.position) * 100,
          100,
        )
      : 0;

  const getRequirementsArray = () => {
    if (!singleJob?.requirements) return [];
    if (Array.isArray(singleJob.requirements)) return singleJob.requirements;
    if (typeof singleJob.requirements === "string") {
      return singleJob.requirements.split(",").map((req) => req.trim());
    }
    return [];
  };

  const getCompanyDisplayName = () => {
    if (singleJob?.company?.companyName) return singleJob.company.companyName;
    if (typeof singleJob?.company === "string") return "Company";
    return "Company";
  };

  return (
    <div
      style={{
        fontFamily: "'Sora', sans-serif",
        background: "oklch(1 0 0)",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <div className="px-4 sm:px-[6%] my-6 sm:my-10 max-w-5xl mx-auto">
        {/* Breadcrumb - Hidden on mobile, show on tablet/desktop */}
        <div
          className="hidden sm:flex items-center gap-2 text-xs mb-7"
          style={{ color: "oklch(0.554 0.046 257.417)" }}
        >
          <span
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <span style={{ opacity: 0.4 }}>›</span>
          <span
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/browse")}
          >
            Browse Jobs
          </span>
          <span style={{ opacity: 0.4 }}>›</span>
          <span
            style={{ color: "oklch(0.129 0.042 264.695)", fontWeight: 500 }}
          >
            {singleJob?.title}
          </span>
        </div>

        {/* Header card */}
        <SectionCard className="mb-5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex gap-4 items-start">
              {/* Logo */}
              <div
                className="rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold"
                style={{
                  width: "48px sm:w-[52px]",
                  height: "48px sm:h-[52px]",
                  border: "0.5px solid oklch(0.929 0.013 255.508)",
                  background: "oklch(0.968 0.007 247.896)",
                  color: "oklch(0.554 0.046 257.417)",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {getCompanyDisplayName().slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <h1
                  className="font-bold mb-1 text-lg sm:text-[1.3rem]"
                  style={{
                    letterSpacing: "-0.025em",
                    lineHeight: "1.2",
                  }}
                >
                  {singleJob?.title}
                </h1>
                <p
                  className="text-xs mb-3"
                  style={{ color: "oklch(0.554 0.046 257.417)" }}
                >
                  {getCompanyDisplayName()}
                  &nbsp;·&nbsp; 📍 {singleJob?.location}
                  &nbsp;·&nbsp; Posted {singleJob?.createdAt?.split("T")[0]}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    {
                      label: `${singleJob?.position} Positions`,
                      show: singleJob?.position,
                      bg: "#eff6ff",
                      color: "#1d4ed8",
                      border: "#bfdbfe",
                    },
                    {
                      label: singleJob?.jobType,
                      show: singleJob?.jobType,
                      bg: "#fff1f2",
                      color: "#be123c",
                      border: "#fecdd3",
                    },
                    {
                      label: `${singleJob?.salary} LPA`,
                      show: singleJob?.salary,
                      bg: "#faf5ff",
                      color: "#7c3aed",
                      border: "#e9d5ff",
                    },
                    {
                      label: `${singleJob?.experienceLevel} yrs exp`,
                      show: singleJob?.experienceLevel,
                      bg: "#f0fdf4",
                      color: "#15803d",
                      border: "#bbf7d0",
                    },
                  ].map(
                    ({ label, show, bg, color, border }) =>
                      show && (
                        <span
                          key={label}
                          className="text-[11px] sm:text-xs font-medium px-2 py-1 rounded-full"
                          style={{
                            background: bg,
                            color,
                            border: `0.5px solid ${border}`,
                            fontFamily: "'DM Mono', monospace",
                          }}
                        >
                          {label}
                        </span>
                      ),
                  )}
                </div>
              </div>
            </div>

            {/* Apply button - Sticky on mobile */}
            <div className="sm:block sticky bottom-4 sm:static z-10 mt-2 sm:mt-0">
              <button
                onClick={isApplied ? undefined : applyJobHandler}
                disabled={isApplied}
                className="w-full sm:w-auto text-sm font-semibold px-5 py-2.5 rounded-xl transition-opacity"
                style={{
                  background: isApplied
                    ? "oklch(0.968 0.007 247.896)"
                    : "oklch(0.208 0.042 265.755)",
                  color: isApplied
                    ? "oklch(0.554 0.046 257.417)"
                    : "oklch(0.984 0.003 247.858)",
                  border: isApplied
                    ? "0.5px solid oklch(0.929 0.013 255.508)"
                    : "none",
                  cursor: isApplied ? "not-allowed" : "pointer",
                  fontFamily: "'Sora', sans-serif",
                  flexShrink: 0,
                  boxShadow: isApplied ? "none" : "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                {isApplied ? "✓ Applied" : "Apply Now"}
              </button>
            </div>
          </div>
        </SectionCard>

        {/* Two-col grid - Stack on mobile, side-by-side on desktop */}
        <div
          className="flex flex-col lg:grid gap-5"
          style={{ gridTemplateColumns: "1fr 260px", alignItems: "start" }}
        >
          {/* Main column */}
          <div className="flex flex-col gap-5 order-1 lg:order-none">
            <SectionCard>
              <SectionHeading>Job Description</SectionHeading>
              <p
                className="text-sm"
                style={{
                  color: "oklch(0.554 0.046 257.417)",
                  lineHeight: "1.7",
                }}
              >
                {singleJob?.description}
              </p>
            </SectionCard>

            {getRequirementsArray().length > 0 && (
              <SectionCard>
                <SectionHeading>Requirements</SectionHeading>
                <ul className="flex flex-col gap-2">
                  {getRequirementsArray().map((req, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "oklch(0.129 0.042 264.695)" }}
                    >
                      <span
                        className="rounded-full flex-shrink-0"
                        style={{
                          width: "6px",
                          height: "6px",
                          background: "oklch(0.208 0.042 265.755)",
                        }}
                      />
                      {req.trim()}
                    </li>
                  ))}
                </ul>
              </SectionCard>
            )}

            <SectionCard>
              <SectionHeading>Overview</SectionHeading>
              <DetailRow label="Role" value={singleJob?.title} />
              <DetailRow label="Location" value={singleJob?.location} />
              <DetailRow
                label="Experience"
                value={`${singleJob?.experienceLevel} yrs minimum`}
                mono
              />
              <DetailRow
                label="Salary"
                value={`${singleJob?.salary} LPA`}
                mono
              />
              <DetailRow label="Job Type" value={singleJob?.jobType} />
              <DetailRow
                label="Positions"
                value={`${singleJob?.position} open`}
                mono
              />
              <DetailRow
                label="Total Applicants"
                value={singleJob?.applications?.length || 0}
                mono
              />
              <div className="flex items-baseline py-2.5">
                <span
                  className="text-xs font-semibold flex-shrink-0"
                  style={{
                    width: "140px",
                    color: "oklch(0.129 0.042 264.695)",
                  }}
                >
                  Posted Date
                </span>
                <span
                  className="text-xs"
                  style={{
                    color: "oklch(0.554 0.046 257.417)",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {singleJob?.createdAt?.split("T")[0]}
                </span>
              </div>
            </SectionCard>
          </div>

          {/* Sidebar - Moves above main content on mobile */}
          <div className="flex flex-col gap-5 order-2 lg:order-none">
            <SectionCard>
              <SectionHeading>Quick Stats</SectionHeading>
              {[
                { k: "Applicants", v: singleJob?.applications?.length ?? 0 },
                { k: "Positions", v: singleJob?.position },
                { k: "Response rate", v: "92%" },
                { k: "Avg. response", v: "48h" },
              ].map(({ k, v }) => (
                <div
                  key={k}
                  className="flex justify-between items-center py-2 text-xs"
                  style={{
                    borderBottom: "0.5px solid oklch(0.929 0.013 255.508)",
                  }}
                >
                  <span style={{ color: "oklch(0.554 0.046 257.417)" }}>
                    {k}
                  </span>
                  <span
                    style={{
                      fontWeight: 600,
                      fontFamily: "'DM Mono', monospace",
                      color: "oklch(0.129 0.042 264.695)",
                    }}
                  >
                    {v}
                  </span>
                </div>
              ))}
              {/* Fill rate bar */}
              <div className="mt-3">
                <span
                  className="text-xs"
                  style={{ color: "oklch(0.554 0.046 257.417)" }}
                >
                  Fill rate
                </span>
                <div
                  className="mt-2 rounded-full overflow-hidden"
                  style={{
                    height: "4px",
                    background: "oklch(0.968 0.007 247.896)",
                  }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${fillRate}%`,
                      background: "oklch(0.208 0.042 265.755)",
                      transition: "width 0.6s ease",
                    }}
                  />
                </div>
                <div
                  className="flex justify-between text-xs mt-1.5"
                  style={{ color: "oklch(0.554 0.046 257.417)" }}
                >
                  <span>{singleJob?.applications?.length || 0} applied</span>
                  <span>{singleJob?.position} seats</span>
                </div>
              </div>
            </SectionCard>

            <SectionCard>
              <SectionHeading>About Company</SectionHeading>
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    width: "36px",
                    height: "36px",
                    border: "0.5px solid oklch(0.929 0.013 255.508)",
                    background: "oklch(0.968 0.007 247.896)",
                    color: "oklch(0.554 0.046 257.417)",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {getCompanyDisplayName().slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {getCompanyDisplayName()}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.554 0.046 257.417)" }}
                  >
                    Technology & Consulting
                  </p>
                </div>
              </div>
              <p
                className="text-xs"
                style={{
                  color: "oklch(0.554 0.046 257.417)",
                  lineHeight: "1.65",
                }}
              >
                {singleJob?.company?.description ||
                  "A leading company offering exciting career opportunities for talented professionals."}
              </p>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
