import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ProductCard from "./ProductCard";
const Products = () => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(20);

  const url = import.meta.env.VITE_API_BACKEND;
  const handleApi = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category") || "";
    try {
      setLoading(true);
      // const { data } = await axios.get(
      //   `${url}products/category?category=${category}`
      // );
      const { data } = await axios.get(
        `${url}products/category?category=${category}&page=${page}&limit=${limit}`
      );

      // const data = await axios.get(`${url}products`);
      console.log(data);
      // localhost:3000/api/v1/products/category?category=business
      setProduct(data.data);
      setPages(data.pages);
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleApi();
  }, [page]);
  if (loading) {
    return (
      <>
        <LoadingSkeleton />
        <LoadingSkeleton />
      </>
    );
  }
  if (err) {
    return (
      <div className="text-red-500 max-h-1/2">
        <h1 className="text-3xl text-center">{err}</h1>
      </div>
    );
  }
  const handleNext = () => {
    if (page < pages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleCategoryChange = (category) => {
    const params = new URLSearchParams(window.location.search);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    window.history.replaceState(
      null,
      "",
      params.toString() ? `?${params}` : window.location.pathname
    );
    handleApi();
  };

  const currentCategory =
    new URLSearchParams(window.location.search).get("category") || "";

  return (
    <div className="mx-1">
      <div
        className="text-[10px] lg:text-base  flex flex-wrap justify-center items-center gap-4 mb-2  py-5 bg-white rounded-md sticky top-10 lg:top-16 z-10"
      >
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            id="all"
            name="category"
            value=""
            className="accent-blue-600"
            checked={currentCategory === ""}
            onChange={() => handleCategoryChange("")}
          />
          <span>All</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            id="business"
            name="category"
            value="Business"
            className="accent-blue-600"
            checked={currentCategory === "Business"}
            onChange={() => handleCategoryChange("Business")}
          />
          <span>Business</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            id="shoulder"
            name="category"
            value="shoulder_bag"
            className="accent-blue-600"
            checked={currentCategory === "shoulder_bag"}
            onChange={() => handleCategoryChange("shoulder_bag")}
          />
          <span>Shoulder Bag</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            id="casual"
            name="category"
            value="Casual"
            className="accent-blue-600"
            checked={currentCategory === "Casual"}
            onChange={() => handleCategoryChange("Casual")}
          />
          <span>Casual</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            id="crafted"
            name="category"
            value="Craft"
            className="accent-blue-600"
            checked={currentCategory === "Craft"}
            onChange={() => handleCategoryChange("Craft")}
          />
          <span>Crafted</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            id="clutch"
            name="category"
            value="Clutch"
            className="accent-blue-600"
            checked={currentCategory === "Clutch"}
            onChange={() => handleCategoryChange("Clutch")}
          />
          <span>Clutch</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            id="wedding"
            name="category"
            value="Wedding"
            className="accent-blue-600"
            checked={currentCategory === "Wedding"}
            onChange={() => handleCategoryChange("Wedding")}
          />
          <span>Wedding</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            id="Crossbody Bag"
            name="category"
            value="Crossbody Bag"
            className="accent-blue-600"
            checked={currentCategory === "Crossbody Bag"}
            onChange={() => handleCategoryChange("Crossbody Bag")}
          />
          <span>Cross Body</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            id="sling bag"
            name="category"
            value="sling bag"
            className="accent-blue-600"
            checked={currentCategory === "sling Bag"}
            onChange={() => handleCategoryChange("sling Bag")}
          />
          <span>Sling Bag</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            id="Satchel"
            name="category"
            value="Satchel"
            className="accent-blue-600"
            checked={currentCategory === "Satchel"}
            onChange={() => handleCategoryChange("Satchel")}
          />
          <span>Satchel Bag</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            id="hobo bag"
            name="category"
            value="hobo bag"
            className="accent-blue-600"
            checked={currentCategory === "hobo bag"}
            onChange={() => handleCategoryChange("hobo bag")}
          />
          <span>Hobo Bag</span>
        </label>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-2">
        {products.map((product, idx) => (
          <NavLink to={`/products/${product._id}`} key={idx}>
            <ProductCard product={product} />
          </NavLink>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
            page === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>

        {/* Page Info */}
        <span className="text-gray-700 font-semibold">
          Page {page} of {pages}
        </span>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={page === pages}
          className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
            page === pages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
