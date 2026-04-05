import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Edit2,
  Eye,
  MoreHorizontal,
  Briefcase,
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  const colors = {
    darkNavy: "#1B2C62",
    brightBlue: "#0393DA",
    lightBlue: "#8CB2CF",
    white: "#FDFEFE",
    primaryGradient: "linear-gradient(135deg, #1B2C62 0%, #0393DA 100%)",
    secondaryGradient: "linear-gradient(135deg, #0393DA 0%, #8CB2CF 100%)",
  };

  useEffect(() => {
    const filteredJobs =
      allAdminJobs?.length >= 0 &&
      allAdminJobs?.filter((job) => {
        if (!searchJobByText) return true;
        return (
          job?.company?.companyName
            ?.toLowerCase()
            .includes(searchJobByText.toLowerCase()) ||
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  const getStatusBadge = (job) => {
    // Determine job status based on applications and position
    const applicationsCount = job?.applications?.length || 0;
    const positionCount = job?.position || 0;

    if (applicationsCount >= positionCount && positionCount > 0) {
      return {
        color: "#ef4444",
        bg: "#fee2e2",
        label: "Filled",
        icon: XCircle,
      };
    } else if (applicationsCount > 0) {
      return {
        color: "#f59e0b",
        bg: "#fed7aa",
        label: "In Progress",
        icon: Users,
      };
    } else {
      return {
        color: "#10b981",
        bg: "#d1fae5",
        label: "Open",
        icon: CheckCircle,
      };
    }
  };

  const getApplicantCount = (job) => {
    return job?.applications?.length || 0;
  };

  return (
    <div
      className="rounded-xl overflow-hidden border"
      style={{ borderColor: `${colors.lightBlue}20` }}
    >
      <Table>
        <TableCaption className="py-4" style={{ color: colors.lightBlue }}>
          {filterJobs?.length === 0
            ? "No jobs posted yet"
            : `Showing ${filterJobs?.length} job(s)`}
        </TableCaption>
        <TableHeader>
          <TableRow
            style={{
              background: `${colors.lightBlue}05`,
              borderBottom: `1px solid ${colors.lightBlue}20`,
            }}
          >
            <TableHead
              className="font-semibold"
              style={{ color: colors.darkNavy }}
            >
              Company
            </TableHead>
            <TableHead
              className="font-semibold"
              style={{ color: colors.darkNavy }}
            >
              Job Role
            </TableHead>
            <TableHead
              className="font-semibold"
              style={{ color: colors.darkNavy }}
            >
              Location
            </TableHead>
            <TableHead
              className="font-semibold"
              style={{ color: colors.darkNavy }}
            >
              Posted Date
            </TableHead>
            <TableHead
              className="font-semibold"
              style={{ color: colors.darkNavy }}
            >
              Applicants
            </TableHead>
            <TableHead
              className="font-semibold"
              style={{ color: colors.darkNavy }}
            >
              Positions
            </TableHead>
            <TableHead
              className="font-semibold"
              style={{ color: colors.darkNavy }}
            >
              Status
            </TableHead>
            <TableHead
              className="font-semibold text-right"
              style={{ color: colors.darkNavy }}
            >
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs &&
            filterJobs?.map((job) => {
              const status = getStatusBadge(job);
              const StatusIcon = status.icon;
              const applicantsCount = getApplicantCount(job);
              const positionsLeft = job?.position - applicantsCount;

              return (
                <TableRow
                  key={job._id}
                  className="group transition-all duration-200 hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <span
                        style={{ color: colors.darkNavy }}
                        className="font-medium"
                      >
                        {job?.company?.companyName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Briefcase
                        className="h-3.5 w-3.5"
                        style={{ color: colors.lightBlue }}
                      />
                      <span style={{ color: colors.darkNavy }}>
                        {job?.title}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin
                        className="h-3.5 w-3.5"
                        style={{ color: colors.lightBlue }}
                      />
                      <span style={{ color: colors.lightBlue }}>
                        {job?.location}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar
                        className="h-3.5 w-3.5"
                        style={{ color: colors.lightBlue }}
                      />
                      <span style={{ color: colors.lightBlue }}>
                        {new Date(job?.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users
                        className="h-3.5 w-3.5"
                        style={{ color: colors.lightBlue }}
                      />
                      <span style={{ color: colors.darkNavy, fontWeight: 500 }}>
                        {applicantsCount}
                      </span>
                      {positionsLeft > 0 && (
                        <span
                          className="text-xs"
                          style={{ color: colors.lightBlue }}
                        >
                          (/{job?.position})
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span style={{ color: colors.darkNavy, fontWeight: 500 }}>
                      {job?.position}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                      style={{ background: status.bg, color: status.color }}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger
                        className="cursor-pointer p-2 rounded-lg transition-all duration-200 hover:bg-gray-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal
                          className="h-4 w-4"
                          style={{ color: colors.lightBlue }}
                        />
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-40 p-1 shadow-lg rounded-xl"
                        style={{ borderColor: `${colors.lightBlue}20` }}
                      >
                        <div className="flex flex-col gap-1">
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/admin/jobs/${job._id}/applicants`);
                            }}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50"
                          >
                            <Eye
                              className="h-4 w-4"
                              style={{ color: colors.brightBlue }}
                            />
                            <span
                              className="text-sm"
                              style={{ color: colors.darkNavy }}
                            >
                              View Applicants
                            </span>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })}
          {(!filterJobs || filterJobs.length === 0) && (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <Briefcase
                    className="h-12 w-12 opacity-20"
                    style={{ color: colors.lightBlue }}
                  />
                  <p className="text-sm" style={{ color: colors.lightBlue }}>
                    No jobs found
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/admin/jobs/create")}
                    style={{
                      borderColor: colors.brightBlue,
                      color: colors.brightBlue,
                    }}
                  >
                    Post your first job
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
