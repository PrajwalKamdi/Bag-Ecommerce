import axios from "axios";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MyContex from "../store/MyContex";

const LoginForm = () => {
  const { setIsLoggedIn } = useContext(MyContex);
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_BACKEND;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`${api}login`, formData);
      console.log(data);
      const userID = data._id;
      const email = data.email;
      const token = data.token;
      const fullName = data.firstName + data.lastName;
      localStorage.setItem("userID", userID);
      localStorage.setItem("email", email);
      localStorage.setItem("token", token);
      localStorage.setItem("fullName", fullName);
      if (userID) {
        setIsLoggedIn(true);
      }
      toast.success("Login Successful!",{
        autoClose:2000
      })
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message,{
        autoClose:2000
      });
    } finally {
      setLoading(false);
      showPassword(false);
    }
  };

  return (
    <div className="bg-neutral-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
              Welcome back
            </h2>
            <p className="text-neutral-600 text-sm">
              Please sign in to your account
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                  placeholder="Enter your password"
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-neutral-900 border-neutral-300 rounded focus:ring-neutral-900 focus:ring-2"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-neutral-700"
                >
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
              >
                Forgot password?
              </button>
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
                "Sign in"
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-neutral-500">or</span>
              </div>
            </div>

            {/* Social Login */}
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
              Continue with Google
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-neutral-600">
              Don't have an account?{" "}
              <NavLink
                to={"/sign-up"}
                className="font-medium text-neutral-900 hover:text-neutral-700 transition-colors duration-200"
              >
                Sign up
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
