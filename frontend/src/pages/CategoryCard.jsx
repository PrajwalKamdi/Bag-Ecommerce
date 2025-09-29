import { NavLink } from "react-router-dom";

export default function CategoryCard({ category }) {
  const { name, description, image } = category;

  return (
    <div className="my-2 flex flex-col border border-gray-200  rounded-sm  transition-shadow duration-300 overflow-hidden">
      {/* Category Image */}
      {/* products/category */}
      <NavLink
        to={`/products?category=${name}`}
        className="flex flex-col h-full"
      >
        <div className="aspect-square overflow-hidden flex items-center justify-center">
          <img
            src={image}
            alt={name}
            className=" bg-gray-200 object-cover object-center hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Category Info */}
      </NavLink>
      <div className="p-3 flex-col">
        <h3 className="text-sm lg:text-base font-semibold text-gray-800 mb-1 truncate font-poppins">
          {name}
        </h3>
        {/* <p className="hidden line-clamp-1 lg:block text-xs  text-gray-600 ">
            {description}
          </p> */}
      </div>
    </div>
  );
}
