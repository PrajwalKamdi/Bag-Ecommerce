import { LogOut, Mail, User } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.png";
import MyContex from "../store/MyContex";
import MyOrders from "./MyOrders";

export default function NewProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsLoggedIn } = useContext(MyContex);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    token: "",
  });

  useEffect(() => {
    setUser({
      fullName: localStorage.getItem("fullName"),
      email: localStorage.getItem("email"),
      token: localStorage.getItem("token"),
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userID");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");

    setUser({ fullName: "", email: "", token: "" });

    setTimeout(() => {
      navigate("/login");
    }, 1000);
    setIsLoggedIn(false);
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 p-2 flex flex-col  gap-8 lg:flex-row lg:items-start">
      {/* Profile Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md mx-auto lg:mx-0 lg:sticky top-6 h-fit">
        {/* Profile Image */}
        <div className="flex flex-col items-center text-center">
          <img
            src={avatar}
            alt="Profile"
            className="w-28 h-28 rounded-full shadow-md border-4 border-pink-300"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {user.fullName || "Guest User"}
          </h2>
          <p className="text-gray-500">{user.email || "No email set"}</p>
        </div>

        {/* Details */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-3 text-gray-700">
            <User className="w-5 h-5 text-pink-500" />
            <span className="text-sm">{user.fullName}</span>
          </div>

          <div className="flex items-center space-x-3 text-gray-700">
            <Mail className="w-5 h-5 text-pink-500" />
            <span className="text-sm">{user.email}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          <button className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl shadow hover:from-pink-600 hover:to-pink-700 transition font-medium">
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl shadow hover:bg-gray-200 transition font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Orders Section */}
      <div className="flex-1">
        <MyOrders />
      </div>
    </div>
  );
}
