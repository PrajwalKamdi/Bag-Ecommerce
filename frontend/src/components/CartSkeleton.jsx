import React from "react";

const CartItemSkeleton = () => {
  return (
    <div className="flex items-center gap-6 p-4 bg-white rounded-2xl shadow-md animate-pulse mb-4">
      {/* Product Image */}
      <div className="w-20 h-20 bg-gray-300 rounded-xl"></div>

      {/* Product Details */}
      <div className="flex-1">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-300 rounded-md"></div>
        <div className="w-10 h-6 bg-gray-300 rounded-md"></div>
        <div className="w-8 h-8 bg-gray-300 rounded-md"></div>
      </div>

      {/* Price */}
      <div className="h-6 w-16 bg-gray-300 rounded-md"></div>

      {/* Remove Button */}
      <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
    </div>
  );
};

const CartSkeleton = ({ count = 3 }) => {
  return (
    <div className="p-4">
      {Array.from({ length: count }).map((_, index) => (
        <CartItemSkeleton key={index} />
      ))}
    </div>
  );
};

export default CartSkeleton;