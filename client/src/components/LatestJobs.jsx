import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function LatestJobs() {
  const { allJobs } = useSelector((state) => state.job);

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      // FIX: removed empty viewport={{}} — not needed
      className="px-[5%] w-full my-20"
    >
      <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>

      {/* TIP: empty state when no jobs are loaded */}
      {!allJobs?.length ? (
        <p className="text-gray-400 text-sm mt-6">
          No job openings available right now. Check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {/* FIX: slice(0, 6) fills a clean 3-col grid — no orphan card */}
          {allJobs.slice(0, 6).map((job) => (
            // FIX: use job._id as key (was already correct — kept as-is)
            <LatestJobCards key={job._id} job={job} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default LatestJobs;
