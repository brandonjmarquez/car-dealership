import React, { useEffect, useMemo, useRef, useState } from "react";
import { Car } from "../../tools/car";
import { CARS } from "../../tools/mock-cars";
import CarouselItem from "../CarouselItem/CarouselItem";
import './InfiniteCarousel.css'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface InfiniteCarouselProps {
  items: Car[]
}

const InfiniteCarousel = (props: InfiniteCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number>();

  const handleMouseLeave = () => {
    const carouselContent = carouselRef.current;
    if(carouselContent) {
      intervalRef.current = window.setInterval(() => {
        carouselContent.scrollBy(.5, 0);
      }, 5);
    }
  }

  const carouselItems = useMemo(() => {
    let items: JSX.Element[] = [];

    props.items.forEach((item) => {
      items.push(<CarouselItem key={'before' + item.id} className='carousel' item={item} handleMouseLeave={handleMouseLeave} />);
    })
    props.items.forEach((item) => {
      items.push(<CarouselItem key={'center' + item.id} className='carousel-item' item={item} handleMouseLeave={handleMouseLeave} />);
    })
    props.items.forEach((item) => {
      items.push(<CarouselItem key={'after' + item.id} className='carousel-item' item={item} handleMouseLeave={handleMouseLeave} />);
    })

    return items;
  }, [props.items]);

  useEffect(() => {
    const carouselContent = carouselRef.current;

    if(carouselContent) 
      carouselContent.scroll({left: carouselContent.scrollWidth / 3 - carouselContent.children[0].children[0].clientWidth / 4, top: 0})

    if(!intervalRef.current && carouselContent)
      intervalRef.current = window.setInterval(() => {
        carouselContent.scrollBy(.5, 0);
      }, 5);
    
  }, []);

  const handleMouseEnter = () => {
    const carouselContent = carouselRef.current;
    if(carouselContent) {
      // (carouselContent.children[0] as HTMLDivElement).style.animationPlayState = 'paused';
      window.clearInterval(intervalRef.current);
    }
  }

  const handleScroll = (e: any) => {
    const scrollLeft = (e.target as HTMLDivElement).scrollLeft;
    const carouselContent = carouselRef.current;

    if(carouselContent && scrollLeft - carouselContent!.children[0].children[0].clientWidth * 9 * 2 > 20) {
      carouselContent.scrollBy({top: 0, left: carouselContent.children[0].children[0].clientWidth * -9})
    } 
    else if(carouselContent && scrollLeft < 10) {
      carouselContent.scrollBy({top: 0, left: carouselContent.children[0].children[0].clientWidth * 9})
    }
  }

  return (
    <div className="flex items-center flex-col" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
      <div ref={carouselRef} className="carousel w-full overflow-x-scroll overflow-y-hidden whitespace-nowrap scrollbar-hide" onScroll={(e) => handleScroll(e)}>
        <div className="carousel-content">
          {carouselItems}
        </div>
      </div>
      <div className="grid-cols-2">
        <button className="inline-block bg-custom-400 p-3 m-3  rounded-full" onClick={() => {
          const carouselContent = carouselRef.current;
          if(carouselContent) 
            carouselContent.scrollBy({top: 0, left: -carouselContent.children[0].children[0].clientWidth, behavior: "smooth"})
          }}><FaArrowLeft />
        </button>
        <button className="inline-block bg-custom-400 p-3 m-3 rounded-full" onClick={() => {
          const carouselContent = carouselRef.current;
          if(carouselContent) {
            carouselContent.scrollBy({top: 0, left: carouselContent.children[0].children[0].clientWidth, behavior: "smooth"})
          }
          }}><FaArrowRight />
        </button>
      </div>
    </div>
  )
}

export default InfiniteCarousel;