import React from "react";

export default function ProductCard({ product }) {
  const { name, brand, images, price, discountPrice, isNew, features } =
    product;
  return (
    <div className="flex flex-col w-full sm:max-w-sm bg-white rounded-sm shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 ">
      <div className="relative overflow-hidden aspect-square flex items-center justify-center">
        <img
          src={images[0]}
          alt={name}
          className="object-cover transition-transform duration-500 hover:scale-105"
          // style={{ width: "220px", height: "220px" }}
        />

        {/* Discount Badge */}
        {price > discountPrice && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full">
            {Math.round(((price - discountPrice) / price) * 100)}% OFF
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col p-3 sm:p-4 flex-grow justify-between">
        {/* Brand */}
        <div className="mb-1">
          <span className="text-[10px] sm:text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">
            {brand}
          </span>
        </div>

        {/* Name */}
        <h2 className="text-[9px] md:text-xs font-semibold text-gray-900 leading-tight mb-2 truncate">
          {name}
        </h2>

        {/* Features */}
        {features && (
          <div className="hidden  text-xs text-gray-700 mb-2 line-clamp-1">
            Features:{" "}
            {features.slice(0, 2).map((item, idx) => (
              <span key={idx}>
                {item}
                {idx !== features.length - 1 ? ", " : ""}
              </span>
            ))}
            {features.length > 2 && " ..."}
          </div>
        )}

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <span className="text-xs sm:text-base font-semibold text-gray-900">
            ₹{discountPrice?.toLocaleString("en-IN")}
          </span>
          {price > discountPrice && (
            <span className="line-through text-gray-400 text-xs sm:text-sm">
              ₹{price?.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* View Details Button */}
        <button className="w-full py-1.5 sm:py-2 text-xs sm:text-sm bg-gray-800 text-white font-medium rounded-md hover:bg-gray-900 transition-colors duration-300">
          View Details
        </button>
      </div>
    </div>
  );
}
