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
} from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

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
      // Create image preview
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

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
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
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              <div className="h-8 w-px bg-gray-300 hidden sm:block" />
              <div className="flex items-center gap-3">
                <div
                  className="p-2 rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #1a472a 0%, #2d5a3b 100%)",
                  }}
                >
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <h1
                  className="font-bold text-xl sm:text-2xl"
                  style={{ color: "#1a472a" }}
                >
                  Company Setup
                </h1>
              </div>
            </div>
            {singleCompany?.logo && !input.file && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-xs text-green-700 font-medium">
                  Logo uploaded
                </span>
              </div>
            )}
          </div>

          {/* Main Form Card */}
          <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 sm:p-8">
              {/* Company Logo Preview & Upload */}
              <div className="flex flex-col items-center mb-8 pb-6 border-b border-gray-100">
                <div className="relative mb-4">
                  <div
                    className="w-28 h-28 rounded-2xl flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed"
                    style={{ borderColor: "#d1e0d6" }}
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
                        style={{ color: "#8ba89a" }}
                      />
                    )}
                  </div>
                  <label
                    htmlFor="logo-upload"
                    className="absolute -bottom-2 -right-2 p-1.5 rounded-full cursor-pointer transition-all duration-200 hover:scale-110"
                    style={{
                      background:
                        "linear-gradient(135deg, #1a472a 0%, #2d5a3b 100%)",
                    }}
                  >
                    <Upload className="h-3.5 w-3.5 text-white" />
                  </label>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={changeFileHandler}
                    className="hidden"
                  />
                </div>
                <p
                  className="text-xs text-center mt-2"
                  style={{ color: "#8ba89a" }}
                >
                  Click the upload button to change logo
                  <br />
                  Recommended: Square image, max 2MB
                </p>
              </div>

              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    className="text-sm font-semibold flex items-center gap-2"
                    style={{ color: "#1a472a" }}
                  >
                    <Building2 className="h-4 w-4" />
                    Company Name
                  </Label>
                  <Input
                    type="text"
                    name="companyName"
                    value={input.companyName}
                    onChange={changeEventHandler}
                    placeholder="Enter company name"
                    className="border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    className="text-sm font-semibold flex items-center gap-2"
                    style={{ color: "#1a472a" }}
                  >
                    <MapPin className="h-4 w-4" />
                    Location
                  </Label>
                  <Input
                    type="text"
                    name="location"
                    value={input.location}
                    onChange={changeEventHandler}
                    placeholder="Dublin, Ireland"
                    className="border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label
                    className="text-sm font-semibold flex items-center gap-2"
                    style={{ color: "#1a472a" }}
                  >
                    <FileText className="h-4 w-4" />
                    Description
                  </Label>
                  <Textarea
                    name="description"
                    value={input.description}
                    onChange={changeEventHandler}
                    placeholder="Tell us about your company..."
                    className="border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-200 min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    className="text-sm font-semibold flex items-center gap-2"
                    style={{ color: "#1a472a" }}
                  >
                    <Globe className="h-4 w-4" />
                    Website
                  </Label>
                  <Input
                    type="url"
                    name="website"
                    value={input.website}
                    onChange={changeEventHandler}
                    placeholder="https://www.example.com"
                    className="border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    className="text-sm font-semibold flex items-center gap-2"
                    style={{ color: "#1a472a" }}
                  >
                    <Upload className="h-4 w-4" />
                    Company Logo
                  </Label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={changeFileHandler}
                      className="border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-green-50 file:to-emerald-50 file:text-green-700 hover:file:bg-gradient-to-r hover:file:from-green-100 hover:file:to-emerald-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 sm:px-8 py-5 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/companies")}
                className="order-2 sm:order-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="order-1 sm:order-2 bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-800 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
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

          {/* Info Banner */}
          <div className="w-full bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-green-100">
                <Building2 className="h-4 w-4 text-green-700" />
              </div>
              <div>
                <h4
                  className="text-sm font-semibold mb-1"
                  style={{ color: "#1a472a" }}
                >
                  Dublin Business School
                </h4>
                <p className="text-xs" style={{ color: "#5a7c6a" }}>
                  Ireland's leading independent college offering undergraduate,
                  postgraduate & part-time courses.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
