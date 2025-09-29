import { Link } from "react-router-dom";
import emptyCart from "../assets/emptyCart.png";

const EmptyCart = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen my-auto">
      <img src={emptyCart} alt="" className="object-contain md:h-80 h-60" />
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Your cart is empty!
      </h3>
      <p className="text-gray-500 px-5 text-center">
        Looks like you haven’t added anything to your cart yet. <br />
        Start exploring our products and add your favorites!
      </p>
      <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
        <Link to={"/products"}>Browse Products</Link>
      </button>
    </div>
  );
};

export default EmptyCart;
