import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { Bookmark } from "lucide-react";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - createdAt.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  const daysAgo = daysAgoFunction(job?.createdAt);

  return (
    <div
      className="rounded-xl flex flex-col gap-3 h-full transition-all duration-200 hover:-translate-y-0.5"
      style={{
        padding: "1.1rem",
        border: "0.5px solid oklch(0.929 0.013 255.508)",
        background: "oklch(1 0 0)",
        fontFamily: "'Sora', sans-serif",
        cursor: "pointer",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "oklch(0.554 0.046 257.417)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "oklch(0.929 0.013 255.508)")
      }
    >
      {/* Top row */}
      <div className="flex justify-between items-start">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden"
          style={{
            border: "0.5px solid oklch(0.929 0.013 255.508)",
            background: "oklch(0.968 0.007 247.896)",
          }}
        >
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={
                job?.company?.logo ||
                "https://th.bing.com/th/id/OIP.NU9zscMHAn83CpLA9fDjrgHaHa?rs=1&pid=ImgDetMain"
              }
            />
          </Avatar>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className="text-xs"
            style={{
              color: "oklch(0.554 0.046 257.417)",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
          </span>
          <button
            onClick={() => setSaved(!saved)}
            className="w-7 h-7 rounded-md flex items-center justify-center transition-colors"
            style={{
              border: "0.5px solid oklch(0.929 0.013 255.508)",
              background: saved ? "oklch(0.208 0.042 265.755)" : "transparent",
              color: saved
                ? "oklch(0.984 0.003 247.858)"
                : "oklch(0.554 0.046 257.417)",
              cursor: "pointer",
            }}
            aria-label="Save job"
          >
            <Bookmark size={13} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Company info */}
      <div>
        <p
          className="text-sm font-semibold"
          style={{ color: "oklch(0.129 0.042 264.695)" }}
        >
          {job?.company?.companyName}
        </p>
        <p className="text-xs" style={{ color: "oklch(0.554 0.046 257.417)" }}>
          📍 {job?.location || "Dublin, Ireland"}
        </p>
      </div>

      {/* Title & Description */}
      <div>
        <h1
          className="font-semibold text-sm mb-1"
          style={{
            color: "oklch(0.129 0.042 264.695)",
            letterSpacing: "-0.01em",
            lineHeight: "1.35",
          }}
        >
          {job?.title}
        </h1>
        <p
          className="text-xs line-clamp-2"
          style={{
            color: "oklch(0.554 0.046 257.417)",
            lineHeight: "1.55",
          }}
        >
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5">
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{
            background: "#eff6ff",
            color: "#1d4ed8",
            border: "0.5px solid #bfdbfe",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {job?.position} positions
        </span>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{
            background: "#fff1f2",
            color: "#be123c",
            border: "0.5px solid #fecdd3",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {job?.jobType}
        </span>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{
            background: "#faf5ff",
            color: "#7c3aed",
            border: "0.5px solid #e9d5ff",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {job?.salary} LPA
        </span>
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between pt-2 mt-auto"
        style={{ borderTop: "0.5px solid oklch(0.929 0.013 255.508)" }}
      >
        <span
          className="text-xs font-semibold"
          style={{
            fontFamily: "'DM Mono', monospace",
            color: "oklch(0.129 0.042 264.695)",
          }}
        >
          ₹{job?.salary} LPA
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/description/${job._id}`)}
            className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
            style={{
              border: "0.5px solid oklch(0.929 0.013 255.508)",
              background: "transparent",
              color: "oklch(0.129 0.042 264.695)",
              fontFamily: "'Sora', sans-serif",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "oklch(0.968 0.007 247.896)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            Details
          </button>
          <button
            className="text-xs font-medium px-3 py-1.5 rounded-lg transition-opacity"
            style={{
              background: "oklch(0.208 0.042 265.755)",
              color: "oklch(0.984 0.003 247.858)",
              border: "none",
              fontFamily: "'Sora', sans-serif",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Job;
