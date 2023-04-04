import React, { ReactPortal, useEffect, useMemo, useRef, useState } from 'react';
import useFilter from '../../Hooks/useFilter';
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { CARS } from "../../tools/mock-cars";
import FilteringModal from '../../components/FilteringModal/FilteringModal';
import { createPortal } from 'react-dom';
import './Inventory.css'

// import logo from './logo.svg';


function Inventory() {
  const [sortingModal, setSortingModal] = useState<ReactPortal | null>();
  const [filter, setFilter] = useState<{[property: string]: string} | null>(null);
  const filterOpen = useRef('');
  const filterOpts = useRef<HTMLDivElement>(null);
  const filtered = useFilter(filter);
  const inventory = useMemo(() => {
    let items: JSX.Element[] = [];
    let filterKeys: string[];
    if(filter) filterKeys = Object.keys(filter);

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
      } else if(item[filterKeys[0] as keyof typeof item] === filter[filterKeys[0]]) {
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
    
    if(document.getElementById("filtering") && elemId === filterOpen.current) {
      document.getElementById("filtering")!.classList.toggle('filter-exit')
      setTimeout(() => setSortingModal(null), 300);
    } else {
      const closeSorting = () => {
        setSortingModal(createPortal(
          <FilteringModal filtered={filtered} filterOpts={filterOpts} items={CARS} property={elemId} setFilter={setFilter} /> , 
          elem
        ));
        // if(document.getElementById(elemId)?.nextElementSibling) {
        //   console.log(document.getElementById(elemId)?.nextElementSibling)
        //   document.getElementById(elemId)?.nextElementSibling?.classList.toggle('filter-container-move')
        // }
      }
      
      closeSorting();
      filterOpen.current = elemId;
    }
  }

  return (
    <>
      {filterOpts.current && <style type="text/css">
        {`
          @keyframes lift {
            0% {
              transform: translateY(${filterOpts.current.offsetHeight}px);
            }
            80% {
              transform: translateY(25px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          div#${filterOpts.current.parentElement?.id} ~ div {
            animation: lift 100ms ease-in-out forwards;
          }
        `}
      </style>}
      <Navbar />
      <div className="flex flex-col text-white">
        <h1 className="text-3xl md:text-6xl font-bold m-5 p-5 border-b-2 whitespace-nowrap">Inventory</h1>
        <div className="grid grid-rows-2 sm:grid-rows-none sm:grid-cols-[minmax(30%,_.5fr)_minmax(70%,_1fr)] m-5">
          <div className="sticky top-48">
            <div className="flex flex-col mr-4">
              {sortingModal}
              {filter ? 
                <button className="self-center w-max p-2 bg-custom-200 rounded" onClick={() => setFilter(null)}>
                  Reset Filters
                </button>
               : null}
              <div id="year" className="raise">
                <button className="w-full active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded flex justify-between" onClick={(e) => sorting(e)}><span>Year</span><span>+</span></button>
              </div>
              <div id="make" className="">
                <button className="w-full active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded flex justify-between" onClick={(e) => sorting(e)}><span>Make</span><span>+</span></button>
              </div>
              <div id="model" className="">
                <button className="w-full active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded flex justify-between" onClick={(e) => sorting(e)}><span>Model</span><span>+</span></button>
              </div>
              <div id="body" className="">
                <button className="w-full active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded flex justify-between" onClick={(e) => sorting(e)}><span>Body</span><span>+</span></button>
              </div>
              <div id="color" className="">
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
