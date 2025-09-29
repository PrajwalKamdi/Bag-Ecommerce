import { Search } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function SearchBar() {
  const [formData, setFormData] = useState({
    query: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="flex flex-col items-center text-xs ">
      <form className="flex w-full max-w-md">
        {/* Input */}
        <input
          name="query"
          type="text"
          value={formData.query}
          required
          onChange={handleInputChange}
          placeholder="Search products..."
          className="flex-grow px-4 py-1 rounded-l-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
        />

        {/* Button */}
        <NavLink to={`search?q=${formData.query}`}>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-r-full hover:bg-blue-600 transition duration-200"
          >
            <Search size={18} strokeWidth={1.75} />
            <span className="hidden sm:inline">Search</span>
          </button>
        </NavLink>
      </form>
    </div>
  );
}
