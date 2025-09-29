import { useEffect, useState } from "react";
import BannerM from "../assets/BannerM.png"; // For screens < 600px
import hero02 from "../assets/hero02.jpg"; // For screens >= 1200px
import { NavLink } from "react-router-dom";
// import BannerL from "../assets/BannerL.jpg"; // NEW: Add a mid-size banner for better design control

// NOTE: You will need to create and import a new image file, BannerL.jpg,
// for screens between 600px and 1200px.

export default function Hero() {
  // 1. Update getImageByWidth to include a proper mid-range image
  function getImageByWidth(width) {
    if (width < 600) return BannerM;
    // if (width < 1200) return BannerL; // Use a dedicated image for tablets/mid-size
    return hero02;
  }

  const [imageSrc, setImageSrc] = useState(getImageByWidth(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setImageSrc(getImageByWidth(window.innerWidth));
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    // 2. Enhance the main section with better positioning and height control
    <section className="relative w-full h-[90vh] md:h-[65vh] lg:h-[80vh] overflow-hidden">
      <img
        src={imageSrc}
        alt="Collection of Stylish Handbags"
        // 3. Ensure the image covers the section height and width perfectly
        className="object-cover h-full w-full"
      />

      {/* 4. Upgrade the content container positioning and styling */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4  bg-opacity-25 md:bg-opacity-0">
        {/* 5. Modern Typography and Color (White for contrast) */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl uppercase font-extrabold font-poppins text-gray-700/90 md:text-white/80 tracking-wider mb-4 drop-shadow-lg">
          Carry Your Style Everywhere
        </h1>

        <p className="text-sm sm:text-base lg:text-xl font-poppins  text-white max-w-lg mx-auto mb-8 drop-shadow-md">
          Explore our exclusive collection of bags crafted for fashion and
          functionality. Find your perfect match today.
        </p>

        {/* 6. Stylish Button */}
        <NavLink to={"/products"}>
          <button
            className="
            px-8 py-3 
            bg-white text-black 
            uppercase font-semibold text-sm 
            border-2 border-white 
            tracking-widest 
            transition duration-300 
            hover:bg-transparent hover:text-white hover:shadow-xl
          "
          >
            Explore Collection
          </button>
        </NavLink>
      </div>
    </section>
  );
}
