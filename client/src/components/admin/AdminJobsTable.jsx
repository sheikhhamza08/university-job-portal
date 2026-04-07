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
  Eye,
  MoreHorizontal,
  Briefcase,
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeJob } from "@/redux/jobSlice";
import axios from "axios";
import { toast } from "sonner";
import { JOB_API_END_POINT } from "../../utils/constant";

// ── Custom confirm modal (no AlertDialog needed) ──────────────────────────────
const DeleteConfirmModal = ({ job, isDeleting, onConfirm, onCancel }) => {
  if (!job) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onCancel}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Dialog */}
      <div
        className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
          <Trash2 className="h-6 w-6 text-red-500" />
        </div>

        <h2 className="text-lg font-semibold text-center text-gray-800 mb-2">
          Delete Job
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-800">"{job.title}"</span>?{" "}
          This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors disabled:opacity-70"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const colors = {
    darkNavy: "#1B2C62",
    brightBlue: "#0393DA",
    lightBlue: "#8CB2CF",
    white: "#FDFEFE",
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

  const handleDeleteClick = (e, job) => {
    e.stopPropagation();
    setIsPopoverOpen(false);
    setDeleteModalOpen(true);
    setJobToDelete(job);
  };

  const handleDeleteConfirm = async () => {
    if (!jobToDelete) return;
    setIsDeleting(true);
    try {
      const res = await axios.delete(
        `${JOB_API_END_POINT}/delete/${jobToDelete._id}`,
        { withCredentials: true },
      );
      if (res.data.success) {
        dispatch(removeJob(jobToDelete._id));
        toast.success("Job deleted successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete job");
    } finally {
      setIsDeleting(false);
      setJobToDelete(null);
    }
  };

  const getStatusBadge = (job) => {
    const applicationsCount = job?.applications?.length || 0;
    const positionCount = job?.position || 0;
    if (applicationsCount >= positionCount && positionCount > 0)
      return {
        color: "#ef4444",
        bg: "#fee2e2",
        label: "Filled",
        icon: XCircle,
      };
    else if (applicationsCount > 0)
      return {
        color: "#f59e0b",
        bg: "#fed7aa",
        label: "In Progress",
        icon: Users,
      };
    else
      return {
        color: "#10b981",
        bg: "#d1fae5",
        label: "Open",
        icon: CheckCircle,
      };
  };

  const getApplicantCount = (job) => job?.applications?.length || 0;

  return (
    <>
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
                    onClick={() =>
                      navigate(`/admin/jobs/${job._id}/applicants`)
                    }
                  >
                    <TableCell className="font-medium">
                      <span
                        style={{ color: colors.darkNavy }}
                        className="font-medium"
                      >
                        {job?.company?.companyName}
                      </span>
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
                          {new Date(job?.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users
                          className="h-3.5 w-3.5"
                          style={{ color: colors.lightBlue }}
                        />
                        <span
                          style={{ color: colors.darkNavy, fontWeight: 500 }}
                        >
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
                          className="w-44 p-1 shadow-lg rounded-xl"
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

                            <div
                              onClick={(e) => handleDeleteClick(e, job)}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                              <span className="text-sm text-red-500">
                                Delete Job
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

      {/* Custom Delete Modal — rendered outside the table to avoid z-index issues */}
      <DeleteConfirmModal
        job={jobToDelete}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => !isDeleting && setJobToDelete(null)}
      />
    </>
  );
};

export default AdminJobsTable;
