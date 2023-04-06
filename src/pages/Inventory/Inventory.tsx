/** @jsxImportSource @emotion/react */
import React, { ReactElement, ReactPortal, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useFilter from '../../Hooks/useFilter';
import { css, keyframes } from '@emotion/react';
import queryString, { ParsedQuery } from 'query-string';
import { FaChevronDown, FaChevronUp, FaRegTimesCircle } from 'react-icons/fa';
import { HiOutlineMenu } from 'react-icons/hi';
import { CARS } from "../../tools/mock-cars";
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import FilteringModal from '../../components/FilteringModal/FilteringModal';

function Inventory() {
  const [filteringModal, setFilteringModal] = useState<ReactPortal | null>();
  const [filterDropdown, setFilterDropdown] = useState<ReactPortal | null>();
  const [filter, setFilter] = useState<{[property: string]: string} | null>((window.location.search.substring(1).length > 0) ? JSON.parse(JSON.stringify(queryString.parse(window.location.search.substring(1)))) : null);
  const filterOpen = useRef<string>();
  const filterOpts = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const elem = useRef<Element>();
  const elemId = useRef<string>();
  const filterParams = useFilter(filter);
  
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
    if(items.length === 0) {
      items.push(
        <div>
          <br />
          <p className="font-bold">No cars found matching this query.</p>
        </div>
      )
    }
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

  const dropdownFilter = useCallback(() => {
    setFilterDropdown(createPortal(
      <div ref={filterDropdownRef} css={css`animation: ${dropdown} 300ms ease-in-out forwards;`} id="filter-dropdown" className="flex flex-col self-center w-full absolute origin-top bg-custom-100">
        {filteringModal}
        <div id="year" className="">
          <button className="w-11/12 active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded flex justify-between" onClick={(e) => filtering(e)}><span>Year</span><span>+</span></button>
        </div>
        <div id="make" className="">
          <button className="w-11/12 active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded flex justify-between" onClick={(e) => filtering(e)}><span>Make</span><span>+</span></button>
        </div>
        <div id="model" className="">
          <button className="w-11/12 active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded flex justify-between" onClick={(e) => filtering(e)}><span>Model</span><span>+</span></button>
        </div>
        <div id="body" className="">
          <button className="w-11/12 active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded flex justify-between" onClick={(e) => filtering(e)}><span>Body</span><span>+</span></button>
        </div>
        <div id="color" className="">
          <button className="w-11/12 active:bg-custom-400 m-1 px-5 py-3 bg-custom-300 rounded flex justify-between" onClick={(e) => filtering(e)}><span>Color</span><span>+</span></button>
        </div>
      </div>, document.getElementById("filter-dropdown-container")!))
  }, [filter]);

  useEffect(() => {
    if(elem.current && elemId.current)
      closeFiltering(elem.current, elemId.current)

    if(filterDropdownRef.current) {
      filteringDropdown();
    }
  }, [filter]);
  
  const filtering = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    elemId.current = ((e.target as HTMLButtonElement).tagName === "BUTTON") ? (e.target as HTMLButtonElement).parentElement!.id : (e.target as HTMLButtonElement).parentElement!.parentElement!.id;
    elem.current = document.getElementById(elemId.current) as Element;    
    if(document.getElementById("filtering") && elemId.current === filterOpen.current) {
      document.getElementById("filtering")!.classList.toggle('menu-exit');
      return setTimeout(() => setFilteringModal(null), 300);
    }
    closeFiltering(elem.current, elemId.current);
    filterOpen.current = elemId.current;
  }
  
  const filteringDropdown = () => {
    let elem = document.getElementById("filters-button");
    if(document.getElementById("filter-dropdown-container") && filterDropdownRef.current) {
      if(document.getElementById("filter-dropdown-container")?.children[0] === filterDropdownRef.current) {
        filterDropdownRef.current!.classList.toggle('menu-exit');
        return setTimeout(() => setFilterDropdown(null), 300);
      }
    }
    if(elem) {
      dropdownFilter();
    }
  }
  
  const dropdown = keyframes`
   0% {
        transform: rotateX(-90deg)
    }
    70% {
        transform: rotateX(20deg) 
    }
    100% {
        transform: rotateX(0deg) 
    }
  `;

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
      <style type="text/css">
        {`
          #small-filter {
            top: ${document.getElementById("navbar")?.offsetHeight}px;
          }
        `}
      </style>
      <Navbar />
      <div className="flex flex-col text-white">
        <h1 className="text-3xl md:text-6xl font-bold m-5 p-5 border-b-2 whitespace-nowrap">Inventory</h1>
        <div className="flex flex-col sm:grid sm:grid-rows-none sm:grid-cols-[minmax(30%,_.5fr)_minmax(70%,_1fr)] m-5">
          <div id="small-filter" className="flex flex-col sm:hidden sticky bg-custom-100">
            <button id="filters-button" className="flex justify-between text-3xl items-center" onClick={() => filteringDropdown()}>
              <span className="flex items-center"><HiOutlineMenu className="inline" /> Filters</span>{(filterDropdown) ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {filter &&
            <div className="flex">
              <button className="active:bg-custom-400 inline-block w-max m-1 p-2 bg-custom-200 rounded whitespace-nowrap" onClick={() => setFilter(null)}>
                Reset Filters
              </button>
              {filterButtons}
            </div>}
            <div id="filter-dropdown-container">

            </div>
            {filterDropdown}
          </div>
          <div id="big-filter" className="hidden sm:block sm:sticky top-48">
            <div className="flex flex-col mr-4">
              {filteringModal}
              {filter ? 
                <div className="flex">
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
          <div id="car-inventory" className="mt-6">
            {inventory}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Inventory;
