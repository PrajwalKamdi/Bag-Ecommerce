import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_BACKEND;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!", {
        autoClose: 2000,
      });
      return;
    }

    if (!acceptTerms) {
      toast.error("Please accept the terms and conditions!", {
        autoClose: 2000,
      });
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(`${api}sign-up`, formData);

      toast.success(data?.message || "Sign Up Successfully!", {
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (e) {
      toast.error(e.response?.data?.message || "Sign up failed ❌", {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
      setAcceptTerms(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        number: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="bg-neutral-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
              Create your account
            </h2>
            <p className="text-neutral-600 text-sm">
              Join us and start your journey today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-neutral-700 mb-1 sm:mb-2"
                >
                  First Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                    size={18}
                  />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2 sm:py-3 border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-500 focus:border-neutral-900 focus:outline-none transition-colors duration-200"
                    placeholder="First name"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-neutral-700 mb-1 sm:mb-2"
                >
                  Last Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                    size={18}
                  />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2 sm:py-3 border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-500 focus:border-neutral-900 focus:outline-none transition-colors duration-200"
                    placeholder="Last name"
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                  size={18}
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-500 focus:border-neutral-900 focus:outline-none transition-colors duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                  size={18}
                />
                <input
                  id="phone"
                  name="number"
                  type="tel"
                  required
                  value={formData.number}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-3 border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-500 focus:border-neutral-900 focus:outline-none transition-colors duration-200"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                  size={18}
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-11 py-3 border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-500 focus:border-neutral-900 focus:outline-none transition-colors duration-200"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                  size={18}
                />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-11 py-3 border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-500 focus:border-neutral-900 focus:outline-none transition-colors duration-200"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                id="accept-terms"
                name="accept-terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="h-4 w-4 text-neutral-900 border-neutral-300 rounded focus:ring-neutral-900 focus:ring-2 mt-1"
              />
              <label
                htmlFor="accept-terms"
                className="ml-3 text-sm text-neutral-700"
              >
                I agree to the{" "}
                <button
                  type="button"
                  className="text-neutral-900 hover:text-neutral-700 underline transition-colors duration-200"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-neutral-900 hover:text-neutral-700 underline transition-colors duration-200"
                >
                  Privacy Policy
                </button>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-neutral-900 text-white font-medium py-3 rounded-lg hover:bg-neutral-800 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-neutral-500">or</span>
            </div>
          </div>

          {/* Social Sign Up */}
          <button
            type="button"
            className="w-full border border-neutral-300 text-neutral-700 font-medium py-3 rounded-lg hover:bg-neutral-50 transition-colors duration-200 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign up with Google
          </button>

          {/* Sign In Link */}
          <p className="text-center text-sm text-neutral-600">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="font-medium text-neutral-900 hover:text-neutral-700 transition-colors duration-200"
            >
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default SignUpForm;
