import React, { useState } from "react";
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
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Eye,
  UserCheck,
  UserX,
  Mail,
  Phone,
  FileText,
  Users,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICANT_API_END_POINT } from "@/utils/constant";
import { Badge } from "../ui/badge";

const shortListingStatus = [
  {
    value: "accepted",
    label: "Accept",
    icon: CheckCircle,
    color: "#10b981",
    bg: "#d1fae5",
  },
  {
    value: "rejected",
    label: "Reject",
    icon: XCircle,
    color: "#ef4444",
    bg: "#fee2e2",
  },
];

const JobApplicantsTable = () => {
  const { allApplicants } = useSelector((store) => store.application);
  const dispatch = useDispatch();
  const [updatingStatus, setUpdatingStatus] = useState(null);

  const colors = {
    darkNavy: "#1B2C62",
    brightBlue: "#0393DA",
    lightBlue: "#8CB2CF",
    white: "#FDFEFE",
    primaryGradient: "linear-gradient(135deg, #1B2C62 0%, #0393DA 100%)",
    secondaryGradient: "linear-gradient(135deg, #0393DA 0%, #8CB2CF 100%)",
  };

  const statusHandler = async (status, applicationId) => {
    try {
      setUpdatingStatus(applicationId);
      const response = await axios.post(
        `${APPLICANT_API_END_POINT}/status/${applicationId}/update`,
        { status },
        {
          withCredentials: true,
        },
      );

      if (response.data.success) {
        toast.success(`Application ${status} successfully!`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return {
          icon: CheckCircle,
          color: "#10b981",
          bg: "#d1fae5",
          label: "Accepted",
        };
      case "rejected":
        return {
          icon: XCircle,
          color: "#ef4444",
          bg: "#fee2e2",
          label: "Rejected",
        };
      default:
        return {
          icon: Clock,
          color: colors.brightBlue,
          bg: `${colors.brightBlue}15`,
          label: "Pending",
        };
    }
  };

  const applications = allApplicants?.applications || [];

  return (
    <div
      className="rounded-xl overflow-hidden border"
      style={{ borderColor: `${colors.lightBlue}20` }}
    >
      <Table>
        <TableCaption className="py-4" style={{ color: colors.lightBlue }}>
          {applications.length === 0
            ? "No applicants yet"
            : `Showing ${applications.length} applicant(s)`}
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
              Applicant
            </TableHead>
            <TableHead
              className="font-semibold"
              style={{ color: colors.darkNavy }}
            >
              Contact Info
            </TableHead>
            <TableHead
              className="font-semibold"
              style={{ color: colors.darkNavy }}
            >
              Skills
            </TableHead>
            <TableHead
              className="font-semibold"
              style={{ color: colors.darkNavy }}
            >
              Resume
            </TableHead>
            <TableHead
              className="font-semibold"
              style={{ color: colors.darkNavy }}
            >
              Applied Date
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
          {applications.map((item) => {
            const statusBadge = getStatusBadge(item.status);
            const StatusIcon = statusBadge.icon;

            return (
              <TableRow
                key={item._id}
                className="group transition-all duration-200 hover:bg-gray-50"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        background: `${colors.lightBlue}10`,
                        color: colors.darkNavy,
                      }}
                    >
                      {item?.applicant?.fullname?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p
                        className="font-semibold"
                        style={{ color: colors.darkNavy }}
                      >
                        {item?.applicant?.fullname}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: colors.lightBlue }}
                      >
                        {item?.applicant?.role}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail
                        className="h-3 w-3"
                        style={{ color: colors.lightBlue }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: colors.lightBlue }}
                      >
                        {item?.applicant?.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone
                        className="h-3 w-3"
                        style={{ color: colors.lightBlue }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: colors.lightBlue }}
                      >
                        {item?.applicant?.phoneNumber}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {item?.applicant?.profile?.skills
                      ?.slice(0, 3)
                      .map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            background: `${colors.lightBlue}10`,
                            color: colors.darkNavy,
                          }}
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    {item?.applicant?.profile?.skills?.length > 3 && (
                      <span
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          background: `${colors.lightBlue}10`,
                          color: colors.lightBlue,
                        }}
                      >
                        +{item.applicant.profile.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="flex items-center gap-2 hover:underline transition-all duration-200"
                      href={item.applicant.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: colors.brightBlue }}
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span className="text-sm">
                        {item.applicant.profile.resumeOriginalName ||
                          "View Resume"}
                      </span>
                      <Download className="h-3 w-3" />
                    </a>
                  ) : (
                    <span
                      className="text-sm"
                      style={{ color: colors.lightBlue }}
                    >
                      Not uploaded
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="text-sm" style={{ color: colors.lightBlue }}>
                    {new Date(item?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: statusBadge.bg,
                      color: statusBadge.color,
                    }}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {statusBadge.label}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  {item.status === "pending" ? (
                    <Popover>
                      <PopoverTrigger
                        className="cursor-pointer p-2 rounded-lg transition-all duration-200 hover:bg-gray-100"
                        disabled={updatingStatus === item._id}
                      >
                        {updatingStatus === item._id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                        ) : (
                          <MoreHorizontal
                            className="h-4 w-4"
                            style={{ color: colors.lightBlue }}
                          />
                        )}
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-40 p-1 shadow-lg rounded-xl"
                        style={{ borderColor: `${colors.lightBlue}20` }}
                      >
                        <div className="flex flex-col gap-1">
                          {shortListingStatus.map((status) => {
                            const Icon = status.icon;
                            return (
                              <div
                                onClick={() =>
                                  statusHandler(status.value, item._id)
                                }
                                key={status.value}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50"
                              >
                                <Icon
                                  className="h-4 w-4"
                                  style={{ color: status.color }}
                                />
                                <span
                                  className="text-sm"
                                  style={{ color: colors.darkNavy }}
                                >
                                  {status.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <div className="flex justify-end">
                      <span
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          background: `${colors.lightBlue}10`,
                          color: colors.lightBlue,
                        }}
                      >
                        {item.status === "accepted" ? "Hired" : "Processed"}
                      </span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
          {applications.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <Users
                    className="h-12 w-12 opacity-20"
                    style={{ color: colors.lightBlue }}
                  />
                  <p className="text-sm" style={{ color: colors.lightBlue }}>
                    No applicants have applied yet
                  </p>
                  <p className="text-xs" style={{ color: colors.lightBlue }}>
                    Share this job posting to attract candidates
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobApplicantsTable;
