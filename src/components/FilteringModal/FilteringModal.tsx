import React, { ReactElement, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Car } from "../../tools/car";

interface SortingModalProps {
  items: Car[];
  property: string;
  setFilter: Function;
}

const FilteringModal = (props: SortingModalProps) => {
  const [properties, setProperties] = useState<Set<string>>(new Set());
  const propertiesDropdown = useMemo(() => {
    let propertyOpts: ReactElement[] = [];

    properties.forEach((property) => {
      propertyOpts.push(
        <button key={property} 
          className="block w-full bg-custom-400 text-custom-100 text-left border border-custom-100 rounded" 
          onClick={(e) => props.setFilter({property: props.property, value: (e.target as Element).innerHTML})}
        ><span className="pl-1">{property}</span></button>
      )
    });

    return propertyOpts;
  }, [properties])

  useLayoutEffect(() => {
    const getProperties = () => {
      let tempProperties = new Set<string>();
      props.items.forEach((item: Car) => {
        tempProperties.add(item[props.property as keyof Car].toString())
        // console.log(item[props.property as keyof Car])
      });
      return tempProperties
    }
    setProperties(getProperties())
  }, []);
  

  return (
    <div id="filtering" className=" ml-10">{propertiesDropdown}</div>
  )
}

export default FilteringModal;