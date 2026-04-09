import React from "react";
import { Badge } from "./ui/badge";
// FIX: removed unused `Ghost` import from lucide-react
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

// TIP: helper to generate initials avatar when no company logo is available
function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function LatestJobCards({ job }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      // FIX: duration-600 → duration-300 (valid Tailwind class)
      // FIX: hover:scale-110 → hover:-translate-y-1 (subtler, more professional)
      // FIX: removed hardcoded bg-white — use theme-aware background
      // TIP: added focus-visible ring for keyboard accessibility
      className="p-5 rounded-xl border border-gray-100 bg-white cursor-pointer
                 hover:-translate-y-1 hover:shadow-md hover:border-gray-200
                 transition-all duration-300
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6A38C2]"
      role="button"
      tabIndex={0}
      onKeyDown={(e) =>
        e.key === "Enter" && navigate(`/description/${job._id}`)
      }
      aria-label={`View ${job?.title} at ${job?.company?.companyName}`}
    >
      {/* Company row */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-xs font-semibold text-[#6A38C2] flex-shrink-0">
          {getInitials(job?.company?.companyName)}
        </div>
        <div>
          <h2 className="font-medium text-base leading-tight">
            {job?.company?.companyName}
          </h2>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <MapPin size={11} />
            {job?.location}
          </p>
        </div>
      </div>

      <hr className="border-gray-100 mb-3" />

      {/* Job info */}
      <div className="mb-3">
        <h3 className="font-semibold text-base mb-1">{job?.title}</h3>
        {/* TIP: line-clamp-2 prevents long descriptions from breaking card height */}
        <p className="text-sm text-gray-500 line-clamp-2">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge
          className="text-blue-700 font-medium bg-blue-50 border-blue-100"
          variant="outline"
        >
          {job?.position} Position{job?.position > 1 ? "s" : ""}
        </Badge>
        <Badge
          className="text-[#F83002] font-medium bg-red-50 border-red-100"
          variant="outline"
        >
          {job?.jobType}
        </Badge>
        <Badge
          className="text-[#7209b7] font-medium bg-purple-50 border-purple-100"
          variant="outline"
        >
          €{job?.salary}
        </Badge>
      </div>
    </div>
  );
}

export default LatestJobCards;
