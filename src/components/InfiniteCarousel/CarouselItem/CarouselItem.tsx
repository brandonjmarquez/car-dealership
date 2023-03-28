import React from "react";
import { Car } from "../../../tools/car";

interface CarouselItemProps {
  item: Car;
}

const CarouselItem = (props: CarouselItemProps) => {
  return ( 
    <div className={`${props.item.id} carousel-item w-[255px] bg-zinc-800 inline-block`}>
      <img src={props.item.img} width="100%"></img>
    </div>
  )
}

export default CarouselItem;