import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  BriefcaseBusiness,
  BuildingIcon,
  GraduationCap,
  Home,
  HomeIcon,
  LogOut,
  Menu,
  MenuIcon,
  SearchCheck,
  User2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "../../redux/authSlice";
import { setSearchedQuery } from "../../redux/jobSlice";
import { AnimatePresence, motion } from "framer-motion";
import { colors } from "../../utils/colors";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user } = useSelector((store) => store.auth);

  const logoutHandler = async () => {
    try {
      const response = await axios.post(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const resetQuery = () => {
    dispatch(setSearchedQuery(""));
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b shadow-sm"
      style={{ borderColor: colors.lightBlue }}
    >
      <div className="flex items-center justify-between mx-auto h-16 max-sm:px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="cursor-pointer flex items-center gap-2"
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${colors.darkNavy} 0%, ${colors.brightBlue} 100%)`,
            }}
          >
            {/* Mini sunburst effect in logo */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-0.5 h-3 bg-white"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                    transformOrigin: "center",
                  }}
                />
              ))}
            </div>
            <GraduationCap className="w-5 h-5 text-white relative z-10" />
          </div>
          <div>
            <h1 className="max-sm:text-lg text-xl font-bold leading-tight">
              <span style={{ color: colors.darkNavy }}>DBS</span>{" "}
              <span style={{ color: colors.brightBlue }}>Jobs</span>
            </h1>
            <p
              className="text-[10px] -mt-1"
              style={{ color: colors.lightBlue }}
            >
              Dublin Business School
            </p>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {user && user.role === "recruiter" ? (
              <>
                <motion.li whileHover={{ y: -2 }} className="relative group">
                  <Link
                    to="/admin/companies"
                    className="transition-colors duration-200 font-medium"
                    style={{ color: colors.darkNavy }}
                  >
                    Companies
                  </Link>
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{
                      background: `linear-gradient(90deg, ${colors.darkNavy}, ${colors.brightBlue})`,
                    }}
                  ></span>
                </motion.li>
                <motion.li whileHover={{ y: -2 }} className="relative group">
                  <Link
                    to="/admin/jobs"
                    className="transition-colors duration-200 font-medium"
                    style={{ color: colors.darkNavy }}
                  >
                    Jobs
                  </Link>
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{
                      background: `linear-gradient(90deg, ${colors.darkNavy}, ${colors.brightBlue})`,
                    }}
                  ></span>
                </motion.li>
              </>
            ) : (
              <>
                <motion.li whileHover={{ y: -2 }} className="relative group">
                  <Link
                    to="/"
                    onClick={resetQuery}
                    className="transition-colors duration-200 font-medium"
                    style={{ color: colors.darkNavy }}
                  >
                    Home
                  </Link>
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{
                      background: `linear-gradient(90deg, ${colors.darkNavy}, ${colors.brightBlue})`,
                    }}
                  ></span>
                </motion.li>
                <motion.li whileHover={{ y: -2 }} className="relative group">
                  <Link
                    to="/jobs"
                    className="transition-colors duration-200 font-medium"
                    style={{ color: colors.darkNavy }}
                  >
                    Jobs
                  </Link>
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{
                      background: `linear-gradient(90deg, ${colors.darkNavy}, ${colors.brightBlue})`,
                    }}
                  ></span>
                </motion.li>
                <motion.li whileHover={{ y: -2 }} className="relative group">
                  <Link
                    to="/browse"
                    onClick={resetQuery}
                    className="transition-colors duration-200 font-medium"
                    style={{ color: colors.darkNavy }}
                  >
                    Browse
                  </Link>
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{
                      background: `linear-gradient(90deg, ${colors.darkNavy}, ${colors.brightBlue})`,
                    }}
                  ></span>
                </motion.li>
              </>
            )}
          </ul>

          {/* Notification Bell for logged in users */}
          {user && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 transition-colors duration-200"
              style={{ color: colors.darkNavy }}
            >
              <Bell className="w-5 h-5" />
              <span
                className="absolute top-1 right-1 w-2 h-2 rounded-full"
                style={{ backgroundColor: colors.brightBlue }}
              ></span>
            </motion.button>
          )}

          {/* Auth Buttons or User Menu */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-2 transition-all duration-200 rounded-lg px-5"
                  style={{
                    borderColor: colors.brightBlue,
                    color: colors.brightBlue,
                  }}
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  className="text-white transition-all duration-200 rounded-lg px-5 shadow-md"
                  style={{
                    background: `linear-gradient(135deg, ${colors.darkNavy} 0%, ${colors.brightBlue} 100%)`,
                    boxShadow: `0 4px 6px -1px ${colors.brightBlue}40`,
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <Avatar
                    className="border-2 transition-all duration-200"
                    style={{ borderColor: colors.lightBlue }}
                  >
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        "https://github.com/shadcn.png"
                      }
                      alt={user?.fullname}
                    />
                  </Avatar>
                  <div className="hidden lg:block text-left">
                    <p
                      className="text-sm font-medium"
                      style={{ color: colors.darkNavy }}
                    >
                      {user?.fullname}
                    </p>
                    <p className="text-xs" style={{ color: colors.lightBlue }}>
                      {user?.role}
                    </p>
                  </div>
                  <ChevronDown
                    className="w-4 h-4 transition-colors duration-200"
                    style={{ color: colors.lightBlue }}
                  />
                </motion.button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-2 mr-4">
                <div className="space-y-1">
                  {/* Profile Header */}
                  <div
                    className="flex items-center gap-3 p-3 rounded-lg mb-2"
                    style={{
                      background: `linear-gradient(135deg, ${colors.darkNavy}10 0%, ${colors.brightBlue}10 100%)`,
                    }}
                  >
                    <Avatar className="w-12 h-12 border-2 border-white shadow-md">
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto ||
                          "https://github.com/shadcn.png"
                        }
                      />
                    </Avatar>
                    <div>
                      <h4
                        className="font-bold"
                        style={{ color: colors.darkNavy }}
                      >
                        {user?.fullname}
                      </h4>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-1">
                    {user?.role === "student" && (
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
                        onClick={() => navigate("/profile")}
                      >
                        <User2
                          className="w-4 h-4 transition-colors duration-200 group-hover"
                          style={{ color: colors.lightBlue }}
                        />
                        <span
                          className="text-sm font-medium text-gray-700 group-hover"
                          style={{ color: colors.darkNavy }}
                        >
                          View Profile
                        </span>
                      </motion.div>
                    )}

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
                    >
                      <Settings
                        className="w-4 h-4 transition-colors duration-200"
                        style={{ color: colors.lightBlue }}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Settings
                      </span>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
                    >
                      <HelpCircle
                        className="w-4 h-4 transition-colors duration-200"
                        style={{ color: colors.lightBlue }}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Help Center
                      </span>
                    </motion.div>

                    <div className="border-t border-gray-100 my-2"></div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 cursor-pointer group"
                      onClick={logoutHandler}
                    >
                      <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors duration-200" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-red-500">
                        Logout
                      </span>
                    </motion.div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 transition-colors duration-200"
            style={{ color: colors.darkNavy }}
          >
            <Menu className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
            style={{ borderColor: colors.lightBlue }}
          >
            <div className="p-4 space-y-3">
              {user ? (
                <>
                  <div
                    className="flex items-center gap-3 p-3 rounded-lg mb-2"
                    style={{
                      background: `linear-gradient(135deg, ${colors.darkNavy}10 0%, ${colors.brightBlue}10 100%)`,
                    }}
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto ||
                          "https://github.com/shadcn.png"
                        }
                      />
                    </Avatar>
                    <div>
                      <h4
                        className="font-bold"
                        style={{ color: colors.darkNavy }}
                      >
                        {user?.fullname}
                      </h4>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>

                  {user.role === "recruiter" ? (
                    <>
                      <Link
                        to="/admin/companies"
                        className="block p-2 rounded-lg transition-colors duration-200"
                        style={{ color: colors.darkNavy }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Companies
                      </Link>
                      <Link
                        to="/admin/jobs"
                        className="block p-2 rounded-lg transition-colors duration-200"
                        style={{ color: colors.darkNavy }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Jobs
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/"
                        onClick={() => {
                          resetQuery();
                          setIsMobileMenuOpen(false);
                        }}
                        className="block p-2 rounded-lg transition-colors duration-200"
                        style={{ color: colors.darkNavy }}
                      >
                        Home
                      </Link>
                      <Link
                        to="/jobs"
                        className="block p-2 rounded-lg transition-colors duration-200"
                        style={{ color: colors.darkNavy }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Jobs
                      </Link>
                      <Link
                        to="/browse"
                        onClick={() => {
                          resetQuery();
                          setIsMobileMenuOpen(false);
                        }}
                        className="block p-2 rounded-lg transition-colors duration-200"
                        style={{ color: colors.darkNavy }}
                      >
                        Browse
                      </Link>
                      <Link
                        to="/profile"
                        className="block p-2 rounded-lg transition-colors duration-200"
                        style={{ color: colors.darkNavy }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                    </>
                  )}
                  <div className="border-t border-gray-100 my-2"></div>
                  <button
                    onClick={() => {
                      logoutHandler();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-2 flex flex-col">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-2"
                      style={{
                        borderColor: colors.brightBlue,
                        color: colors.brightBlue,
                      }}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      className="w-full text-white"
                      style={{
                        background: `linear-gradient(135deg, ${colors.darkNavy} 0%, ${colors.brightBlue} 100%)`,
                      }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
