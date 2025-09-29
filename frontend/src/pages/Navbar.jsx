import {
  Menu,
  Search,
  SearchCheckIcon,
  SearchIcon,
  ShoppingBag,
  ShoppingBagIcon,
  ShoppingCartIcon,
  User,
  X,
} from "lucide-react";
import shoppingcart from "../assets/shoppingcart.svg";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import MobileMenu from "../components/MobileMenu";
import MyContex from "../store/MyContex";
import ProfilePopup from "./Profile";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, items } = useContext(MyContex);
  const count = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 left-0 w-full z-50 border-b border-gray-200 py-2 lg:py-4">
      <div className="container mx-auto flex items-center justify-between px-3 md:px-8 ">
        {/* Desktop Menu */}
        <div className="hidden md:flex justify-between items-center w-full">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center font-fredericka hover:scale-105 transition-transform duration-300"
          >
            <h1 className="font-fredericka text-4xl tracking-wide text-gray-900">
              VELORA
            </h1>
          </NavLink>

          {/* Links */}
          <ul className="flex space-x-7 justify-center items-center font-poppins text-gray-800">
            {/* Search */}
            <li className="flex items-center">
              <SearchBar />
            </li>

            {/* Home */}
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `relative text-md transition duration-200 hover:text-blue-600
                   after:content-[''] after:absolute after:w-0 after:h-[2px] 
                   after:left-0 after:-bottom-1 after:bg-blue-600 
                   after:transition-all after:duration-300 
                   hover:after:w-full ${
                     isActive
                       ? "font-semibold text-blue-600 after:w-full"
                       : "text-gray-800"
                   }`
                }
              >
                Home
              </NavLink>
            </li>

            {/* Products */}
            <li>
              <NavLink
                to={"/products"}
                className={({ isActive }) =>
                  `relative text-md transition duration-200 hover:text-blue-600
                   after:content-[''] after:absolute after:w-0 after:h-[2px] 
                   after:left-0 after:-bottom-1 after:bg-blue-600 
                   after:transition-all after:duration-300 
                   hover:after:w-full ${
                     isActive
                       ? "font-semibold text-blue-600 after:w-full"
                       : "text-gray-800"
                   }`
                }
              >
                Products
              </NavLink>
            </li>

            {/* Cart */}
            <li>
              <NavLink to={"/cart"}>
                <div className="relative flex items-center">
                  {/* <img src={shoppingcart} alt="cart" className="h-6 w-6" /> */}
                  <ShoppingCartIcon/>
                  {count > 0 && (
                    <span
                      className={`absolute -top-2 -right-1 bg-pink-500 text-white font-semibold ${
                        isLoggedIn && count ? "px-1" : ""
                      }  py-0.5 text-xs rounded-full shadow`}
                    >
                      {isLoggedIn ? `${count}` : ""}
                    </span>
                  )}
                </div>
              </NavLink>
            </li>

            {/* Profile/Login */}
            <li className="flex justify-center items-center">
              {isLoggedIn ? (
                <NavLink to={"/profile"}>
                  <ProfilePopup />
                </NavLink>
              ) : (
                <NavLink to={"/login"} className="transition">
                  <User />
                </NavLink>
              )}
            </li>
          </ul>
        </div>

        {/* Mobile Navbar */}
        <div className="flex justify-between items-center w-full md:hidden">
          {/* Menu toggle */}
          <button
            className="transition-transform duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Logo */}
          <NavLink to="/" className="flex justify-center">
            <h2 className="text-2xl font-bold text-gray-900 tracking-wide">
              VELORA
            </h2>
          </NavLink>

          <div className="flex justify-center items-center gap-2">
            <NavLink to={"/searchInput"}>
              <SearchIcon />
            </NavLink>
            {/* Cart */}
            <NavLink to="/cart" className="relative flex items-center">
              <ShoppingBagIcon strokeWidth={1.75} size={24} />
              {count > 0 && (
                <span className="absolute -top-1 -right-0 bg-pink-500 text-white px-1 text-xs rounded-full">
                  {count}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} count={count} />
    </nav>
  );
}
