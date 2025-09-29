import { LogOut } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyContex from "../store/MyContex";

export default function ProfilePopup() {
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
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* User Icon (trigger) */}
      <div className="cursor-pointer flex items-center justify-center w-7 h-7 rounded-full bg-pink-500 text-white font-bold">
        {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
      </div>

      {/* Popup */}
      {isOpen && user.token && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-xl p-4 z-50">
          <h2 className="text-lg font-semibold text-gray-800">
            {user.fullName || "Guest"}
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            {user.email || "No email available"}
          </p>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
