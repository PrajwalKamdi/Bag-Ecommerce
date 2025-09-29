import { IndianRupee } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Total = ({price}) => {
  return (
   <div className="mt-10 flex flex-col bg-white p-10 rounded-lg shadow-lg">
        <p className="my-2 font-semibold">
          <span className="text-2xl">CART_</span>{" "}
          <span className="text-2xl text-gray-600">TOTAL</span>
        </p>

        <div className="mt-2 font-normal">
          <div className="flex justify-between">
            <p className="my-2 ">Subtotal</p>
            <p className="flex items-center">
              <IndianRupee size={15} />
              {price}
            </p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p className="my-2 font">Shipping Fee</p>
            <p className="flex items-center">
              <IndianRupee size={15} /> 0
            </p>
          </div>

          <hr />
          <div className="flex justify-between">
            <p className="my-2 font-semibold">Total</p>
            <p className="flex items-center font-bold text-xl">
              <IndianRupee size={15} />
              {price}
            </p>
          </div>
          <div className="mt-4">
            <NavLink to={{pathname:"/checkout", state:price}}>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 hover:cursor-pointer" onClick={() => {
                localStorage.setItem("totalPrice", price);
              }}>
                Proceed to Checkout
              </button>
            </NavLink>
          </div>
        </div>
      </div>
  )
}

export default Total