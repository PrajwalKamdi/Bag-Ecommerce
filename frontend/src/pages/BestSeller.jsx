import axios from "axios";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProductCard from "./ProductCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { settings } from "../components/Setting.jsx";
const BestSeller = () => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const api = import.meta.env.VITE_API_BACKEND;
  const handleNewArrival = async () => {
    try {
      const { data } = await axios.get(`${api}products/bestseller`);
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
    <div className="mx-2 my-5">
      <div>
        <h1 className="my-5 lg:my-10 text-xl md:text-4xl font-poppins uppercase font-semibold text-gray-700 text-center">
          Top PIck of the week
        </h1>
      </div>
      <Slider {...settings}>
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

export default BestSeller;
