import React, { useMemo, useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { CARS } from "../../tools/mock-cars";
import SortingModal from '../../components/SortingModal/SortingModal';

// import logo from './logo.svg';


function Inventory() {
  const inventory = useMemo(() => {
    let items: JSX.Element[] = [];
    CARS.forEach((item) => {
      items.push(
        <div key={`${item.year}${item.make}${item.model}${item.id}`}>
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
  
  const sorting = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // const closeCarInfo = () => {
    //   setInfoModal(createPortal(
    //     <SortingModal /> , 
        
    //   ))
    // }
    console.log((e.target as HTMLButtonElement).parentElement!.id);
    // closeCarInfo();
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col text-white">
        <h1 className="text-3xl md:text-6xl font-bold m-5 p-5 border-b-2 whitespace-nowrap">Inventory</h1>
        <div className="grid grid-rows-2 sm:grid-cols-[minmax(30%,_.5fr)_minmax(70%,_1fr)] m-5">
          <div className="">
            <div className="grid grid-cols-5 sm:grid-rows-5 sm:grid-cols-none mr-4">
              <div id="year">
                <button className="w-full active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded text-left" onClick={(e) => sorting(e)}>Year</button>
              </div>
              <div id="make">
                <button className="w-full active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded text-left" onClick={(e) => sorting(e)}>Make</button>
              </div>
              <div id="model">
                <button className="w-full active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded text-left" onClick={(e) => sorting(e)}>Model</button>
              </div>
              <div id="body">
                <button className="w-full active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded text-left" onClick={(e) => sorting(e)}>Body</button>
              </div>
              <div id="color">
                <button className="w-full active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded text-left" onClick={(e) => sorting(e)}>Color</button>
              </div>
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
