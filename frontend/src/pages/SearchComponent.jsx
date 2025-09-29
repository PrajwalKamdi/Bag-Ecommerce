import axios from "axios";
import { Loader } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ProductCard from "./ProductCard";
import ZeroSearch from "../assets/ZeroSearch.png";
const SearchComponent = () => {
  const api = import.meta.env.VITE_API_BACKEND;
  console.log(api);
  const [searchParams, setSearchParams] = useSearchParams();
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const q = searchParams.get("q");
  const handleApi = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${api}products/search?q=${q}`);
      setProducts(data.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, [q]);
  useEffect(() => {
    handleApi();
  }, [handleApi]);
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    );
  }
  if (product.length == 0) {
    return (
      <div className="max-h-screen flex flex-col justify-center items-center py-10">
        <p className="text-center md:text-xl  my-2 text-gray-600">
          We couldn't find any matches for {q} !{" "}
        </p>
        <div className="">
          <img src={ZeroSearch} alt="" className="h-[380px] w-[350px] md:h-[500px] md:w-[700px]" />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen py-5 px-5">
      <p className="text-center my-2 text-gray-600">
        home/Search Results for {q}{" "}
      </p>
      <h1 className="text-lg font-poppins text-gray-600 my-2">
        Showing results for {q} - {product.length} items
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {product.map((item) => (
          <div className="">
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
