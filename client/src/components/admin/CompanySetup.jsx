import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  ArrowLeft,
  Loader2,
  Building2,
  Globe,
  MapPin,
  FileText,
  Upload,
  CheckCircle,
  Briefcase,
  Users,
  Award,
} from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { Textarea } from "../ui/Textarea ";
import Navbar from "../shared/Navbar";

const CompanySetup = () => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const companyId = params.id;

  useGetCompanyById(companyId);

  const { singleCompany } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    companyName: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("companyName", input.companyName);
      formData.append("description", input.description);
      formData.append("website", input.website);
      formData.append("location", input.location);
      if (input.file) {
        formData.append("file", input.file);
      }

      const response = await axios.post(
        `${COMPANY_API_END_POINT}/update/${companyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (response.data.success) {
        navigate("/admin/companies");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update company");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        companyName: singleCompany?.companyName || "",
        description: singleCompany?.description || "",
        website: singleCompany?.website || "",
        location: singleCompany?.location || "",
        file: null,
      });
      if (singleCompany?.logo) {
        setImagePreview(singleCompany.logo);
      }
    }
  }, [singleCompany, companyId]);

  const colors = {
    darkNavy: "#1B2C62",
    brightBlue: "#0393DA",
    lightBlue: "#8CB2CF",
    white: "#FDFEFE",
    primaryGradient: "linear-gradient(135deg, #1B2C62 0%, #0393DA 100%)",
    secondaryGradient: "linear-gradient(135deg, #0393DA 0%, #8CB2CF 100%)",
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen"
        style={{
          background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.lightBlue}15 100%)`,
        }}
      >
        <div className="px-4 sm:px-[5%] py-8 sm:py-10 max-w-7xl mx-auto">
          <form
            onSubmit={submitHandler}
            className="flex flex-col items-center gap-6"
          >
            {/* Header Section */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
              <div className="flex gap-4 items-center w-full sm:w-auto">
                <Button
                  onClick={() => navigate("/admin/companies")}
                  type="button"
                  variant="ghost"
                  className="flex items-center gap-2 hover:bg-white/50 transition-all duration-300"
                  style={{ color: colors.darkNavy }}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </Button>
                <div className="h-8 w-px bg-gray-300 hidden sm:block" />
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-xl"
                    style={{ background: colors.primaryGradient }}
                  >
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <h1
                    className="font-bold text-xl sm:text-2xl"
                    style={{ color: colors.darkNavy }}
                  >
                    Company Setup
                  </h1>
                </div>
              </div>
              {singleCompany?.logo && !input.file && (
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{
                    background: `${colors.brightBlue}10`,
                    border: `1px solid ${colors.brightBlue}30`,
                  }}
                >
                  <CheckCircle
                    className="h-4 w-4"
                    style={{ color: colors.brightBlue }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: colors.darkNavy }}
                  >
                    Logo uploaded
                  </span>
                </div>
              )}
            </div>

            {/* Main Form Card */}
            <div
              className="w-full bg-white rounded-2xl shadow-xl overflow-hidden"
              style={{
                boxShadow:
                  "0 20px 25px -5px rgba(27, 44, 98, 0.1), 0 10px 10px -5px rgba(27, 44, 98, 0.04)",
              }}
            >
              <div className="p-6 sm:p-8">
                {/* Company Logo Preview & Upload */}
                <div
                  className="flex flex-col items-center mb-8 pb-6 border-b"
                  style={{ borderColor: `${colors.lightBlue}30` }}
                >
                  <div className="relative mb-4">
                    <div
                      className="w-56 h-28 rounded-md flex items-center justify-center overflow-hidden border-2 border-dashed transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.lightBlue}10 100%)`,
                        borderColor: `${colors.lightBlue}50`,
                      }}
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Company logo"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Building2
                          className="h-12 w-12"
                          style={{ color: colors.lightBlue }}
                        />
                      )}
                    </div>
                    {/* <label
                    htmlFor="logo-upload"
                    className="absolute -bottom-2 -right-2 p-1.5 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 shadow-lg"
                    style={{ background: colors.primaryGradient }}
                  >
                    <Upload className="h-3.5 w-3.5 text-white" />
                  </label>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={changeFileHandler}
                    className="hidden"
                  /> */}
                  </div>
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
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
                    <Input
                      type="text"
                      name="companyName"
                      value={input.companyName}
                      onChange={changeEventHandler}
                      placeholder="Enter company name"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                      style={{
                        borderColor: `${colors.lightBlue}50`,
                        focusBorderColor: colors.brightBlue,
                      }}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      className="text-sm font-semibold flex items-center gap-2"
                      style={{ color: colors.darkNavy }}
                    >
                      <MapPin
                        className="h-4 w-4"
                        style={{ color: colors.brightBlue }}
                      />
                      Location
                    </Label>
                    <Input
                      type="text"
                      name="location"
                      value={input.location}
                      onChange={changeEventHandler}
                      placeholder="Dublin, Ireland"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                      style={{ borderColor: `${colors.lightBlue}50` }}
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label
                      className="text-sm font-semibold flex items-center gap-2"
                      style={{ color: colors.darkNavy }}
                    >
                      <FileText
                        className="h-4 w-4"
                        style={{ color: colors.brightBlue }}
                      />
                      Description
                    </Label>
                    <Textarea
                      name="description"
                      value={input.description}
                      onChange={changeEventHandler}
                      placeholder="Tell us about your company..."
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 min-h-[120px] resize-y"
                      style={{ borderColor: `${colors.lightBlue}50` }}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      className="text-sm font-semibold flex items-center gap-2"
                      style={{ color: colors.darkNavy }}
                    >
                      <Globe
                        className="h-4 w-4"
                        style={{ color: colors.brightBlue }}
                      />
                      Website
                    </Label>
                    <Input
                      type="url"
                      name="website"
                      value={input.website}
                      onChange={changeEventHandler}
                      placeholder="https://www.example.com"
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                      style={{ borderColor: `${colors.lightBlue}50` }}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      className="text-sm font-semibold flex items-center gap-2"
                      style={{ color: colors.darkNavy }}
                    >
                      <Upload
                        className="h-4 w-4"
                        style={{ color: colors.brightBlue }}
                      />
                      Company Logo
                    </Label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={changeFileHandler}
                        className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        style={{ borderColor: `${colors.lightBlue}50` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                className="px-6 sm:px-8 py-5 bg-gray-50 border-t"
                style={{ borderColor: `${colors.lightBlue}20` }}
              >
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/admin/companies")}
                    className="order-2 sm:order-1 hover:bg-gray-100"
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
                    className="order-1 sm:order-2 text-white shadow-md hover:shadow-lg transition-all duration-300"
                    style={{
                      background: colors.primaryGradient,
                      hoverBackground: `linear-gradient(135deg, ${colors.darkNavy} 0%, ${colors.brightBlue} 100%)`,
                    }}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Update Company
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CompanySetup;
