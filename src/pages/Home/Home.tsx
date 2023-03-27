import React from "react";
import InfiniteCarousel from '../../components/InfiniteCarousel/InfiniteCarousel'
import { FaCar, FaPhone, FaSearch } from "react-icons/fa";
import { CARS } from "../../tools/mock-cars";

const Home = () => {
  return (
    <div className="">
      <div className="flex flex-col justify-center text-white bg-[url('https://dcdws.blob.core.windows.net/dws-6613301-13069-media/2020/04/about-section.jpg?id=2271')]">
        <h1 className="text-6xl font-bold text-center pt-3">
          Mock Motors
          <br></br>
          Car Dealership
        </h1>
        <div className="w-full flex justify-evenly text-yellow-400 my-5">
          <div className="text-center">
            <a>
              <FaSearch className="text-7xl block" />
              <span className="text-lg">Car Finder</span>
            </a>
          </div>
          <div className="text-center">
            <a>
              <FaCar className="text-7xl block" />
              <span className="text-lg">Inventory</span>
            </a>
          </div>
          <div className="text-center">
            <a>
              <FaPhone className="text-7xl block" />
              <span className="text-lg">Contact Us</span>
            </a>
          </div>
        </div>
        <div className="mx-20">
          <p className="text-center text-2xl">Custom Motor Group Co. is a local Pflugerville car dealer, specializing in selling used cars. Our address is 405 FM 685, Pflugerville, TX, 78660, down the road from downtown Pflugerville, and right past the HEB.</p>
          <p className="text-center text-xl">Our selection of used cars is constantly changing, so take a look at our inventory to see what we have for sale.</p>
          <p className="text-center text-lg">Call us with any questions about our vehicles, or to inquire about a test drive. Our hours are 9am-5:30pm Monday-Friday, and 10am-4pm Saturday. Pick anytime in there and call us and we’ll get you scheduled for an appointment.
            <br></br>
            Check out our inventory and reviews on:
          </p>
        </div>
      </div>
      <InfiniteCarousel items={CARS} />
    </div>
  )
}

export default Home;