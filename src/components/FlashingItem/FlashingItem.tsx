/** @jsxImportSource @emotion/react */
import React, { ReactElement, ReactPortal, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { css, keyframes } from "@emotion/react";
import { Car } from "../../tools/car";
import { createPortal } from "react-dom";
import ItemInfoModal from "../ItemInfoModal/ItemInfoModal";

interface FlashingItemProps {
  items: Car[]
}

const FlashingItem = (props: FlashingItemProps) => {
  const [itemIndex, setItemIndex] = useState<number>(0);
  const [infoModal, setInfoModal] = useState<ReactPortal | null>();
  const flasherRef = useRef<HTMLDivElement>(null);
  const intervalRef =  useRef<number>();
  const translateAmt = useRef<number>(0);
  const widthAmt = useRef<number>(400);

  const flasher = useMemo(() => {
    return props.items.map((item) => {
      return <img src={item.img} 
            width="100%"
            className="object-scale-down"
            srcSet={`${item.img}-400 400w,
                     ${item.img}-255 255w,
                     ${item.img} 800w`}
            onClick={() => carInfo()}
          >
          </img>
    })
  },[])

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

  useLayoutEffect(() => {
    if(itemIndex === props.items.length || itemIndex == 0) {
      translateAmt.current = 0;
    } else {
      translateAmt.current = translateAmt.current + (document.getElementById("popper")?.children[itemIndex - 1].clientWidth)!;
    }

    if(itemIndex !== 0) {
      widthAmt.current = document.getElementById("popper")?.children[itemIndex].clientWidth!;
    } else {
      widthAmt.current = 400;
    }
    console.log(itemIndex)
    console.log(translateAmt.current)
    console.log(widthAmt.current)
  }, [itemIndex])
  
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
      <style>
        {`
          #flasher {
            width: ${widthAmt.current}px;
            overflow: hidden;
          }
          .popper {
            transform: translate(-${translateAmt.current}px)
          }
        `}
      </style>
      <div ref={flasherRef}
        css={css`
          animation: ${fade} 2s infinite;
        `}
        id="flasher"
      >
        {infoModal}
        <div id={`popper`} className={`popper w-[255px] h-[100px] sm:w-[400px] sm:h-[305px] flex`}>
          {props.items.map((item) => {
            return <img key={item.id}
              src={item.img} 
              width="100%"
              className="object-scale-down"
              srcSet={`${item.img}-400 400w,
                      ${item.img}-255 255w,
                      ${item.img} 800w`}
              onClick={() => carInfo()}
            >
            </img>
          })}
        </div>
      </div>
    </>
  )
}

export default FlashingItem;