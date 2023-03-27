import React from "react";
import { FaCar, FaSearch } from 'react-icons/fa'

const Navbar = () => {
  return (
    <>
      <div id='topbar' className="px-9 py-2 bg-red-600 text-right">topbar works!</div>
      <nav id="navbar" className="sticky top-0">
        <div className="py-2 bg-neutral-800 w-full text-white z-50 shadow-md">
          <div className="grid grid-cols-2">
            <div className="flex items-center mx-7 my-1">
              <FaCar className="text-6xl inline-block py-3" />
              <h1 className="inline-block text-6xl font-bold">Mock Motors</h1>
            </div>
            <div className="flex items-center justify-end">
              <a id="home" className="px-4 py-3">Home</a>
              <a id="inventory" className="px-4 py-3">Inventory</a>
              <a id="about-us" className="px-4 py-3">About Us</a>
              <a id="contact-us"className="px-4 py-3">Contact Us</a>
              <input type="input" className="ml-4"></input>
              <FaSearch className="text-xl float-right mx-2" />
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;