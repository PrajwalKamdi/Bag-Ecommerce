export default function ProductSkeleton() {
  return (
    <div className="w-full flex justify-center px-2 sm:px-4">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl p-4 sm:p-6 m-2 sm:m-4 w-full max-w-5xl animate-pulse">
        {/* Left Side - Image Placeholder */}
        <div className="flex-1 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4 mb-4 md:mb-0">
          <div className="w-48 sm:w-64 md:w-80 h-64 sm:h-80 bg-gray-200 rounded-lg"></div>
          <div className="h-3 w-28 bg-gray-200 rounded mt-3"></div>
        </div>

        {/* Right Side - Details Placeholder */}
        <div className="flex-1 overflow-y-auto px-2 sm:px-4 max-h-[450px] md:max-h-[500px] space-y-4">
          {/* Top Section */}
          <div>
            <div className="h-5 sm:h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-1/4 bg-gray-200 rounded mb-2"></div>
            <div className="h-[1px] bg-gray-200 my-3"></div>
            <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="h-10 w-full sm:w-36 bg-gray-200 rounded-lg"></div>
              <div className="h-10 w-full sm:w-40 bg-gray-200 rounded-lg"></div>
            </div>
          </div>

          {/* Product Details Section */}
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-3"></div>
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-3 w-full sm:w-2/3 bg-gray-200 rounded"></div>
              ))}
              {/* Features */}
              <div>
                <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
                <div className="space-y-1 ml-5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-3 w-1/2 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
