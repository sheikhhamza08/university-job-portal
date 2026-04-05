import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setSingleCompany } from "@/redux/companySlice";
import axios from "axios";
import {
  Building2,
  ArrowRight,
  Briefcase,
  Users,
  TrendingUp,
  CheckCircle,
  Loader2,
} from "lucide-react";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const colors = {
    darkNavy: "#1B2C62",
    brightBlue: "#0393DA",
    lightBlue: "#8CB2CF",
    white: "#FDFEFE",
    primaryGradient: "linear-gradient(135deg, #1B2C62 0%, #0393DA 100%)",
    secondaryGradient: "linear-gradient(135deg, #0393DA 0%, #8CB2CF 100%)",
  };

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Please enter a company name");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName: companyName.trim() },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (response.data.success) {
        dispatch(setSingleCompany(response.data.company));
        const companyId = response?.data?.company?._id;
        toast.success(response.data.message);
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create company");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading && companyName.trim()) {
      registerNewCompany();
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.lightBlue}10 100%)`,
      }}
    >
      <Navbar />

      <div className="px-4 sm:px-[5%] py-8 sm:py-16 max-w-5xl mx-auto">
        <div className="max-w-2xl mx-auto">
          {/* Header Section with Gradient Icon */}
          <div className="text-center mb-10">
            <div
              className="inline-flex items-center justify-center p-3 rounded-2xl mb-6 shadow-lg"
              style={{ background: colors.primaryGradient }}
            >
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <h1
              className="font-bold text-3xl sm:text-4xl mb-3"
              style={{ color: colors.darkNavy }}
            >
              Create Your Company
            </h1>
            <p className="text-base" style={{ color: colors.lightBlue }}>
              Start your journey with us by registering your company
            </p>
          </div>

          {/* Main Form Card */}
          <div
            className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
            style={{
              boxShadow:
                "0 20px 25px -5px rgba(27, 44, 98, 0.1), 0 10px 10px -5px rgba(27, 44, 98, 0.04)",
            }}
          >
            <div className="p-6 sm:p-8">
              {/* Info Banner */}
              <div
                className="mb-8 p-4 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${colors.lightBlue}05 0%, ${colors.brightBlue}05 100%)`,
                  border: `1px solid ${colors.lightBlue}20`,
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="p-1.5 rounded-lg flex-shrink-0"
                    style={{ background: `${colors.brightBlue}15` }}
                  >
                    <Briefcase
                      className="h-4 w-4"
                      style={{ color: colors.brightBlue }}
                    />
                  </div>
                  <div>
                    <h4
                      className="text-sm font-semibold mb-1"
                      style={{ color: colors.darkNavy }}
                    >
                      Why register your company?
                    </h4>
                    <p className="text-xs" style={{ color: colors.lightBlue }}>
                      Create a company profile to start posting jobs, find top
                      talent, and grow your team. You can always edit your
                      company details later.
                    </p>
                  </div>
                </div>
              </div>

              {/* Company Name Input Section */}
              <div className="space-y-3 mb-8">
                <Label
                  className="text-sm font-semibold flex items-center gap-2"
                  style={{ color: colors.darkNavy }}
                >
                  <Building2
                    className="h-4 w-4"
                    style={{ color: colors.brightBlue }}
                  />
                  Company Name
                </Label>
                <div className="relative">
                  <Input
                    type="text"
                    className="py-6 px-4 text-base transition-all duration-200"
                    style={{
                      borderColor: isFocused
                        ? colors.brightBlue
                        : `${colors.lightBlue}50`,
                      boxShadow: isFocused
                        ? `0 0 0 3px ${colors.brightBlue}20`
                        : "none",
                      paddingLeft: "3rem",
                    }}
                    placeholder="e.g., Dublin Business School, Tech Corp, etc."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyPress={handleKeyPress}
                    autoFocus
                  />
                  <Building2
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-all duration-200"
                    style={{
                      color: isFocused ? colors.brightBlue : colors.lightBlue,
                    }}
                  />
                </div>
                <p
                  className="text-xs flex items-center gap-1"
                  style={{ color: colors.lightBlue }}
                >
                  <span>💡</span>
                  This can be changed later in company settings
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div
                  className="p-3 rounded-lg text-center transition-all duration-300 hover:scale-105"
                  style={{
                    background: `${colors.lightBlue}05`,
                    border: `1px solid ${colors.lightBlue}15`,
                  }}
                >
                  <Users
                    className="h-5 w-5 mx-auto mb-2"
                    style={{ color: colors.brightBlue }}
                  />
                  <p
                    className="text-xs font-medium"
                    style={{ color: colors.darkNavy }}
                  >
                    Find Talent
                  </p>
                  <p className="text-xs" style={{ color: colors.lightBlue }}>
                    Post jobs & hire
                  </p>
                </div>
                <div
                  className="p-3 rounded-lg text-center transition-all duration-300 hover:scale-105"
                  style={{
                    background: `${colors.lightBlue}05`,
                    border: `1px solid ${colors.lightBlue}15`,
                  }}
                >
                  <TrendingUp
                    className="h-5 w-5 mx-auto mb-2"
                    style={{ color: colors.brightBlue }}
                  />
                  <p
                    className="text-xs font-medium"
                    style={{ color: colors.darkNavy }}
                  >
                    Grow Business
                  </p>
                  <p className="text-xs" style={{ color: colors.lightBlue }}>
                    Build your brand
                  </p>
                </div>
                <div
                  className="p-3 rounded-lg text-center transition-all duration-300 hover:scale-105"
                  style={{
                    background: `${colors.lightBlue}05`,
                    border: `1px solid ${colors.lightBlue}15`,
                  }}
                >
                  <CheckCircle
                    className="h-5 w-5 mx-auto mb-2"
                    style={{ color: colors.brightBlue }}
                  />
                  <p
                    className="text-xs font-medium"
                    style={{ color: colors.darkNavy }}
                  >
                    Easy Setup
                  </p>
                  <p className="text-xs" style={{ color: colors.lightBlue }}>
                    Get started fast
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-3 pt-4 border-t"
                style={{ borderColor: `${colors.lightBlue}20` }}
              >
                <Button
                  variant="outline"
                  onClick={() => navigate("/admin/companies")}
                  className="flex-1 order-2 sm:order-1 hover:bg-gray-50 transition-all duration-300"
                  style={{
                    borderColor: colors.lightBlue,
                    color: colors.darkNavy,
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={registerNewCompany}
                  disabled={loading || !companyName.trim()}
                  className="flex-1 order-1 sm:order-2 text-white shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: colors.primaryGradient,
                    backgroundSize: "200% 100%",
                    backgroundPosition: "0% 0%",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading && companyName.trim()) {
                      e.currentTarget.style.backgroundPosition = "100% 0%";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundPosition = "0% 0%";
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
