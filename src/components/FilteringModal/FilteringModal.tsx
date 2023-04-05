/** @jsxImportSource @emotion/react */
import React, { ReactElement, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Car } from "../../tools/car";
import { css, keyframes } from "@emotion/react";
import queryString from "query-string";
import useFilter from "../../Hooks/useFilter";
import { parse } from "query-string/base";

interface SortingModalProps {
  filter: {[property: string]: string} | null;
  filterOpts: React.RefObject<HTMLDivElement>;
  items: Car[];
  property: string;
  setFilter: Function;
}

const FilteringModal = (props: SortingModalProps) => {
  const [properties, setProperties] = useState<Set<string>>(new Set());
  const filtered = useFilter();
  const propertiesDropdown = useMemo(() => {
    let propertyOpts: ReactElement[] = [];
    let sortedProperties = Array.from(properties).sort();

    sortedProperties.forEach((property) => {
      propertyOpts.push(
        <button key={property} 
          className="active:bg-custom-300 block w-full bg-custom-400 text-custom-100 text-left border border-custom-100 rounded" 
          onClick={(e) => props.setFilter({...props.filter, [props.property]: ((e.target as Element).tagName == "SPAN") ? (e.target as Element).innerHTML : (e.target as Element).children[0]?.innerHTML})}
        ><span className="pl-1">{property}</span></button>
      )
    });

    return propertyOpts;
  }, [properties, filtered]);

  useLayoutEffect(() => {
    const getProperties = () => {
      const parsedParams = queryString ? queryString.parse(filtered) : {};
      const paramKeys = Object.keys(parsedParams);
      let tempProperties = new Set<string>();
      
      props.items.forEach((item: Car) => {
        if(parsedParams[props.property]) {
          if(parsedParams[props.property] === item[props.property as keyof Car])
            tempProperties.add(item[props.property as keyof Car].toString())
        } else if(paramKeys.length > 0) {
          let validProperty = true;
          paramKeys.forEach((key) => {
            if(item[key as keyof Car] === parsedParams[key] && validProperty) {
              validProperty = true
            } else {
              validProperty = false;
            }
          });
          if(validProperty) {
            tempProperties.add(item[props.property as keyof Car].toString());
          }
        } else {
          tempProperties.add(item[props.property as keyof Car].toString())
        }
      });
      return tempProperties
    }

    setProperties(getProperties())
  }, [filtered, props.filter]);
  
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
  `

  return (
    <div ref={props.filterOpts} css={css`animation: ${dropdown} 300ms ease-in-out forwards;`} id="filtering" className=" ml-10 origin-top">{propertiesDropdown}</div>
  )
}

export default FilteringModal;