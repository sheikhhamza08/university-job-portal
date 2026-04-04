import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div style={{ fontFamily: "'Sora', sans-serif" }}>
      <Navbar />

      <div className="px-[5%] lg:px-[10%] w-full my-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-3"
            style={{
              background: "oklch(0.968 0.007 247.896)",
              border: "0.5px solid oklch(0.929 0.013 255.508)",
              color: "oklch(0.554 0.046 257.417)",
              letterSpacing: "0.04em",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
            Browse Results
          </div>
          <h1
            className="font-bold text-2xl tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Search Results
            <span
              className="ml-2 text-base font-medium px-2 py-0.5 rounded-md align-middle"
              style={{
                background: "oklch(0.968 0.007 247.896)",
                color: "oklch(0.554 0.046 257.417)",
                border: "0.5px solid oklch(0.929 0.013 255.508)",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {allJobs.length}
            </span>
          </h1>
        </motion.div>

        {allJobs.length <= 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 gap-3"
            style={{ color: "oklch(0.554 0.046 257.417)" }}
          >
            <svg
              className="w-10 h-10 mb-2 opacity-30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4m8-4v4m0 0l-2-2m2 2l2-2" />
            </svg>
            <p className="text-center font-medium">No jobs found</p>
            <p className="text-sm opacity-60">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allJobs.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
              >
                <Job job={job} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Browse;
