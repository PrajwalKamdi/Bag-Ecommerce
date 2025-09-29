import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import MyContex from "./MyContex";
import { toast, ToastContainer } from "react-toastify";

// Context Provider Component
const MyProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const [Goodst, setGst] = useState(0);
  const url = import.meta.env.VITE_API_BACKEND;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    if (userID) {
      setIsLoggedIn(true);
    }
  }, [userID]);

  const handlePrice = useCallback(() => {
    const newTotal = items.reduce(
      (sum, item) => sum + (item.productId?.discountPrice || 0) * item.quantity,
      0
    );
    const gst = Math.round((newTotal * 5) / 100);
    setPrice(newTotal);
    setGst(gst);
    setTotal(newTotal + gst);
  }, [items]);

  const handleCart = useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}cart/${userID}`);
      setItems(data.cart.products);
    } catch (error) {
      console.log(error.message);
    }
  }, [url, userID]);

  const addToCart = useCallback(
    async (product, userID, quantity) => {
      try {
        await axios.post(`${url}addToCart`, {
          userId: userID,
          productId: product._id,
          quantity: quantity,
        });
        toast.success("Product Added Successfully!",{
          autoClose:2000
        });
        handleCart(); // Call to refetch cart
      } catch (error) {
        console.error("Add to cart error:", error.message);
        toast.error("Maximum you can only add 10 items");
      }
    },
    [url, userID, handleCart]
  );

  const removeFromCart = useCallback(
    async (productId) => {
      try {
        await axios.delete(`${url}removeFromCart`, {
          data: { userId: userID, productId: productId },
        });
        toast.success("Item removed successfully!",{
          autoClose:2000
        });
        handleCart(); // Call to refetch cart
      } catch (error) {
        toast.error("Failed to remove!",{
          autoClose:2000
        });
      }
    },
    [url, userID, handleCart]
  );

  const removeAllFromCart = useCallback(async () => {
    try {
      const { data } = await axios.delete(`${url}cart/removeAll`, {
        data: { userId: userID },
      });
      handleCart();
    } catch (error) {
      console.log(error.message);
    }
  }, [userID, url]);

  useEffect(() => {
    handleCart();
  }, [handleCart]);

  useEffect(() => {
    handlePrice();
  }, [handlePrice]);

  return (
    <MyContex.Provider
      value={{
        items,
        price,
        Goodst,
        total,
        userID,
        addToCart,
        removeFromCart,
        isLoggedIn,
        setIsLoggedIn,
        removeAllFromCart,
      }}
    >
      {children}
    </MyContex.Provider>
  );
};

export default MyProvider;
