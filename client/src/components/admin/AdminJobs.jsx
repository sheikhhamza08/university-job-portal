import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import {
  Briefcase,
  Plus,
  Search,
  TrendingUp,
  Users,
  CheckCircle,
} from "lucide-react";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Get jobs from Redux store
  const { allAdminJobs } = useSelector((state) => state.job);

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

  // Calculate stats from jobs data
  const calculateStats = () => {
    if (!allAdminJobs || allAdminJobs.length === 0) {
      return {
        totalJobs: 0,
        activeJobs: 0,
        totalApplicants: 0,
        hiringRate: 0,
      };
    }

    const totalJobs = allAdminJobs.length;

    // Calculate active jobs (jobs with positions > 0 or not expired)
    const activeJobs = allAdminJobs.filter((job) => {
      // You can add more conditions based on your business logic
      // For example: job.position > 0, job.status === 'active', etc.
      return job.position > 0;
    }).length;

    // Calculate total applicants across all jobs
    const totalApplicants = allAdminJobs.reduce((sum, job) => {
      return sum + (job.applications?.length || 0);
    }, 0);

    // Calculate hiring rate (applicants per position)
    const totalPositions = allAdminJobs.reduce((sum, job) => {
      return sum + (job.position || 0);
    }, 0);

    const hiringRate =
      totalPositions > 0
        ? Math.round((totalApplicants / totalPositions) * 100)
        : 0;

    return {
      totalJobs,
      activeJobs,
      totalApplicants,
      hiringRate: Math.min(hiringRate, 100), // Cap at 100%
    };
  };

  const stats = calculateStats();

  // Animated counter effect
  const [animatedStats, setAnimatedStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplicants: 0,
    hiringRate: 0,
  });

  useEffect(() => {
    // Animate stats when they change
    const duration = 1000;
    const steps = 60;
    const stepTime = duration / steps;

    const startValues = { ...animatedStats };
    const endValues = stats;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;

      setAnimatedStats({
        totalJobs: Math.floor(
          startValues.totalJobs +
            (endValues.totalJobs - startValues.totalJobs) * progress,
        ),
        activeJobs: Math.floor(
          startValues.activeJobs +
            (endValues.activeJobs - startValues.activeJobs) * progress,
        ),
        totalApplicants: Math.floor(
          startValues.totalApplicants +
            (endValues.totalApplicants - startValues.totalApplicants) *
              progress,
        ),
        hiringRate: Math.floor(
          startValues.hiringRate +
            (endValues.hiringRate - startValues.hiringRate) * progress,
        ),
      });

      if (step >= steps) {
        clearInterval(interval);
        setAnimatedStats(endValues);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [allAdminJobs]);

  const statsCards = [
    {
      label: "Total Jobs",
      value: animatedStats.totalJobs,
      icon: Briefcase,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      label: "Active Jobs",
      value: animatedStats.activeJobs,
      icon: CheckCircle,
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      label: "Total Applicants",
      value: animatedStats.totalApplicants,
      icon: Users,
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      label: "Hiring Rate",
      value: `${animatedStats.hiringRate}%`,
      icon: TrendingUp,
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
  ];

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="group rounded-xl p-5 transition-all duration-300 hover:shadow-xl cursor-pointer relative overflow-hidden"
                style={{
                  background: colors.white,
                  border: `1px solid ${colors.lightBlue}20`,
                }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ background: card.gradient }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="p-2 rounded-xl"
                      style={{ background: `${colors.lightBlue}10` }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: colors.brightBlue }}
                      />
                    </div>
                    <span
                      className="text-2xl font-bold opacity-10"
                      style={{ color: colors.darkNavy }}
                    >
                      {String(card.value).charAt(0)}
                    </span>
                  </div>
                  <p
                    className="text-xs mb-1"
                    style={{ color: colors.lightBlue }}
                  >
                    {card.label}
                  </p>
                  <p
                    className="text-2xl font-bold transition-all duration-300"
                    style={{ color: colors.darkNavy }}
                  >
                    {card.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Jobs Table */}
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
