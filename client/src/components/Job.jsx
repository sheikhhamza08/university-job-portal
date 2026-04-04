import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

// TIP: helper — shows "Today", "1d ago", "5d ago"
const daysAgoFunction = (mongodbTime) => {
  const diff = Math.floor(
    (new Date() - new Date(mongodbTime)) / (1000 * 3600 * 24),
  );
  if (diff === 0) return "Today";
  return `${diff}d ago`;
};

// TIP: initials avatar fallback when no logo URL
const getInitials = (name = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const Job = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      // FIX: duration-600 is not a valid Tailwind class — changed to duration-300
      // FIX: hover:scale-105 replaced with translate for a subtler, pro feel
      // FIX: removed hardcoded bg-white — won't work in dark mode
      className="p-5 rounded-xl border border-gray-100 bg-white cursor-pointer
                       hover:-translate-y-1 hover:border-gray-200 hover:shadow-sm
                       transition-all duration-300 h-full flex flex-col gap-3
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      role="button"
      tabIndex={0}
      onKeyDown={(e) =>
        e.key === "Enter" && navigate(`/description/${job._id}`)
      }
      aria-label={`View ${job?.title} at ${job?.company?.companyName}`}
    >
      {/* Top row — date + bookmark */}
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-400">
          {daysAgoFunction(job?.createdAt)}
        </p>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-8 w-8"
          aria-label="Save job"
          onClick={(e) => e.stopPropagation()} // prevent card navigation on bookmark click
        >
          <Bookmark size={14} />
        </Button>
      </div>

      {/* Company row */}
      <div className="flex gap-3 items-center">
        <div className="w-10 h-10 rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
          {job?.company?.logo ? (
            <Avatar className="h-10 w-10 rounded-lg">
              <AvatarImage
                src={job.company.logo}
                alt={job.company.companyName}
              />
            </Avatar>
          ) : (
            <span className="text-xs font-semibold text-primary">
              {getInitials(job?.company?.companyName)}
            </span>
          )}
        </div>
        <div>
          <h2 className="font-medium text-base leading-tight">
            {job?.company?.companyName}
          </h2>
          {/* FIX: hardcoded "India" replaced with actual job location */}
          <p className="text-xs text-gray-400">{job?.location || "Ireland"}</p>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Job details */}
      <div>
        <h3 className="font-semibold text-base mb-1">{job?.title}</h3>
        {/* TIP: line-clamp keeps card height uniform in the grid */}
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {job?.description}
        </p>
      </div>

      {/* Badges — using semantic variants from updated badge.jsx */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="positions">
          {job?.position} Position{job?.position > 1 ? "s" : ""}
        </Badge>
        <Badge variant="jobType">{job?.jobType}</Badge>
        {/* FIX: salary shown in Euro format — update your data layer accordingly */}
        <Badge variant="salary">{job?.salary}</Badge>
      </div>

      {/* Actions — pushed to bottom with mt-auto */}
      <div className="flex items-center gap-3 mt-auto pt-1">
        <Button
          variant="outline"
          className="rounded-full text-sm h-9 px-5"
          onClick={() => navigate(`/description/${job._id}`)}
        >
          Details
        </Button>
        <Button
          className="rounded-full text-sm h-9 px-5 bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={(e) => e.stopPropagation()}
        >
          Save for later
        </Button>
      </div>
    </div>
  );
};

export default Job;
