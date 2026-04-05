import React from "react";
import { useSelector } from "react-redux";

const statusStyles = {
  accepted: {
    bg: "#f0fdf4",
    color: "#15803d",
    border: "#bbf7d0",
    dot: "#15803d",
  },
  rejected: {
    bg: "#fff1f2",
    color: "#be123c",
    border: "#fecdd3",
    dot: "#be123c",
  },
  pending: {
    bg: "#fefce8",
    color: "#a16207",
    border: "#fef08a",
    dot: "#a16207",
  },
};

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  if (!allAppliedJobs || allAppliedJobs.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-14 gap-2"
        style={{ color: "oklch(0.554 0.046 257.417)" }}
      >
        <svg
          className="w-8 h-8 mb-1 opacity-30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4" />
        </svg>
        <p className="text-sm font-medium">No applications yet</p>
        <p className="text-xs opacity-60">
          Jobs you apply to will appear here.
        </p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto", fontFamily: "'Sora', sans-serif" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr
            style={{ borderBottom: "0.5px solid oklch(0.929 0.013 255.508)" }}
          >
            {["Date", "Job Role", "Company", "Status"].map((h, i) => (
              <th
                key={h}
                style={{
                  padding: "10px 16px",
                  textAlign: i === 3 ? "right" : "left",
                  fontSize: "10.5px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "oklch(0.554 0.046 257.417)",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allAppliedJobs.map((item, index) => {
            const s = statusStyles[item.status] || statusStyles.pending;
            return (
              <tr
                key={index}
                style={{
                  borderBottom:
                    index < allAppliedJobs.length - 1
                      ? "0.5px solid oklch(0.929 0.013 255.508)"
                      : "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    "oklch(0.968 0.007 247.896)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <td
                  style={{
                    padding: "12px 16px",
                    fontSize: "11.5px",
                    color: "oklch(0.554 0.046 257.417)",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {item?.createdAt?.split("T")[0]}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    fontSize: "12.5px",
                    fontWeight: 600,
                  }}
                >
                  {item?.job?.title}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {item?.job?.company?.logo ? (
                      <img
                        src={item.job.company.logo}
                        alt={item.job.company.companyName}
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "6px",
                          objectFit: "cover",
                          border: "0.5px solid oklch(0.929 0.013 255.508)",
                          flexShrink: 0,
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "6px",
                          background: "oklch(0.968 0.007 247.896)",
                          border: "0.5px solid oklch(0.929 0.013 255.508)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "9px",
                          fontWeight: 700,
                          color: "oklch(0.554 0.046 257.417)",
                          flexShrink: 0,
                        }}
                      >
                        {item?.job?.company?.companyName
                          ?.slice(0, 2)
                          .toUpperCase()}
                      </div>
                    )}
                    <span style={{ fontSize: "12.5px" }}>
                      {item?.job?.company?.companyName}
                    </span>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", textAlign: "right" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "11px",
                      fontWeight: 500,
                      padding: "4px 10px",
                      borderRadius: "100px",
                      background: s.bg,
                      color: s.color,
                      border: `0.5px solid ${s.border}`,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: s.dot,
                        flexShrink: 0,
                      }}
                    />
                    {item?.status?.toUpperCase()}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        style={{
          padding: "0.75rem 1.5rem",
          borderTop: "0.5px solid oklch(0.929 0.013 255.508)",
          fontSize: "11px",
          color: "oklch(0.554 0.046 257.417)",
          textAlign: "center",
        }}
      >
        Showing {allAppliedJobs.length} of {allAppliedJobs.length} application
        {allAppliedJobs.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
};

export default AppliedJobTable;
