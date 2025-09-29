import React, { useCallback } from "react";
import { useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import ZeroSearch from "../assets/ZeroSearch.png";
import { Loader } from "lucide-react";
const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isZero, setIsZero] = useState(false);
  const api = import.meta.env.VITE_API_BACKEND;
  const handleSearch = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const { data } = await axios.get(`${api}products/search?q=${query}`);
        // handle response as needed
        setProducts(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [query]
  );
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1>Prodduct Loading</h1>
        <p className="animate-spin">
          <Loader />
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen mx-1">
      <form
        onSubmit={handleSearch}
        style={{ maxWidth: 400, margin: "0 auto", padding: "1rem" }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          required
          style={{
            width: "100%",
            padding: "0.75rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />
      </form>
      <h1 className="text-lg font-poppins text-gray-600 my-2">
        Showing results for {query} - {product.length} items
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {product.map((item) => (
          <div className="">
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchInput;
