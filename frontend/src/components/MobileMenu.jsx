import { User, X } from "lucide-react";
import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import MyContex from "../store/MyContex";

export default function MobileMenu({ isOpen, setIsOpen, count }) {
  const { isLoggedIn } = useContext(MyContex);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <div
      className={`fixed top-0 left-0 h-full w-full bg-gray-50 
      transform transition-transform duration-300 ease-in-out z-50 shadow-lg
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex flex-col h-full p-6">
        {/* Top bar */}
        <div className="flex justify-between items-center w-full mb-10">
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            <h2 className="text-3xl font-bold text-gray-900 tracking-wider">
              VELORA
            </h2>
          </NavLink>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <X color="#111" size={28} />
          </button>
        </div>

        {/* Menu items */}
        <ul className="space-y-6 text-lg font-medium ">
          {["Home", "Products"].map((item) => (
            <li key={item}>
              <NavLink
                to={
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "")}`
                }
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-lg transition-colors duration-300 ${
                    isActive
                      ? "text-gray-900 bg-gray-200 font-semibold"
                      : "text-gray-800 hover:text-gray-900 hover:bg-gray-200"
                  }`
                }
              >
                {item}
              </NavLink>
            </li>
          ))}

          {/* Cart */}
          {/* <li>
            <NavLink
              to="/cart"
              onClick={() => setIsOpen(false)}
              // className="relative flex items-center gap-2 text-gray-800 hover:text-gray-900 hover:bg-gray-200 rounded-lg px-3 py-2 transition"
            >
              <div className="flex px-3 justify-center items-center">
                <ShoppingBag color="black" size={24} />
                {count > 0 && (
                  <p className="bg-pink-500 text-white px-1 rounded-full -translate-3 text-sm font-medium">
                    {count}
                  </p>
                )}
                <span className="pl-1">Cart</span>
              </div>
            </NavLink>
          </li> */}

          {/* Profile / Login */}
          <li>
            {isLoggedIn ? (
              <NavLink
                to="/profile"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-2 px-3 rounded-lg transition-colors duration-300 ${
                    isActive
                      ? "text-gray-900 bg-gray-200 font-semibold"
                      : "text-gray-800 hover:text-gray-900 hover:bg-gray-200"
                  }`
                }
              >
                <div className="p-2 bg-gray-300 rounded-full">
                  <User size={20} className="text-gray-900" />
                </div>
                <span>Profile</span>
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-lg transition-colors duration-300 ${
                    isActive
                      ? "text-gray-900 bg-gray-200 font-semibold"
                      : "text-gray-800 hover:text-gray-900 hover:bg-gray-200"
                  }`
                }
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>

        {/* Footer */}
        <div className="mt-auto text-gray-500 text-sm text-center border-t border-gray-200 pt-4">
          © {new Date().getFullYear()} Velora. All rights reserved.
        </div>
      </div>
    </div>
  );
}
