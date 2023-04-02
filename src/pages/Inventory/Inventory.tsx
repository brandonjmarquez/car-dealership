import React, { ReactPortal, useEffect, useMemo, useRef, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { CARS } from "../../tools/mock-cars";
import FilteringModal from '../../components/FilteringModal/FilteringModal';
import { createPortal } from 'react-dom';

// import logo from './logo.svg';


function Inventory() {
  const [sortingModal, setSortingModal] = useState<ReactPortal | null>();
  const [filter, setFilter] = useState<{property: string, value: string} | null>(null);
  const filtered = useRef('');
  const inventory = useMemo(() => {
    let items: JSX.Element[] = [];
    CARS.forEach((item) => {
      if(!filter) {
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
      } else if(item[filter.property as keyof typeof item] === filter.value) {
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
      }
    })
    return items;
  }, [filter])
  
  const sorting = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let elemId = ((e.target as HTMLButtonElement).tagName === "BUTTON") ? (e.target as HTMLButtonElement).parentElement!.id : (e.target as HTMLButtonElement).parentElement!.parentElement!.id;
    let elem = document.getElementById(elemId) as Element;

    if(document.getElementById("filtering") && elemId === filtered.current) {
      setSortingModal(null);
    } else {
      const closeSorting = () => {
        setSortingModal(createPortal(
          <FilteringModal items={CARS} property={elemId} setFilter={setFilter} /> , 
          elem
        ));
      }
      
      closeSorting();
      filtered.current = elemId;
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col text-white">
        <h1 className="text-3xl md:text-6xl font-bold m-5 p-5 border-b-2 whitespace-nowrap">Inventory</h1>
        <div className="grid grid-rows-2 sm:grid-cols-[minmax(30%,_.5fr)_minmax(70%,_1fr)] m-5">
          <div className="">
            <div className="flex flex-col grid-cols-5 sm:grid-rows-5 sm:grid-cols-none mr-4">
              {filter !== null ? 
                <button className="self-center w-max p-2 bg-custom-200 rounded" onClick={() => setFilter(null)}>
                  Reset Filters
                </button>
               : null}
              <div id="year">
                <button className="w-full active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded flex justify-between" onClick={(e) => sorting(e)}><span>Year</span><span>+</span></button>
                {sortingModal}
              </div>
              <div id="make">
                <button className="w-full active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded flex justify-between" onClick={(e) => sorting(e)}><span>Make</span><span>+</span></button>
              </div>
              <div id="model">
                <button className="w-full active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded flex justify-between" onClick={(e) => sorting(e)}><span>Model</span><span>+</span></button>
              </div>
              <div id="body">
                <button className="w-full active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded flex justify-between" onClick={(e) => sorting(e)}><span>Body</span><span>+</span></button>
              </div>
              <div id="color">
                <button className="w-full active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded flex justify-between" onClick={(e) => sorting(e)}><span>Color</span><span>+</span></button>
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
