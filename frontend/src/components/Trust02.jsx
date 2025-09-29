import { Shield, Star, Truck } from "lucide-react";
import React from "react";

const features = [
  {
    id: 1,
    title: "Fast Shipping",
    description:
      "Get your order delivered within 2-3 business days with our express shipping service.",
    icon: <Truck className="text-white" size={24} />,
    bg: "from-blue-50 to-blue-100",
    iconBg: "bg-blue-500",
  },
  {
    id: 2,
    title: "Warranty",
    description:
      "Comes with 1-year manufacturer warranty covering all defects and malfunctions.",
    icon: <Shield className="text-white" size={24} />,
    bg: "from-green-50 to-green-100",
    iconBg: "bg-green-500",
  },
  {
    id: 3,
    title: "Premium Quality",
    description:
      "Made with high-quality materials and tested for durability and performance.",
    icon: <Star className="text-white" size={24} />,
    bg: "from-purple-50 to-purple-100",
    iconBg: "bg-purple-500",
  },
];

const Trust02 = () => {
  return (
    <div className="mt-8 bg-white rounded-3xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Why Choose Our Products?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`text-center p-6 bg-gradient-to-br ${feature.bg} rounded-2xl`}
          >
            <div
              className={`w-16 h-16 ${feature.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}
            >
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trust02;