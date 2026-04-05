import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Button } from "./ui/button";
import { SlidersHorizontal, X } from "lucide-react";

function Jobs() {
  const dispatch = useDispatch();
  useGetAllJobs();

  const { allJobs, searchedQuery } = useSelector((state) => state.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter logic
  useEffect(() => {
    if (searchedQuery) {
      const filteredJob = allJobs.filter((job) => {
        return (
          job?.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.description
            .toLowerCase()
            .includes(searchedQuery.toLowerCase()) ||
          job?.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
        // job?.company.toLowerCase().includes(searchedQuery.toLowerCase())
      });
      setFilterJobs(filteredJob);
      // dispatch(setSearchedQuery(""));
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <>
      <Navbar />

      <div className="sm:px-[5%] max-sm:px-4 lg:px-[8%] mt-6 mb-16">
        {/* Mobile filter toggle */}
        <div className="sm:hidden flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-900">
              {filterJobs.length}
            </span>{" "}
            jobs found
          </p>
          <Button
            variant="outline"
            className="rounded-full gap-2 text-sm h-9"
            onClick={() => setIsFilterOpen((prev) => !prev)}
          >
            {isFilterOpen ? <X size={14} /> : <SlidersHorizontal size={14} />}
            {isFilterOpen ? "Close" : "Filter"}
          </Button>
        </div>

        {/* Mobile filter drawer */}
        {/* FIX: removed empty viewport={{}} */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              key="mobile-filter"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="sm:hidden mb-5 overflow-hidden"
            >
              <FilterCard />
              <hr className="mt-4 border-gray-100" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="sm:flex gap-6">
          {/* Desktop sidebar */}
          <div className="sm:min-w-[200px] max-sm:hidden">
            <FilterCard />
          </div>

          {/* Job grid */}
          <div className="w-full min-w-0">
            {/* Desktop results count */}
            <div className="hidden sm:flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-medium text-gray-900">
                  {filterJobs.length}
                </span>{" "}
                jobs
                {searchedQuery && (
                  <span className="ml-1">
                    for{" "}
                    <span className="font-medium text-primary">
                      "{searchedQuery}"
                    </span>
                  </span>
                )}
              </p>
            </div>

            {filterJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-gray-400 text-base">No jobs found</p>
                <p className="text-gray-300 text-sm mt-1">
                  Try adjusting your filters
                </p>
                <Button
                  variant="outline"
                  className="mt-4 rounded-full text-sm"
                  onClick={() => dispatch(setSearchedQuery(""))}
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              // FIX: removed h-[95vh] overflow-y-auto — causes nested scroll issues
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                <AnimatePresence>
                  {filterJobs.map((job) => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      // FIX: changed x:100 → y:16 — horizontal slide looks jarring in a grid
                      transition={{ duration: 0.25 }}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Jobs;
