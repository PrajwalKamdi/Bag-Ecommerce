import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse p-4 bg-white w-full">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-2xl shadow-sm p-2 md:p-4 bg-white"
          >
            {/* 1. Image skeleton */}
            <div className="h-64 w-full bg-gray-300 rounded-xl mb-4"></div>

            {/* 2. Title skeleton */}
            <div className="h-5 bg-gray-300 rounded w-3/4 mb-4"></div>

            {/* 3. Description skeleton */}
            <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>

            {/* 4. Button skeleton */}
            <div className="h-10 bg-gray-300 rounded-xl w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
