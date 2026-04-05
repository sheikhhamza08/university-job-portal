import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Plus, Search } from "lucide-react";
import { setSearchCompanyByText } from "@/redux/companySlice";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import CompaniesTable from "./CompaniesTable";
import Navbar from "../shared/Navbar";

const Companies = () => {
  useGetAllCompanies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div
      style={{
        fontFamily: "'Sora', sans-serif",
        background: "oklch(1 0 0)",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <div className="px-[5%] py-10 max-w-5xl mx-auto">
        {/* Page header */}
        <div className="mb-6">
          <div
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full mb-3"
            style={{
              background: "oklch(0.968 0.007 247.896)",
              border: "0.5px solid oklch(0.929 0.013 255.508)",
              color: "oklch(0.554 0.046 257.417)",
              letterSpacing: "0.05em",
            }}
          >
            <svg
              width="10"
              height="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 20 20"
            >
              <rect x="3" y="3" width="14" height="14" rx="2" />
              <path d="M7 10h6M10 7v6" />
            </svg>
            Admin Panel
          </div>
          <h1
            className="font-bold"
            style={{ fontSize: "1.3rem", letterSpacing: "-0.025em" }}
          >
            Companies
          </h1>
          <p
            className="text-xs mt-1"
            style={{ color: "oklch(0.554 0.046 257.417)" }}
          >
            Manage registered companies on the DBS Job Portal
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="relative flex-1" style={{ maxWidth: "280px" }}>
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "oklch(0.554 0.046 257.417)" }}
            />
            <input
              type="text"
              placeholder="Filter by name…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full text-xs py-2 pl-8 pr-3 rounded-lg outline-none transition-colors"
              style={{
                border: "0.5px solid oklch(0.929 0.013 255.508)",
                background: "oklch(1 0 0)",
                color: "oklch(0.129 0.042 264.695)",
                fontFamily: "'Sora', sans-serif",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "oklch(0.554 0.046 257.417)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "oklch(0.929 0.013 255.508)")
              }
            />
          </div>
          <button
            onClick={() => navigate("/admin/companies/create")}
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-opacity"
            style={{
              background: "oklch(0.208 0.042 265.755)",
              color: "oklch(0.984 0.003 247.858)",
              border: "none",
              fontFamily: "'Sora', sans-serif",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.87")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <Plus size={13} />
            New Company
          </button>
        </div>

        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
