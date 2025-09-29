import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductSkeleton from "./ProductSkeleton";
import Trust01 from "../components/Trust01";
import Trust02 from "../components/Trust02";
import MyContex from "../store/MyContex";
import { toast } from "react-toastify";
export default function Product() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const { addToCart } = useContext(MyContex);
  const userID = localStorage.getItem("userID");
  const handleApi = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BACKEND}products/${productId}`
      );
      setProduct(res.data.data); // assuming your backend wraps in { data: {...} }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setQuantity(e.target.value);
  };
  
  useEffect(() => {
    handleApi();
  }, []);

  if (loading) {
    return <ProductSkeleton />;
  }

  if (!product) {
    return (
      <div className="text-center text-red-500 py-10">Product not found!</div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl p-4 sm:p-6 m-2 sm:m-4  mx-auto">
        {/* Left Side - Image + ID */}
        <div className="flex flex-1 flex-col items-center border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4 mb-4 md:mb-0">
          <img
            src={product.images[0]}
            alt={product.name}
            className="hover:scale-105 transition duration-500 md:h-[500px] w-full object-contain"
          />
          <p className="text-xs text-gray-500 mt-2">ID: {product._id}</p>
        </div>

        {/* Right Side - Scrollable Details */}
        <div className="flex-1 overflow-y-auto  px-2 sm:px-4 h-screen">
          <div className="mb-4">
            {/* Product Name */}
            <h1 className="sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 leading-snug">
              {product.name}
            </h1>

            {/* Brand */}
            <p className="font-semibold text-gray-500 mb-1">{product.brand}</p>

            <hr className="my-2 border-gray-200" />

            {/* Price */}
            <div className="mb-3">
              <span className="text-xl sm:text-2xl font-bold text-gray-800">
                ₹{product.discountPrice}
              </span>
              {product.price > product.discountPrice && (
                <span className="text-xs sm:text-sm line-through text-gray-400 ml-2">
                  ₹{product.price}
                </span>
              )}
              <p className="text-sm text-gray-500">Price Inc all Taxes</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={() => {
                  if (userID) {
                    addToCart(product, userID, quantity);
                  } else {
                    toast.error("Please Login!",{
                      autoClose:2000
                    });
                  }
                }}
                className="flex items-center justify-center gap-2 bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-700 text-sm sm:text-base"
              >
                🛒 Add to Cart
              </button>
              <div className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-100 text-sm sm:text-base">
                Quantity
                <select
                  name="qunt"
                  id="qunat"
                  className="w-full"
                  onChange={handleChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
            Product Details
          </h2>
          <div className="space-y-1 sm:space-y-2 text-[14px] sm:text-sm text-gray-800">
            <p>
              <span className="font-medium">Brand:</span> {product.brand}
            </p>
            <p>
              <span className="font-medium">Category:</span> {product.category}
            </p>
            <p>
              <span className="font-medium">Material:</span> {product.material}
            </p>
            <p>
              <span className="font-medium">Color:</span> {product.color}
            </p>
            <p>
              <span className="font-medium">Weight:</span> {product.weight}
            </p>
            <p>
              <span className="font-medium">Capacity:</span> {product.capacity}
            </p>
            <p>
              <span className="font-medium">Warranty:</span> {product.warranty}
            </p>
            <p>
              <span className="font-medium">ASIN:</span> {product.asin}
            </p>
            <p>
              <span className="font-medium">Dimensions:</span>{" "}
              {product.dimensions.height} x {product.dimensions.width} x{" "}
              {product.dimensions.depth}
            </p>
            <p>
              <span className="font-medium">Stock:</span> {product.stock}
            </p>
            <p>
              <span className="font-medium">Ratings:</span>{" "}
              {product.ratings.average} ★ ({product.ratings.count} reviews)
            </p>
            <div>
              <span className="font-medium">Features:</span>
              <ul className="list-disc ml-5 text-gray-500">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Trust01 />
      <Trust02 />
   
    </>
  );
}
