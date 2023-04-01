import React from "react";
import InfiniteCarousel from '../../components/InfiniteCarousel/InfiniteCarousel'
import { FaCar, FaPhone, FaSearch } from "react-icons/fa";
import { CARS } from "../../tools/mock-cars";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FlashingItem from "../../components/FlashingItem/FlashingItem";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="">
        
        <div className="flex flex-col justify-center text-white bg-custom-100 bg-cover bg-blend-multiply bg-[url('https://plus.unsplash.com/premium_photo-1674512540096-46b2ca19ef96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3133&q=80')]">
          
          <h1 className="text-xl md:text-6xl font-bold text-center pt-3 overflow-hidden">
            Mock Motors
            <br></br>
            Car Dealership
          </h1>
          <div className='flex flex-col-reverse items-center'>
            <div className="flex flex-col sm:flex-row justify-around text-custom-400 my-5 w-full">
              <div className="flex justify-center ">
                <a href="about-us">
                  <FaSearch className="text-5xl md:text-7xl block m-auto" />
                  <span className="text-lg">Car Finder</span>
                </a>
              </div>
              <div className="flex justify-center">
                <a href="inventory">
                  <FaCar className="text-5xl md:text-7xl block m-auto" />
                  <span className="text-lg">Inventory</span>
                </a>
              </div>
              <div className="flex justify-center">
                <a href="contact-us">
                  <FaPhone className="text-5xl md:text-7xl block m-auto" />
                  <span className="text-lg">Contact Us</span>
                </a>
              </div>
            </div>
            <div className='w-3/4 sm:w-1/2 flex justify-center items-center'>
              <FlashingItem items={CARS} />
            </div>
          </div>
          <div className="mx-1 lg:mx-20">
            
          </div>
        </div>
        <InfiniteCarousel items={CARS} />
      </div>
      <Footer />
    </>
  )
}

export default Home;