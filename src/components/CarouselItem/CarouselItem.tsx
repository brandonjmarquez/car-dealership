/** @jsxImportSource @emotion/react */
import React, { ReactPortal, useState } from "react";
import { createPortal } from "react-dom";
import { Car } from "../../tools/car";
import { css, keyframes } from "@emotion/react";
import ItemInfoModal from "../../ItemInfoModal/ItemInfoModal";

interface CarouselItemProps {
  item: Car;
  className: string;
  handleMouseLeave: Function;
}

const CarouselItem = (props: CarouselItemProps) => {
  const [infoModal, setInfoModal] = useState<ReactPortal | null>();

  const carInfo = () => {
    props.handleMouseLeave()
    const closeCarInfo = () => {
      setInfoModal(createPortal(
        <ItemInfoModal item={props.item} setInfoModal={setInfoModal} /> , 
        document.body
      ))
    }

    closeCarInfo();
  }

  return ( 
    <div id={`${props.item.id + props.className}`} 
      className={`${props.className} w-[255px] inline-block`}
    >
      {infoModal}
        <img src={props.item.img} width="100%" onClick={() => carInfo()}
          className="object-cover"
          srcSet={`${props.item.img}-400 400w,
                   ${props.item.img}-255 255w,
                   ${props.item.img} 800w`}
          >
        </img>
    </div>
  )
}

export default CarouselItem;