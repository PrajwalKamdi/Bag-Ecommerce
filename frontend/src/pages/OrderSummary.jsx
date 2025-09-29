import axios from "axios";
import { useContext, useState } from "react";
import MyContex from "../store/MyContex";

const OrderSummary = ({ userID, total, apiUrl, address, holdAddress }) => {
  const { items } = useContext(MyContex);

  const handleSubmit = async () => {
    if (!holdAddress) {
      alert("Please add and save your address first.");
      return;
    }
    try {
      const { data: keyData } = await axios.get(`${apiUrl}get-key`);
      console.log(keyData);
      const key = keyData.key;
      const { data: orderData } = await axios.post(`${apiUrl}create-order`, {
        userId: userID,
        totalPrice: total,
        shippingAddress: address,
        products: items,
      });
      const order = await orderData.order;
      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: localStorage.getItem("fullName"),
        description: "Test Transaction",
        order_id: order.id,
        callback_url: `${apiUrl}payment-verification`,
        prefill: {
          name: localStorage.getItem("fullName"),
          email: localStorage.getItem("email"),
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };
      const razor = await new Razorpay(options);
      razor.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="">
        <h2 className="text-xl lg:text-3xl uppercase font-poppins font-semibold text-gray-800 mb-6">
          Order <span className="text-gray-600">Summary____</span>
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-gray-600 border-b pb-3">
            <p>Subtotal</p>
            <p className="font-medium">{total}</p>
          </div>
          <div className="flex justify-between items-center text-gray-600 border-b pb-3">
            <p>Shipping</p>
            <p className="text-green-600 font-semibold">FREE</p>
          </div>
          <div className="flex justify-between items-center text-gray-900 pt-3 font-bold text-xl">
            <p>Total Amount</p>
            <p>₹{total}</p>
          </div>
        </div>

        <button
          className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl mt-8 shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95 transition duration-300 ease-in-out"
          onClick={handleSubmit}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
