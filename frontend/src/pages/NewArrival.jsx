import axios from "axios";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import LoadingSkeleton from "../components/LoadingSkeleton.jsx";
import ProductCard from "./ProductCard";
import { CustomNext, CustomPrev, settings } from "../components/Setting.jsx";

const NewArrival = () => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const api = import.meta.env.VITE_API_BACKEND;

  const handleNewArrival = async () => {
    try {
      const { data } = await axios.get(`${api}products/newArrival`);
      setProducts(data.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleNewArrival();
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
   <div className="mx-2">
  <div className="my-5 lg:my-10 text-2xl lg:text-4xl text-center font-poppins font-semibold text-gray-600 uppercase">
    <h1 className="font-poppins">New Arrivals</h1>
  </div>
  <Slider {...settings} className="scrollbar-hide">
    {products.map((product) => (
      <div key={product._id}>
        <NavLink to={`/products/${product._id}`}>
          <ProductCard product={product} />
        </NavLink>
      </div>
    ))}
  </Slider>
</div>

  );
};

export default NewArrival;
