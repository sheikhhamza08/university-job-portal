import React, { useState } from "react";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const POPULAR_TAGS = [
  "React.js",
  "Data Analyst",
  "UX Designer",
  "Finance",
  "Marketing",
];

function HeroSection() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") searchJobHandler();
  };

  return (
    <section
      className="relative text-center overflow-hidden"
      style={{
        fontFamily: "'Sora', sans-serif",
        padding: "3.5rem 1.5rem 3rem",
      }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.929 0.013 255.508) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.929 0.013 255.508) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          opacity: 0.35,
        }}
      />
      {/* Radial fade over grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, oklch(1 0 0) 30%, transparent 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-5 max-w-2xl mx-auto">
        {/* Eyebrow pill */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium"
          style={{
            border: "0.5px solid oklch(0.929 0.013 255.508)",
            background: "oklch(0.968 0.007 247.896)",
            color: "oklch(0.554 0.046 257.417)",
            letterSpacing: "0.05em",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
          No. 1 Job Hunt Portal
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: "oklch(0.208 0.042 265.755)",
              color: "oklch(0.984 0.003 247.858)",
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
            }}
          >
            #1
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-bold leading-tight"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            letterSpacing: "-0.035em",
            color: "oklch(0.129 0.042 264.695)",
          }}
        >
          Search, Apply &amp; <br />
          Get Your{" "}
          <span
            onClick={() => navigate("/browse")}
            className="cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.208 0.042 265.755) 0%, oklch(0.45 0.1 265.755) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Dream Jobs
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-sm px-3 max-w-md"
          style={{ color: "oklch(0.554 0.046 257.417)", lineHeight: "1.65" }}
        >
          Exclusive opportunities curated for Dublin Business School students
          and alumni across Ireland and beyond.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex items-center w-full max-w-lg rounded-full overflow-hidden"
          style={{
            border: "0.5px solid oklch(0.929 0.013 255.508)",
            background: "oklch(1 0 0)",
            boxShadow: "0 2px 16px oklch(0.208 0.042 265.755 / 0.08)",
          }}
        >
          <div
            className="pl-4 pr-2 flex items-center flex-shrink-0"
            style={{ color: "oklch(0.554 0.046 257.417)" }}
          >
            <Search size={15} />
          </div>
          <input
            type="text"
            placeholder="Find your dream job…"
            className="flex-1 outline-none border-none bg-transparent text-sm py-3"
            style={{
              fontFamily: "'Sora', sans-serif",
              color: "oklch(0.129 0.042 264.695)",
            }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={searchJobHandler}
            className="flex items-center gap-1.5 text-xs font-semibold rounded-full m-1.5 px-4 py-2 transition-opacity hover:opacity-85 active:scale-95 cursor-pointer"
            style={{
              background: "oklch(0.208 0.042 265.755)",
              color: "oklch(0.984 0.003 247.858)",
              border: "none",
              fontFamily: "'Sora', sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            <Search size={12} />
            Search
          </button>
        </motion.div>

        {/* Popular tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          <span
            className="text-xs"
            style={{ color: "oklch(0.554 0.046 257.417)" }}
          >
            Popular:
          </span>
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="text-xs font-medium px-3 py-1 rounded-full transition-colors cursor-pointer"
              style={{
                border: "0.5px solid oklch(0.929 0.013 255.508)",
                background: "oklch(1 0 0)",
                color: "oklch(0.129 0.042 264.695)",
                fontFamily: "'DM Mono', monospace",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "oklch(0.968 0.007 247.896)";
                e.currentTarget.style.borderColor =
                  "oklch(0.554 0.046 257.417)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "oklch(1 0 0)";
                e.currentTarget.style.borderColor =
                  "oklch(0.929 0.013 255.508)";
              }}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex w-full max-w-lg overflow-hidden rounded-xl"
          style={{ border: "0.5px solid oklch(0.929 0.013 255.508)" }}
        >
          {[
            { num: "248", label: "Live Jobs" },
            { num: "134", label: "Companies" },
            { num: "92%", label: "Placement" },
            { num: "48h", label: "Avg. Response" },
          ].map((s, i, arr) => (
            <div
              key={s.label}
              className="flex-1 flex flex-col items-center py-3 gap-0.5"
              style={{
                borderRight:
                  i < arr.length - 1
                    ? "0.5px solid oklch(0.929 0.013 255.508)"
                    : "none",
              }}
            >
              <span
                className="font-bold"
                style={{
                  fontSize: "18px",
                  letterSpacing: "-0.03em",
                  color: "oklch(0.129 0.042 264.695)",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {s.num}
              </span>
              <span
                className="text-xs"
                style={{
                  color: "oklch(0.554 0.046 257.417)",
                  letterSpacing: "0.04em",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
