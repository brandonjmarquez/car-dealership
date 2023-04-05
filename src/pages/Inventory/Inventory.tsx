import React, { ReactElement, ReactPortal, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useFilter from '../../Hooks/useFilter';
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { CARS } from "../../tools/mock-cars";
import FilteringModal from '../../components/FilteringModal/FilteringModal';
import { createPortal } from 'react-dom';
import './Inventory.css'
import { FaRegTimesCircle } from 'react-icons/fa';

// import logo from './logo.svg';


function Inventory() {
  const [filteringModal, setFilteringModal] = useState<ReactPortal | null>();
  const [removeFilterButtons, setRemoveFilterButtons] = useState<ReactPortal | null>();
  const [filter, setFilter] = useState<{[property: string]: string} | null>(null);
  const filterOpen = useRef<string>();
  const filterOpts = useRef<HTMLDivElement>(null);
  const elem = useRef<Element>();
  const elemId = useRef<string>();
  const filtered = useFilter(filter);
  const inventory = useMemo(() => {
    let items: JSX.Element[] = [];
    let filterKeys: string[];
    if(filter) filterKeys = Object.keys(filter);
    // console.log(filter);
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
      } else if(filterKeys.length > 0) {
        let validItem = true;

        filterKeys.forEach((key) => {
          if(item[key as keyof typeof item] === filter[key] && validItem) {
            validItem = true;
          } else {
            validItem = false;
          }
        });
        if(validItem) {
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
      }
    })
    return items;
  }, [filter])
  const filterButtons = useMemo(() => {
    let buttons: ReactElement[] = [];
    if(filter)
      Object.keys(filter).forEach((property) => {
        buttons.push(
          <button key={property} 
            className="active:bg-custom-400 flex items-center w-max m-1 p-2 bg-custom-200 rounded whitespace-nowrap"
            onClick={() => {
              setFilter((filter) => {
                let state = {...filter};
          
                delete state![property];
                if(Object.keys(state!).length === 0) return null;
                return state;
              });
              console.log(filter);
            }}
          >
            {filter[property]} <FaRegTimesCircle className="inline align-middle" />
          </button>
        );
      })
    return buttons;
  }, [filter]);
  const closeFiltering = useCallback((elem: Element, elemId: string) => {
    setFilteringModal(createPortal(
      <FilteringModal filter={filter} filterOpts={filterOpts} items={CARS} property={elemId} setFilter={setFilter} /> , 
      elem
    ));
  }, [filter])

  useEffect(() => {
    console.log(filter)
    if(elem.current && elemId.current)
      closeFiltering(elem.current, elemId.current)
  }, [filter]);
  
  const filtering = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    elemId.current = ((e.target as HTMLButtonElement).tagName === "BUTTON") ? (e.target as HTMLButtonElement).parentElement!.id : (e.target as HTMLButtonElement).parentElement!.parentElement!.id;
    elem.current = document.getElementById(elemId.current) as Element;
    
    if(document.getElementById("filtering") && elemId.current === filterOpen.current) {
      document.getElementById("filtering")!.classList.toggle('filter-exit')
      setTimeout(() => setFilteringModal(null), 300);
    } else {
      closeFiltering(elem.current, elemId.current);
      filterOpen.current = elemId.current;
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
              {filteringModal}
              {filter ? 
                <div className={`flex `}>
                  <button className="active:bg-custom-400 inline-block w-max m-1 p-2 bg-custom-200 rounded whitespace-nowrap" onClick={() => setFilter(null)}>
                    Reset Filters
                  </button>
                  {filterButtons}
                </div>
               : null}
              <div id="year" className="raise">
                <button className="w-full active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded flex justify-between" onClick={(e) => filtering(e)}><span>Year</span><span>+</span></button>
              </div>
              <div id="make" className="">
                <button className="w-full active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded flex justify-between" onClick={(e) => filtering(e)}><span>Make</span><span>+</span></button>
              </div>
              <div id="model" className="">
                <button className="w-full active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded flex justify-between" onClick={(e) => filtering(e)}><span>Model</span><span>+</span></button>
              </div>
              <div id="body" className="">
                <button className="w-full active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded flex justify-between" onClick={(e) => filtering(e)}><span>Body</span><span>+</span></button>
              </div>
              <div id="color" className="">
                <button className="w-full active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded flex justify-between" onClick={(e) => filtering(e)}><span>Color</span><span>+</span></button>
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
