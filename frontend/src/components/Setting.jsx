import { ArrowLeft, ArrowRight } from "lucide-react";

// Custom Previous Button
export const CustomPrev = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="hidden md:block absolute left-3 top-1/2 -translate-y-1/2 z-10 
                 bg-white/80 hover:bg-white p-2 rounded-full shadow-md 
                 transition duration-200"
    >
      <ArrowLeft className="text-black" size={20} />
    </button>
  );
};

// Custom Next Button
export const CustomNext = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="hidden md:block absolute right-3 top-1/2 -translate-y-1/2 z-10 
                 bg-white/80 hover:bg-white p-2 rounded-full shadow-md 
                 transition duration-200"
    >
      <ArrowRight className="text-black" size={20} />
    </button>
  );
};

// Slider Settings
export const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  nextArrow: <CustomNext />,
  prevArrow: <CustomPrev />,
  responsive: [
    {
      breakpoint: 1024, // desktop
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768, // tablet
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480, // mobile
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};
