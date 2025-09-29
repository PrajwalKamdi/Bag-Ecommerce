import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import LoadingSkeleton from "../components/LoadingSkeleton";
// import { settings } from "../components/setting";
import CategoryCard from "./CategoryCard";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const url = import.meta.env.VITE_API_BACKEND;
  const handleApi = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}categories`);
      setCategories(data.categories);
    } catch (error) {
      setErr(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleApi();
  }, []);
  if (loading) {
    return <LoadingSkeleton />;
  }
  if (err) {
    return (
      <div className="text-center min-h-1/2">
        <h1 className="text-red-500 text-3xl">{err}</h1>
      </div>
    );
  }
  return (
    <div className="mx-2">
      <h2 className="my-5 lg:my-10 text-2xl  lg:text-4xl text-center font-poppins  uppercase mt-2 font-semibold text-gray-800">
        Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center items-center gap-2 md:gap-6 mb-2  bg-white  rounded-md">
        {categories.map((cat, idx) => (
          <CategoryCard category={cat} key={idx} />
        ))}
      </div>
      {/* <Slider {...settings} className="mt-6 relative scrollbar-hide mb-6"> */}
      {/* {categories.map((cat, idx) => (
          <CategoryCard category={cat} key={idx} />
        ))} */}
      {/* </Slider> */}
    </div>
  );
};

export default Categories;
