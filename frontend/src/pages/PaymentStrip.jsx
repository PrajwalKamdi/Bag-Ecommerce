import axios from "axios";
const PaymentStrip = ({ userID, total, apiUrl }) => {
  const handleSubmit = async () => {
    try {
      const { data: keyData } = await axios.get(`${apiUrl}get-key`);
      const key = keyData.key;
      const { data: orderData } = await axios.post(`${apiUrl}create-order`, {
        amount: total,
      });
      const order = orderData.order;
      const options = {
        key: key,
        amount: order.amount,
        currency: "INR",
        name: localStorage.getItem("fullName"),
        description: "Test Transaction",
        order_id: order.id,
        // callback_url: `${apiUrl}payment-verification`,
        prefill: {
          name: localStorage.getItem("fullName"),
          email: localStorage.getItem("email"),
          contact: "9999999999",
        },
        // notes: {
        //   userId: userID,
        //   totalPrice: total,
        //   shippingAddress: formData,
        // },
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
    <div className=" fixed bottom-0 left-0 right-0 bg-white shadow-xl p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto">
        {/* Price */}
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-0">
          <h2 className="text-base sm:text-lg font-medium text-gray-700">
            Total:
          </h2>
          <p className="text-lg sm:text-xl font-bold text-gray-900">₹{total}</p>
        </div>

        {/* Button */}
        <button
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg active:scale-95"
          onClick={handleSubmit}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentStrip;
