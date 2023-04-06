import { ParsedQuery } from "query-string";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const CarFinder = () => {
  const inputsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const goToResults = () => {
    let params: {[param: string]: string} = {};

    if(inputsRef.current) {
      const children = inputsRef.current.children;

      for(var i = 0; i < children.length; i++) {
        if(children[i].tagName === "INPUT") {
          const id = children[i].id;
          if((children[i] as HTMLInputElement).value.length > 0)
            params[id.replace(id.substring(id.indexOf("-")), "")] = (children[i] as HTMLInputElement).value;
        }
      }
      console.log(params)
    }


    navigate({pathname: "/inventory", search: queryString.stringify(params)})
  }

  return (
    <>
      <Navbar />
        <h1 className="text-3xl md:text-6xl font-bold m-5 p-5 border-b-2 text-white whitespace-nowrap">Car Finder</h1>
      <div className="flex flex-col mx-20 text-white">
        <div ref={inputsRef} id="car-finder-inputs" className="flex flex-col self-center w-full sm:w-1/2 text-black">
          <label htmlFor="year-input" className="text-white">Year</label>
          <input type="text" id="year-input" />
          <label htmlFor="make-input" className="text-white">Make</label>
          <input type="text" id="make-input" />
          <label htmlFor="model-input" className="text-white">Model</label>
          <input type="text" id="model-input" />
          <label htmlFor="body-input" className="text-white">Body</label>
          <input type="text" id="body-input" />
          <label htmlFor="color-input" className="text-white">Color</label>
          <input type="text" id="color-input" />
        </div>

        <button className="self-center my-4 bg-custom-200 w-full sm:w-1/4" onClick={goToResults}>Search</button>
      </div>
      <Footer />
    </>
  );
}

export default CarFinder;