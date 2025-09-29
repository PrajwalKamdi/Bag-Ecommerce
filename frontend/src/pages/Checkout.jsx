import { useContext, useState } from "react";
import MyContex from "../store/MyContex.js";
import OrderSummary from "./OrderSummary.jsx";
const Checkout = () => {
  const [holdAddress, setHoldAddress] = useState(false);
  const { total, userID } = useContext(MyContex);
  const apiUrl = import.meta.env.VITE_API_BACKEND;
  const [formData, setFormData] = useState({
    userID: userID,
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHoldAddress(true);
    alert("Address saved successfully!");
  };

  return (
    <div className="min-h-screen py-10">
      <div className="px-5 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <div className="">
              <h2 className="text-xl lg:text-3xl uppercase font-poppins font-semibold text-gray-800 mb-6">
                Shipping <span className="text-gray-600">Address____</span>
              </h2>
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="mt-2 block w-full rounded-xl border border-gray-300 bg-gray-50 shadow-sm px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm transition"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+91 0000000000"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-2 block w-full rounded-xl border border-gray-300 bg-gray-50 shadow-sm px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm transition focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label
                      htmlFor="strret"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      placeholder="123 Main Street"
                      required
                      className="mt-2 block w-full rounded-xl border border-gray-300 bg-gray-50 shadow-sm px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm transition"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Mumbai"
                        value={formData.city}
                        onChange={handleChange}
                        className="mt-2 block w-full rounded-xl border border-gray-300 bg-gray-50 shadow-sm px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm transition"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        placeholder="Maharashtra"
                        value={formData.state}
                        onChange={handleChange}
                        className="mt-2 block w-full rounded-xl border border-gray-300 bg-gray-50 shadow-sm px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm transition"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="zipCode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        placeholder="400001"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="mt-2 block w-full rounded-xl border border-gray-300 bg-gray-50 shadow-sm px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-sm transition"
                      />
                    </div>
                  </div>
                  <button className="w-full py-2 px-5 border border-gray-200 bg-blue-500 hover:bg-blue-600 transition ease-in-out duration-300 hover:cursor-pointer text-white/80 font-semibold rounded-2xl ">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
          <OrderSummary
            total={total}
            userID={userID}
            apiUrl={apiUrl}
            address={formData}
            holdAddress={holdAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
