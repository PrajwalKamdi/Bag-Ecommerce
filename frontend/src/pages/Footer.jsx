import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">V E L O R A</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your one-stop destination for trendy fashion, stylish accessories, 
            and premium quality products. Shop smart, shop with confidence.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white">Women’s Bags</a></li>
            <li><a href="#" className="hover:text-white">Men’s Accessories</a></li>
            <li><a href="#" className="hover:text-white">Shoes</a></li>
            <li><a href="#" className="hover:text-white">Watches</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
            <li><a href="#" className="hover:text-white">FAQs</a></li>
            <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <p className="text-gray-400 text-sm mb-3">
            Subscribe to our newsletter for latest updates & offers.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-lg text-black focus:outline-none"
            />
            <button className="bg-white text-black px-4 py-2 rounded-r-lg font-medium hover:bg-gray-200">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between px-6">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} VELORA. All Rights Reserved.
        </p>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-white hover:text-black">
            <Facebook size={18} />
          </a>
          <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-white hover:text-black">
            <Instagram size={18} />
          </a>
          <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-white hover:text-black">
            <Twitter size={18} />
          </a>
          <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-white hover:text-black">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
