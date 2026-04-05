import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import JobApplicantsTable from "./JobApplicantsTable";
import axios from "axios";
import { APPLICANT_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import {
  Users,
  Briefcase,
  MapPin,
  Calendar,
  FileText,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import { Button } from "../ui/button";

const JobApplicants = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;
  const [loading, setLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState(null);
  const { allApplicants } = useSelector((store) => store.application);

  const colors = {
    darkNavy: "#1B2C62",
    brightBlue: "#0393DA",
    lightBlue: "#8CB2CF",
    white: "#FDFEFE",
    primaryGradient: "linear-gradient(135deg, #1B2C62 0%, #0393DA 100%)",
    secondaryGradient: "linear-gradient(135deg, #0393DA 0%, #8CB2CF 100%)",
  };

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${APPLICANT_API_END_POINT}/${jobId}/applicants`,
          {
            withCredentials: true,
          },
        );
        if (response.data.success) {
          dispatch(setAllApplicants(response.data.job));
          setJobDetails(response.data.job);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllApplicants();
  }, [jobId, dispatch]);

  const stats = {
    totalApplicants: allApplicants?.applications?.length || 0,
    acceptedCount:
      allApplicants?.applications?.filter((app) => app.status === "accepted")
        .length || 0,
    rejectedCount:
      allApplicants?.applications?.filter((app) => app.status === "rejected")
        .length || 0,
    pendingCount:
      allApplicants?.applications?.filter((app) => app.status === "pending")
        .length || 0,
    acceptanceRate:
      allApplicants?.applications?.length > 0
        ? Math.round(
            (allApplicants?.applications?.filter(
              (app) => app.status === "accepted",
            ).length /
              allApplicants?.applications?.length) *
              100,
          )
        : 0,
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.lightBlue}05 100%)`,
      }}
    >
      <Navbar />

      <div className="px-4 sm:px-[5%] py-8 sm:py-10 max-w-7xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="mb-6 gap-2 hover:bg-gray-100"
          style={{ color: colors.darkNavy }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Jobs
        </Button>

        {/* Job Header Section */}
        {jobDetails && (
          <div
            className="mb-8 p-6 rounded-2xl bg-white shadow-lg"
            style={{ border: `1px solid ${colors.lightBlue}20` }}
          >
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
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
                    {jobDetails?.title}
                  </h1>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <MapPin
                      className="h-4 w-4"
                      style={{ color: colors.lightBlue }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: colors.lightBlue }}
                    >
                      {jobDetails?.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar
                      className="h-4 w-4"
                      style={{ color: colors.lightBlue }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: colors.lightBlue }}
                    >
                      Posted:{" "}
                      {new Date(jobDetails?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users
                      className="h-4 w-4"
                      style={{ color: colors.lightBlue }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: colors.lightBlue }}
                    >
                      {jobDetails?.position} positions
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-xl"
                style={{ background: `${colors.lightBlue}10` }}
              >
                <FileText
                  className="h-4 w-4"
                  style={{ color: colors.brightBlue }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{ color: colors.darkNavy }}
                >
                  Salary: {jobDetails?.salary} LPA
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div
            className="rounded-xl p-4 transition-all duration-300 hover:scale-105"
            style={{
              background: colors.white,
              border: `1px solid ${colors.lightBlue}20`,
            }}
          >
            <p className="text-xs mb-1" style={{ color: colors.lightBlue }}>
              Total Applicants
            </p>
            <p
              className="text-2xl font-bold"
              style={{ color: colors.darkNavy }}
            >
              {stats.totalApplicants}
            </p>
          </div>
          <div
            className="rounded-xl p-4 transition-all duration-300 hover:scale-105"
            style={{ background: colors.white, border: `1px solid #d1fae5` }}
          >
            <p className="text-xs mb-1" style={{ color: "#10b981" }}>
              Accepted
            </p>
            <p className="text-2xl font-bold" style={{ color: "#10b981" }}>
              {stats.acceptedCount}
            </p>
          </div>
          <div
            className="rounded-xl p-4 transition-all duration-300 hover:scale-105"
            style={{ background: colors.white, border: `1px solid #fee2e2` }}
          >
            <p className="text-xs mb-1" style={{ color: "#ef4444" }}>
              Rejected
            </p>
            <p className="text-2xl font-bold" style={{ color: "#ef4444" }}>
              {stats.rejectedCount}
            </p>
          </div>
          <div
            className="rounded-xl p-4 transition-all duration-300 hover:scale-105"
            style={{
              background: colors.white,
              border: `1px solid ${colors.lightBlue}20`,
            }}
          >
            <p className="text-xs mb-1" style={{ color: colors.lightBlue }}>
              Pending
            </p>
            <p
              className="text-2xl font-bold"
              style={{ color: colors.brightBlue }}
            >
              {stats.pendingCount}
            </p>
          </div>
          <div
            className="rounded-xl p-4 transition-all duration-300 hover:scale-105"
            style={{
              background: colors.white,
              border: `1px solid ${colors.lightBlue}20`,
            }}
          >
            <p
              className="text-xs mb-1 flex items-center gap-1"
              style={{ color: colors.lightBlue }}
            >
              <TrendingUp className="h-3 w-3" />
              Acceptance Rate
            </p>
            <p
              className="text-2xl font-bold"
              style={{ color: colors.darkNavy }}
            >
              {stats.acceptanceRate}%
            </p>
          </div>
        </div>

        {/* Applicants Table */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <JobApplicantsTable />
        )}
      </div>
    </div>
  );
};

export default JobApplicants;
