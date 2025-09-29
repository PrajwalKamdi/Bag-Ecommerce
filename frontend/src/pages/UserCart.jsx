import { useContext } from "react";
import { NavLink } from "react-router-dom";
import MyContex from "../store/MyContex";
import EmptyCart from "./EmptyCart";
import { toast } from "react-toastify";
export default function CartPage() {
  const { removeFromCart, items, total, setTotal, price, Goodst } =
    useContext(MyContex);

  const userId = localStorage.getItem("userID");
  if (!userId) return <EmptyCart />;
  if (items.length === 0) return <EmptyCart />;

  return (
    <div>
      {userId && (
        <div className="container mx-auto p-2 lg:p-4 lg:flex  gap-10 lg:h-screen">
          {/* <h2 className="text-2xl font-bold mb-6 text-[#117a7a]">My Cart 🛒</h2> */}

          {/* cart items */}
          <div className="w-full lg:w-3/4 max-h-[80%] overflow-y-auto scrollbar-hide">
            <ul className="space-y-6">
              {items.map((item) => (
                <li
                  key={item.productId?._id}
                  className="flex gap-2 lg:gap-4 bg-white border border-gray-200 lg:mx-5 rounded-lg lg:p-4 p-2"
                >
                  <img
                    src={
                      Array.isArray(item.productId?.images)
                        ? item.productId.images[0]
                        : item.productId?.images
                    }
                    alt={item.productId?.name || "Product"}
                    className="w-20 h-20 object-cover rounded border border-gray-200"
                  />
                  <div className="flex-1">
                    <p className="font-semibold lg:text-lg text-sm text-gray-800">
                      {item.productId?.name}
                    </p>
                    <p className="text-xs lg:text-sm text-gray-500 mb-1">
                      Brand:{" "}
                      <span className="font-medium">
                        {item.productId?.brand}
                      </span>
                    </p>
                    <p className="text-xs lg:text-sm mb-1">
                      Qty: <span className="font-medium">{item.quantity}</span>
                    </p>
                    <p className="font-medium text-xs lg:text-sm text-green-600 mb-2">
                      ₹{(item.productId?.discountPrice || 0) * item.quantity}
                    </p>
                    <button
                      onClick={() => {
                        removeFromCart(item.productId?._id, userId);
                      }}
                      className="text-xs lg:text-sm mt-2 px-2 lg:px-4 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* billing details */}
          <div className="lg:w-1/4 mt-8 lg:mt-0 p-2">
            <h3 className="text-xl font-medium text-[#117a7a] mb-4">
              BILLING DETAILS
            </h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow">
              <div className="flex justify-between items-center text-gray-600 border-b border-gray-200 p-3">
                <p>Cart Total</p>
                <div className="flex items-center space-x-1">
                  <span>₹</span> <p className="font-medium">{price}</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-gray-600 border-b border-gray-200 p-3">
                <p>GST</p>
                <div className="flex items-center space-x-1">
                  <span>₹{Goodst}</span> <p className="text-xs"></p>
                </div>
              </div>
              <div className="flex justify-between items-center text-gray-600 border-b border-gray-200 p-3">
                <p>Shipping Fee</p>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500 font-medium">FREE</span>
                  <span className="text-gray-400 line-through">₹50.00</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-gray-800 font-semibold p-3 bg-gray-50">
                <p>Total Amount</p>
                <div className="flex items-center space-x-1">
                  <span>₹</span> <p>{total}</p>
                </div>
              </div>
            </div>
            <NavLink to={"/checkout"}>
              <button className="mt-5 w-full bg-[#117a7a] p-3 text-center text-white font-semibold rounded-lg shadow hover:bg-[#0e5e5e] transition">
                Place Order
              </button>
            </NavLink>
          </div>
          {/* mobile checkout */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-2xl px-3 py-2 border-t border-gray-200">
            <div className="flex justify-between items-center max-w-screen-md mx-auto">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <h1 className="text-sm font-medium text-gray-800">
                    Total Amount
                  </h1>
                  <p className="text-base font-bold text-[#117a7a]">₹{total}</p>
                </div>
                <button className="text-xs text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out underline">
                  View Details
                </button>
              </div>
              <NavLink to={"/checkout"}>
                <button className="bg-[#117a7a] text-white text-sm font-medium py-2 px-6 rounded-full transition duration-300 ease-in-out shadow-lg transform hover:scale-105 hover:bg-[#0e5e5e]">
                  Place Order
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
