import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash2, MoreHorizontal } from "lucide-react";

const getInitials = (name) =>
  name
    ?.split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "CO";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company,
  );
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);
  const [openPopover, setOpenPopover] = useState(null);

  useEffect(() => {
    const filtered = companies?.filter(
      (c) =>
        !searchCompanyByText ||
        c?.companyName
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase()),
    );
    setFilterCompany(filtered);
  }, [companies, searchCompanyByText]);

  // close popover on outside click
  useEffect(() => {
    const close = () => setOpenPopover(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const thStyle = {
    padding: "10px 16px",
    fontSize: "10.5px",
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "oklch(0.554 0.046 257.417)",
    textAlign: "left",
    whiteSpace: "nowrap",
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: "0.5px solid oklch(0.929 0.013 255.508)",
        fontFamily: "'Sora', sans-serif",
      }}
    >
      {/* Card header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "0.5px solid oklch(0.929 0.013 255.508)" }}
      >
        <span
          className="text-sm font-bold"
          style={{ letterSpacing: "-0.015em" }}
        >
          Registered Companies
        </span>
        <span
          className="text-xs px-2.5 py-1 rounded-full"
          style={{
            background: "oklch(0.968 0.007 247.896)",
            color: "oklch(0.554 0.046 257.417)",
            border: "0.5px solid oklch(0.929 0.013 255.508)",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {filterCompany?.length ?? 0} compan
          {filterCompany?.length === 1 ? "y" : "ies"}
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{ borderBottom: "0.5px solid oklch(0.929 0.013 255.508)" }}
            >
              <th style={thStyle}>Logo</th>
              <th style={thStyle}>Company</th>
              <th style={thStyle}>Location</th>
              <th style={thStyle}>Registered</th>
              <th style={{ ...thStyle, textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {!filterCompany?.length ? (
              <tr>
                <td colSpan={5}>
                  <div
                    className="flex flex-col items-center justify-center py-14 gap-2"
                    style={{ color: "oklch(0.554 0.046 257.417)" }}
                  >
                    <svg
                      className="w-8 h-8 mb-1 opacity-25"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      viewBox="0 0 24 24"
                    >
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                    </svg>
                    <p className="text-sm font-medium">No companies found</p>
                    <p className="text-xs opacity-60">
                      Try a different search term
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filterCompany.map((company, index) => (
                <tr
                  key={company._id}
                  style={{
                    borderBottom:
                      index < filterCompany.length - 1
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
                  {/* Logo */}
                  <td style={{ padding: "12px 16px", verticalAlign: "middle" }}>
                    <div
                      className="flex items-center justify-center rounded-xl overflow-hidden text-xs font-bold flex-shrink-0"
                      style={{
                        width: "36px",
                        height: "36px",
                        border: "0.5px solid oklch(0.929 0.013 255.508)",
                        background: "oklch(0.968 0.007 247.896)",
                        color: "oklch(0.554 0.046 257.417)",
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      {company?.logo ? (
                        <img
                          src={company.logo}
                          alt={company.companyName}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.parentElement.textContent = getInitials(
                              company.companyName,
                            );
                          }}
                        />
                      ) : (
                        getInitials(company.companyName)
                      )}
                    </div>
                  </td>

                  {/* Name */}
                  <td style={{ padding: "12px 16px", verticalAlign: "middle" }}>
                    <span className="text-xs font-semibold">
                      {company?.companyName}
                    </span>
                  </td>

                  {/* Location */}
                  <td
                    style={{
                      padding: "12px 16px",
                      verticalAlign: "middle",
                      fontSize: "12px",
                      color: "oklch(0.554 0.046 257.417)",
                    }}
                  >
                    📍 {company?.location || "Dublin, Ireland"}
                  </td>

                  {/* Date */}
                  <td
                    style={{
                      padding: "12px 16px",
                      verticalAlign: "middle",
                      fontSize: "11.5px",
                      color: "oklch(0.554 0.046 257.417)",
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {company?.createdAt?.split("T")[0]}
                  </td>

                  {/* Action */}
                  <td
                    style={{
                      padding: "12px 16px",
                      verticalAlign: "middle",
                      textAlign: "right",
                    }}
                  >
                    <div className="flex justify-end relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenPopover(
                            openPopover === company._id ? null : company._id,
                          );
                        }}
                        className="flex items-center justify-center rounded-lg transition-colors"
                        style={{
                          width: "28px",
                          height: "28px",
                          border: "0.5px solid oklch(0.929 0.013 255.508)",
                          background:
                            openPopover === company._id
                              ? "oklch(0.968 0.007 247.896)"
                              : "oklch(1 0 0)",
                          color: "oklch(0.554 0.046 257.417)",
                          cursor: "pointer",
                        }}
                      >
                        <MoreHorizontal size={13} />
                      </button>

                      {openPopover === company._id && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-0 top-full mt-1.5 rounded-xl overflow-hidden z-20"
                          style={{
                            background: "oklch(1 0 0)",
                            border: "0.5px solid oklch(0.929 0.013 255.508)",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                            minWidth: "140px",
                            padding: "5px",
                          }}
                        >
                          <button
                            onClick={() => {
                              navigate(`/admin/companies/${company._id}`);
                              setOpenPopover(null);
                            }}
                            className="flex items-center gap-2 w-full text-left text-xs font-medium px-3 py-2 rounded-lg transition-colors"
                            style={{
                              color: "oklch(0.129 0.042 264.695)",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontFamily: "'Sora', sans-serif",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background =
                                "oklch(0.968 0.007 247.896)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = "none")
                            }
                          >
                            <Edit2
                              size={12}
                              style={{
                                color: "oklch(0.554 0.046 257.417)",
                                flexShrink: 0,
                              }}
                            />
                            Edit Company
                          </button>
                          <div
                            style={{
                              height: "0.5px",
                              background: "oklch(0.929 0.013 255.508)",
                              margin: "3px 0",
                            }}
                          />
                          <button
                            className="flex items-center gap-2 w-full text-left text-xs font-medium px-3 py-2 rounded-lg transition-colors"
                            style={{
                              color: "#be123c",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontFamily: "'Sora', sans-serif",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = "#fff1f2")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = "none")
                            }
                          >
                            <Trash2 size={12} style={{ flexShrink: 0 }} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between px-5 py-3 text-xs"
        style={{
          borderTop: "0.5px solid oklch(0.929 0.013 255.508)",
          color: "oklch(0.554 0.046 257.417)",
        }}
      >
        <span>
          Showing {filterCompany?.length ?? 0} of {companies?.length ?? 0}{" "}
          compan{companies?.length === 1 ? "y" : "ies"}
        </span>
        <span
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "10.5px" }}
        >
          DBS Admin
        </span>
      </div>
    </div>
  );
};

export default CompaniesTable;
