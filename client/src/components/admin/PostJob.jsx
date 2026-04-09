import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import {
  Loader2,
  Briefcase,
  MapPin,
  DollarSign,
  Users,
  Clock,
  FileText,
  ListChecks,
  Building2,
  ArrowLeft,
} from "lucide-react";

const PostJob = () => {
  const { companies } = useSelector((store) => store.company);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    experience: "",
    jobType: "",
    position: 0,
    companyId: "",
  });

  const colors = {
    darkNavy: "#1B2C62",
    brightBlue: "#0393DA",
    lightBlue: "#8CB2CF",
    white: "#FDFEFE",
    primaryGradient: "linear-gradient(135deg, #1B2C62 0%, #0393DA 100%)",
    secondaryGradient: "linear-gradient(135deg, #0393DA 0%, #8CB2CF 100%)",
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.companyName.toLowerCase() === value.toLowerCase(),
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const postNewJob = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "requirements",
      "salary",
      "location",
      "experience",
      "jobType",
      "position",
      "companyId",
    ];
    const missingFields = requiredFields.filter((field) => !input[field]);

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`,
      );
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    {
      name: "title",
      label: "Job Title",
      icon: Briefcase,
      placeholder: "e.g., Senior Frontend Developer",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      icon: FileText,
      placeholder: "Describe the role and responsibilities",
      type: "text",
      required: true,
    },
    {
      name: "requirements",
      label: "Requirements",
      icon: ListChecks,
      placeholder: "React, Node.js, MongoDB (comma separated)",
      type: "text",
      required: true,
    },
    {
      name: "salary",
      label: "Salary (€ Euro)",
      icon: DollarSign,
      placeholder: "e.g., 12",
      type: "number",
      required: true,
    },
    {
      name: "location",
      label: "Location",
      icon: MapPin,
      placeholder: "e.g., Dublin, Ireland",
      type: "text",
      required: true,
    },
    {
      name: "jobType",
      label: "Job Type",
      icon: Clock,
      placeholder: "Full Time / Part Time / Remote",
      type: "text",
      required: true,
    },
    {
      name: "experience",
      label: "Experience (Years)",
      icon: Users,
      placeholder: "e.g., 3",
      type: "number",
      required: true,
    },
    {
      name: "position",
      label: "No. of Positions",
      icon: Users,
      placeholder: "e.g., 4",
      type: "number",
      required: true,
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

      <div className="px-4 sm:px-[5%] py-8 sm:py-10 max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/jobs")}
            className="mb-4 gap-2 hover:bg-gray-100"
            style={{ color: colors.darkNavy }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Button>

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
              Post New Job
            </h1>
          </div>
          <p className="text-sm" style={{ color: colors.lightBlue }}>
            Create a new job listing to find the perfect candidate
          </p>
        </div>

        {/* Form Card */}
        <div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          style={{
            boxShadow:
              "0 20px 25px -5px rgba(27, 44, 98, 0.1), 0 10px 10px -5px rgba(27, 44, 98, 0.04)",
          }}
        >
          <form onSubmit={postNewJob} className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inputFields.map((field) => {
                const Icon = field.icon;
                const isFocused = focusedField === field.name;

                return (
                  <div key={field.name} className="space-y-2">
                    <Label
                      className="text-sm font-semibold flex items-center gap-2"
                      style={{ color: colors.darkNavy }}
                    >
                      <Icon
                        className="h-4 w-4"
                        style={{ color: colors.brightBlue }}
                      />
                      {field.label}
                      {field.required && (
                        <span className="text-red-500 text-xs">*</span>
                      )}
                    </Label>
                    <div className="relative">
                      <Input
                        type={field.type}
                        name={field.name}
                        value={input[field.name]}
                        placeholder={field.placeholder}
                        onChange={changeEventHandler}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        className="py-5 pl-10 transition-all duration-200"
                        style={{
                          borderColor: isFocused
                            ? colors.brightBlue
                            : `${colors.lightBlue}30`,
                          boxShadow: isFocused
                            ? `0 0 0 3px ${colors.brightBlue}10`
                            : "none",
                        }}
                        required={field.required}
                      />
                      <Icon
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-all duration-200"
                        style={{
                          color: isFocused
                            ? colors.brightBlue
                            : colors.lightBlue,
                        }}
                      />
                    </div>
                  </div>
                );
              })}

              {/* Company Select */}
              {companies.length > 0 && (
                <div className="space-y-2">
                  <Label
                    className="text-sm font-semibold flex items-center gap-2"
                    style={{ color: colors.darkNavy }}
                  >
                    <Building2
                      className="h-4 w-4"
                      style={{ color: colors.brightBlue }}
                    />
                    Select Company
                    <span className="text-red-500 text-xs">*</span>
                  </Label>
                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger
                      className="py-5"
                      style={{ borderColor: `${colors.lightBlue}30` }}
                    >
                      <SelectValue placeholder="Choose a company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {companies.map((company) => (
                          <SelectItem
                            key={company._id}
                            value={company.companyName}
                            className="cursor-pointer hover:bg-gray-50"
                          >
                            <div className="flex items-center gap-2">
                              {company.logo ? (
                                <img
                                  src={company.logo}
                                  alt={company.companyName}
                                  className="w-5 h-5 rounded"
                                />
                              ) : (
                                <Building2
                                  className="h-4 w-4"
                                  style={{ color: colors.lightBlue }}
                                />
                              )}
                              {company.companyName}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/jobs")}
                className="flex-1 order-2 sm:order-1"
                style={{
                  borderColor: colors.lightBlue,
                  color: colors.darkNavy,
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 order-1 sm:order-2 text-white shadow-md hover:shadow-lg transition-all duration-300"
                style={{
                  background: colors.primaryGradient,
                  backgroundSize: "200% 100%",
                  backgroundPosition: "0% 0%",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
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
                    Posting Job...
                  </>
                ) : (
                  <>
                    <Briefcase className="mr-2 h-4 w-4" />
                    Post New Job
                  </>
                )}
              </Button>
            </div>

            {/* Warning Message */}
            {companies.length === 0 && (
              <div
                className="mt-6 p-4 rounded-xl"
                style={{
                  background: `${colors.lightBlue}05`,
                  border: `1px solid ${colors.lightBlue}20`,
                }}
              >
                <p
                  className="text-sm text-center"
                  style={{ color: colors.lightBlue }}
                >
                  No companies registered yet.{" "}
                  <span
                    className="font-semibold cursor-pointer hover:underline transition-all"
                    style={{ color: colors.brightBlue }}
                    onClick={() => navigate("/admin/companies/create")}
                  >
                    Click here to register a company first
                  </span>
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Tips Section */}
        <div
          className="mt-6 p-4 rounded-xl"
          style={{
            background: `${colors.lightBlue}05`,
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
                Tips for posting a great job
              </h4>
              <ul
                className="text-xs space-y-1"
                style={{ color: colors.lightBlue }}
              >
                <li>• Use a clear and specific job title</li>
                <li>• List required skills and experience level</li>
                <li>• Include salary range to attract more candidates</li>
                <li>• Specify if remote work is available</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
