import React, { useMemo, useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { CARS } from "../../tools/mock-cars";

// import logo from './logo.svg';


function Inventory() {

  const inventory = useMemo(() => {
    let items: JSX.Element[] = [];
    CARS.forEach((item) => {
      items.push(
        <div>
          <img src={item.img} width="100%"
            className="object-cover"
            srcSet={`${item.img}-400 400w,
            ${item.img}-255 255w,
            ${item.img} 800w`}
            >
          </img>
          <p className="font-bold">{item.year} {item.make} {item.model}</p>
        </div>
      )
    })
    return items;
  }, [])

  return (
    <>
      <Navbar />
      <div className="flex flex-col text-white">
        <h1 className="text-xl md:text-6xl font-bold m-5 p-5 border-b-2">Inventory</h1>
        <div className="grid grid-cols-[minmax(30%,_.5fr)_minmax(70%,_1fr)] m-5">
          <div>
            <div className="grid grid-rows-4 mr-4">
              <button className="my-1 px-5 py-3 bg-custom-300 rounded text-left">Year</button>
              <button className="my-1 px-5 py-3 bg-custom-300 rounded text-left">Make</button>
              <button className="my-1 px-5 py-3 bg-custom-300 rounded text-left">Model</button>
              <button className="my-1 px-5 py-3 bg-custom-300 rounded text-left">Body</button>
              <button className="my-1 px-5 py-3 bg-custom-300 rounded text-left">Color</button>
            </div>
          </div>
          <div>
            {inventory}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Inventory;
