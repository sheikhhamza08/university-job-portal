import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import { Briefcase, Plus, Search, Filter } from "lucide-react";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const colors = {
    darkNavy: "#1B2C62",
    brightBlue: "#0393DA",
    lightBlue: "#8CB2CF",
    white: "#FDFEFE",
    primaryGradient: "linear-gradient(135deg, #1B2C62 0%, #0393DA 100%)",
    secondaryGradient: "linear-gradient(135deg, #0393DA 0%, #8CB2CF 100%)",
  };

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.lightBlue}05 100%)`,
      }}
    >
      <Navbar />

      <div className="px-4 sm:px-[5%] py-8 sm:py-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="p-2 rounded-xl"
              style={{ background: colors.primaryGradient }}
            >
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <h1
              className="text-2xl sm:text-3xl font-bold"
              style={{ color: colors.darkNavy }}
            >
              Manage Jobs
            </h1>
          </div>
          <p className="text-sm" style={{ color: colors.lightBlue }}>
            View and manage all your posted job listings
          </p>
        </div>

        {/* Search and Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-8">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-all duration-200"
              style={{
                color: isFocused ? colors.brightBlue : colors.lightBlue,
              }}
            />
            <Input
              className="pl-10 py-5 transition-all duration-200"
              style={{
                borderColor: isFocused
                  ? colors.brightBlue
                  : `${colors.lightBlue}30`,
                boxShadow: isFocused
                  ? `0 0 0 3px ${colors.brightBlue}10`
                  : "none",
              }}
              placeholder="Search by company name or job role..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>

          <Button
            className="cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 py-5"
            style={{
              background: colors.primaryGradient,
              backgroundSize: "200% 100%",
              backgroundPosition: "0% 0%",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundPosition = "100% 0%";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundPosition = "0% 0%";
            }}
            onClick={() => navigate("/admin/jobs/create")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div
            className="rounded-xl p-4 transition-all duration-300 hover:scale-105"
            style={{
              background: `${colors.lightBlue}05`,
              border: `1px solid ${colors.lightBlue}15`,
            }}
          >
            <p className="text-xs mb-1" style={{ color: colors.lightBlue }}>
              Total Jobs
            </p>
            <p
              className="text-2xl font-bold"
              style={{ color: colors.darkNavy }}
            >
              0
            </p>
          </div>
          <div
            className="rounded-xl p-4 transition-all duration-300 hover:scale-105"
            style={{
              background: `${colors.lightBlue}05`,
              border: `1px solid ${colors.lightBlue}15`,
            }}
          >
            <p className="text-xs mb-1" style={{ color: colors.lightBlue }}>
              Active Jobs
            </p>
            <p
              className="text-2xl font-bold"
              style={{ color: colors.darkNavy }}
            >
              0
            </p>
          </div>
          <div
            className="rounded-xl p-4 transition-all duration-300 hover:scale-105"
            style={{
              background: `${colors.lightBlue}05`,
              border: `1px solid ${colors.lightBlue}15`,
            }}
          >
            <p className="text-xs mb-1" style={{ color: colors.lightBlue }}>
              Total Applicants
            </p>
            <p
              className="text-2xl font-bold"
              style={{ color: colors.darkNavy }}
            >
              0
            </p>
          </div>
          <div
            className="rounded-xl p-4 transition-all duration-300 hover:scale-105"
            style={{
              background: `${colors.lightBlue}05`,
              border: `1px solid ${colors.lightBlue}15`,
            }}
          >
            <p className="text-xs mb-1" style={{ color: colors.lightBlue }}>
              Hiring Rate
            </p>
            <p
              className="text-2xl font-bold"
              style={{ color: colors.darkNavy }}
            >
              0%
            </p>
          </div>
        </div>

        {/* Jobs Table */}
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
