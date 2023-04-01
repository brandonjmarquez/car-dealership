/** @jsxImportSource @emotion/react */
import React, { ReactPortal, useLayoutEffect, useRef, useState } from "react";
import { css, keyframes } from "@emotion/react";
import { Car } from "../../tools/car";
import { createPortal } from "react-dom";
import ItemInfoModal from "../../ItemInfoModal/ItemInfoModal";

interface FlashingItemProps {
  items: Car[]
}

const FlashingItem = (props: FlashingItemProps) => {
  const [itemIndex, setItemIndex] = useState<number>(0);
  const [infoModal, setInfoModal] = useState<ReactPortal | null>();
  const flasherRef = useRef<HTMLDivElement>(null);
  const intervalRef =  useRef<number>();

  useLayoutEffect(() => {
    if(intervalRef.current) 
    clearInterval(intervalRef.current)
    
    // flasherRef.current!.style.animationPlayState = 'paused';
    intervalRef.current = window.setTimeout(() => {
      
      if(flasherRef.current)
      if(itemIndex === props.items.length - 1) {
        resetAnimation(flasherRef.current)
        setItemIndex(0);
      } else {
        resetAnimation(flasherRef.current)
        setItemIndex(itemIndex + 1);
      }
    }, 2000)
    
    
  }, [itemIndex]);
  
  const carInfo = () => {
    const closeCarInfo = () => {
      setInfoModal(createPortal(
        <ItemInfoModal item={props.items[itemIndex]} setInfoModal={setInfoModal} /> , 
        document.body
      ))
    }

    closeCarInfo();
  }

  const resetAnimation= (elem: HTMLDivElement) => {
    let animationClass = Object.values(elem.classList)[0];

    elem.classList.remove(animationClass);
    void elem.offsetHeight; /* trigger reflow */
    elem.classList.add(animationClass); 
  }

  const fade = keyframes`
    from, to {
      opacity: 0;
    }

    10% {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    90% {
      opacity: 0;
    }

    100% {
      opacity: 0;
    }
  `

  return ( 
    <>
      <div ref={flasherRef}
        css={css`
          animation: ${fade} 2s infinite;
        `}
      >
        {infoModal}
        <div id={`popper`} className={`popper sm:w-[400px] sm:h-[305px] flex`}>
          <img src={props.items[itemIndex].img} 
            width="100%"
            className="object-scale-down"
            srcSet={`${props.items[itemIndex].img}-400 400w,
                     ${props.items[itemIndex].img}-255 255w,
                     ${props.items[itemIndex].img} 800w`}
            onClick={() => carInfo()}
          >
          </img>
        </div>
      </div>
    </>
  )
}

export default FlashingItem;