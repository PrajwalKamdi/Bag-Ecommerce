import { Box, IndianRupee, RotateCcw, Shield, Truck } from 'lucide-react';
import React from 'react';

const trustItems = [
  {
    icon: <Truck color="white" size={22} />,
    bgIcon: 'bg-blue-600',
    bgCard: 'bg-blue-50',
    title: 'Free Delivery',
    desc: (
      <span className="flex items-center justify-center sm:justify-start gap-1">
        On orders above 499
      </span>
    ),
  },
  {
    icon: <RotateCcw color="white" size={22} />,
    bgIcon: 'bg-green-600',
    bgCard: 'bg-green-50',
    title: 'Easy Return',
    desc: '7-day return policy',
  },
  {
    icon: <Shield color="white" size={22} />,
    bgIcon: 'bg-purple-600',
    bgCard: 'bg-purple-50',
    title: 'Secure Payment',
    desc: '100% secure checkout',
  },
  {
    icon: <Box color="white" size={22} />,
    bgIcon: 'bg-orange-600',
    bgCard: 'bg-orange-50',
    title: 'Quality Assured',
    desc: 'Premium products',
  },
];

const Trust01 = () => {
  return (
    <div className="w-full px-3 sm:px-6 py-6 sm:py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {trustItems.map((item, idx) => (
          <div
            key={idx}
            className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-3 sm:p-5 ${item.bgCard} 
              rounded-xl shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300`}
          >
            {/* Icon container */}
            <div
              className={`${item.bgIcon} p-2 sm:p-3 rounded-full shadow-sm flex items-center justify-center`}
            >
              {item.icon}
            </div>

            {/* Text */}
            <div className="text-center sm:text-left">
              <p className="font-semibold text-sm sm:text-base lg:text-lg text-gray-800 mb-0.5">
                {item.title}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trust01;