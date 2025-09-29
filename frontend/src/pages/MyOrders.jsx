import React, { useState, useEffect, useCallback, useContext } from "react";
import MyContex from "../store/MyContex";
import axios from "axios";

const getStatusClasses = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200 shadow-green-100";
    case "Shipped":
      return "bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 border-yellow-200 shadow-yellow-100";
    case "Processing":
      return "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200 shadow-blue-100";
    default:
      return "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-gray-200 shadow-gray-100";
  }
};

const MyOrders = () => {
  const api = import.meta.env.VITE_API_BACKEND;
  const { userID } = useContext(MyContex);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    if (!userID) {
      setError("User not logged in or userId is missing.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${api}orders`, {
        params: { userId: userID },
      });
      setOrders(data.orders);
      console.log("Fetched orders:", data.orders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders. Please try again.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [userID]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl font-medium text-gray-700 font-poppins">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-100 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-700 mb-2 font-poppins">Oops! Something went wrong</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
        <div className="bg-white p-12 rounded-2xl shadow-lg text-center max-w-md">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3 font-poppins">No Orders Yet</h3>
          <p className="text-gray-500 text-lg">You haven't placed any orders yet. Start shopping to see your orders here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 font-poppins mb-2">
            Your Orders
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
          <p className="text-gray-600 mt-4 text-base lg:text-lg">
            Track and manage all your orders in one place
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-6 lg:space-y-8">
          {orders.map((order, orderIndex) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Order Header */}
              <div className="bg-gradient-to-r from-gray-50 to-white p-6 lg:p-8 border-b border-gray-100">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
                  {/* Status and Order Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-600">Status:</span>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold border shadow-sm ${getStatusClasses(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Placed:</span> {order.paidAt}
                    </div>
                  </div>

                  {/* Order ID and Total */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Order ID:</span> 
                      <span className="font-mono ml-1">#{order._id.slice(-8)}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                      <p className="text-2xl lg:text-3xl font-bold text-gray-900 font-poppins">
                        ₹{order.paymentInfo.totalPrice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 lg:p-8">
                {/* Shipping Address */}
                <div className="mb-8">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 font-poppins flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Shipping Address
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-4 lg:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm lg:text-base text-gray-700">
                      <div>
                        <span className="font-medium text-gray-900">{order.shippingAddress.fullName}</span>
                      </div>
                      <div>{order.shippingAddress.street}</div>
                      <div>
                        {order.shippingAddress.state} - {order.shippingAddress.zipCode}
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span> {order.shippingAddress.phone}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 font-poppins flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Order Items ({order.products.length})
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                    {order.products.map((product, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 rounded-xl p-4 lg:p-5 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-16 w-16 lg:h-20 lg:w-20 object-cover rounded-lg shadow-sm"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm lg:text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                              {product.name}
                            </h4>
                            <div className="space-y-1 text-xs lg:text-sm text-gray-600">
                              <div className="flex justify-between">
                                <span>Quantity:</span>
                                <span className="font-medium">{product.quantity}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Price:</span>
                                <span className="font-bold text-gray-900">₹{product.price}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;