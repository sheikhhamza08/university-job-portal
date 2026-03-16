import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import {
  Loader2,
  User,
  Mail,
  Phone,
  Lock,
  GraduationCap,
  Briefcase,
  Upload,
  ArrowRight,
  Sun,
  Camera,
} from "lucide-react";
import { motion } from "framer-motion";
import { colors } from "../../utils/colors";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);
  const [previewImage, setPreviewImage] = useState(null);

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      if (response.data.success) {
        navigate("/login");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    // Cleanup preview URL
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [user, navigate, previewImage]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.white }}>
      <Navbar />

      {/* Decorative Sunburst Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, ${colors.brightBlue} 0%, transparent 70%)`,
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, ${colors.lightBlue} 0%, transparent 70%)`,
            transform: "translate(-30%, 30%)",
          }}
        />
        {/* Sunburst rays */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-2 h-32 opacity-5"
            style={{
              background: `linear-gradient(180deg, ${colors.brightBlue} 0%, transparent 100%)`,
              transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
              transformOrigin: "center",
            }}
          />
        ))}
      </div>

      <div className="relative flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <div
            className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border"
            style={{ borderColor: colors.lightBlue }}
          >
            {/* Header with DBS colors */}
            <div
              className="relative px-8 py-10 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${colors.darkNavy} 0%, ${colors.brightBlue} 100%)`,
              }}
            >
              {/* Sunburst effect in header */}
              <div className="absolute top-0 right-0 w-40 h-40 opacity-20">
                <div className="relative w-full h-full">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-1 h-16 bg-white"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                        transformOrigin: "center",
                      }}
                    />
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative z-10"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="w-6 h-6 text-white" />
                  <h1 className="text-3xl font-bold text-white">
                    Join DBS Community
                  </h1>
                </div>
                <p className="text-white/90 text-sm">
                  Create your account and start your journey with Dublin
                  Business School
                </p>
              </motion.div>
            </div>

            {/* Form Container */}
            <form onSubmit={submitHandler} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name Field */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-2"
                >
                  <Label
                    htmlFor="fullname"
                    className="text-sm font-medium mb-1.5 block"
                    style={{ color: colors.darkNavy }}
                  >
                    Full Name
                  </Label>
                  <div className="relative group">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                      style={{ color: colors.lightBlue }}
                    />
                    <Input
                      id="fullname"
                      type="text"
                      value={input.fullname}
                      name="fullname"
                      onChange={changeEventHandler}
                      placeholder="John Doe"
                      className="pl-10 py-5 transition-all duration-200 rounded-xl w-full"
                      style={{ borderColor: colors.lightBlue }}
                      required
                    />
                  </div>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="mb-2"
                >
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium mb-1.5 block"
                    style={{ color: colors.darkNavy }}
                  >
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                      style={{ color: colors.lightBlue }}
                    />
                    <Input
                      id="email"
                      type="email"
                      value={input.email}
                      name="email"
                      onChange={changeEventHandler}
                      placeholder="john.doe@dbs.ie"
                      className="pl-10 py-5 transition-all duration-200 rounded-xl w-full"
                      style={{ borderColor: colors.lightBlue }}
                      required
                    />
                  </div>
                </motion.div>

                {/* Phone Number Field */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-2"
                >
                  <Label
                    htmlFor="phoneNumber"
                    className="text-sm font-medium mb-1.5 block"
                    style={{ color: colors.darkNavy }}
                  >
                    Phone Number
                  </Label>
                  <div className="relative group">
                    <Phone
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                      style={{ color: colors.lightBlue }}
                    />
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={input.phoneNumber}
                      name="phoneNumber"
                      onChange={changeEventHandler}
                      placeholder="+353 00 000 0000"
                      className="pl-10 py-5 transition-all duration-200 rounded-xl w-full"
                      style={{ borderColor: colors.lightBlue }}
                      required
                    />
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="mb-2"
                >
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium mb-1.5 block"
                    style={{ color: colors.darkNavy }}
                  >
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                      style={{ color: colors.lightBlue }}
                    />
                    <Input
                      id="password"
                      type="password"
                      value={input.password}
                      name="password"
                      onChange={changeEventHandler}
                      placeholder="••••••••"
                      className="pl-10 py-5 transition-all duration-200 rounded-xl w-full"
                      style={{ borderColor: colors.lightBlue }}
                      required
                    />
                  </div>
                </motion.div>
              </div>

              {/* Role Selection and Profile Upload */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <Label
                  className="text-sm font-medium mb-3 block"
                  style={{ color: colors.darkNavy }}
                >
                  I am a
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Role Selection Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Student Role */}
                    <motion.label
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        relative flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer
                        transition-all duration-200 group bg-white
                        ${input.role === "student" ? "shadow-lg" : "hover:shadow-md"}
                      `}
                      style={{
                        borderColor:
                          input.role === "student"
                            ? colors.brightBlue
                            : colors.lightBlue,
                        boxShadow:
                          input.role === "student"
                            ? `0 10px 15px -3px ${colors.brightBlue}20`
                            : "none",
                      }}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="student"
                        checked={input.role === "student"}
                        onChange={changeEventHandler}
                        className="sr-only"
                        required
                      />
                      <div className="flex flex-col items-center gap-2">
                        <GraduationCap
                          className={`
                          h-8 w-8 transition-colors duration-200
                          ${input.role === "student" ? "" : "text-gray-400"}
                        `}
                          style={{
                            color:
                              input.role === "student" ? colors.brightBlue : "",
                          }}
                        />
                        <span
                          className={`
                          text-sm font-medium transition-colors duration-200
                          ${input.role === "student" ? "" : "text-gray-600"}
                        `}
                          style={{
                            color:
                              input.role === "student" ? colors.brightBlue : "",
                          }}
                        >
                          Student
                        </span>
                      </div>
                      {input.role === "student" && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: colors.brightBlue }}
                        >
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </motion.label>

                    {/* Recruiter Role */}
                    <motion.label
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        relative flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer
                        transition-all duration-200 group bg-white
                        ${input.role === "recruiter" ? "shadow-lg" : "hover:shadow-md"}
                      `}
                      style={{
                        borderColor:
                          input.role === "recruiter"
                            ? colors.darkNavy
                            : colors.lightBlue,
                        boxShadow:
                          input.role === "recruiter"
                            ? `0 10px 15px -3px ${colors.darkNavy}20`
                            : "none",
                      }}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="recruiter"
                        checked={input.role === "recruiter"}
                        onChange={changeEventHandler}
                        className="sr-only"
                      />
                      <div className="flex flex-col items-center gap-2">
                        <Briefcase
                          className={`
                          h-8 w-8 transition-colors duration-200
                          ${input.role === "recruiter" ? "" : "text-gray-400"}
                        `}
                          style={{
                            color:
                              input.role === "recruiter" ? colors.darkNavy : "",
                          }}
                        />
                        <span
                          className={`
                          text-sm font-medium transition-colors duration-200
                          ${input.role === "recruiter" ? "" : "text-gray-600"}
                        `}
                          style={{
                            color:
                              input.role === "recruiter" ? colors.darkNavy : "",
                          }}
                        >
                          Recruiter
                        </span>
                      </div>
                      {input.role === "recruiter" && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: colors.darkNavy }}
                        >
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </motion.label>
                  </div>

                  {/* Profile Picture Upload */}
                  <div
                    className="flex items-center gap-4 p-3 rounded-xl border-2 border-dashed"
                    style={{ borderColor: colors.lightBlue }}
                  >
                    <div className="flex-shrink-0">
                      {previewImage ? (
                        <div
                          className="relative w-16 h-16 rounded-full overflow-hidden border-2"
                          style={{ borderColor: colors.brightBlue }}
                        >
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center"
                          style={{ backgroundColor: `${colors.lightBlue}20` }}
                        >
                          <Camera
                            className="w-6 h-6"
                            style={{ color: colors.lightBlue }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <Label
                        htmlFor="profile"
                        className="text-sm font-medium block mb-1"
                        style={{ color: colors.darkNavy }}
                      >
                        Profile Picture
                      </Label>
                      <div className="relative">
                        <Input
                          id="profile"
                          accept="image/*"
                          type="file"
                          onChange={changeFileHandler}
                          className="cursor-pointer opacity-0 absolute inset-0 w-full h-full z-10"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full border-2 rounded-lg flex items-center justify-center gap-2"
                          style={{
                            borderColor: colors.brightBlue,
                            color: colors.brightBlue,
                          }}
                          onClick={() =>
                            document.getElementById("profile")?.click()
                          }
                        >
                          <Upload className="w-4 h-4" />
                          Choose Image
                        </Button>
                      </div>
                      <p className="text-xs mt-1 text-gray-500">
                        Optional: Upload a profile picture
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                {loading ? (
                  <Button
                    disabled
                    className="w-full py-6 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg cursor-not-allowed"
                    style={{
                      background: `linear-gradient(135deg, ${colors.darkNavy} 0%, ${colors.brightBlue} 100%)`,
                      opacity: 0.8,
                    }}
                  >
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Account...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full py-6 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg transform hover:scale-[1.02] active:scale-[0.98] group"
                    style={{
                      background: `linear-gradient(135deg, ${colors.darkNavy} 0%, ${colors.brightBlue} 100%)`,
                      boxShadow: `0 10px 15px -3px ${colors.brightBlue}40`,
                    }}
                  >
                    <span>Create Account</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                )}
              </motion.div>

              {/* Login Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6 text-center"
              >
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold transition-colors duration-200"
                    style={{ color: colors.brightBlue }}
                  >
                    Sign In
                  </Link>
                </p>
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="relative my-8"
              >
                <div className="absolute inset-0 flex items-center">
                  <div
                    className="w-full border-t"
                    style={{ borderColor: colors.lightBlue }}
                  ></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-4 bg-white text-gray-500">
                    Join Dublin Business School Community
                  </span>
                </div>
              </motion.div>

              {/* Terms */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-center"
              >
                <p className="text-xs text-gray-500">
                  By creating an account, you agree to our{" "}
                  <a
                    href="#"
                    style={{ color: colors.brightBlue }}
                    className="hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    style={{ color: colors.brightBlue }}
                    className="hover:underline"
                  >
                    Privacy Policy
                  </a>
                </p>
              </motion.div>
            </form>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-6"
          >
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Dublin Business School Job Portal.
              All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
