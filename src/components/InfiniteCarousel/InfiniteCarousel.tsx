import React, { useEffect, useMemo, useRef, useState } from "react";
import { Car } from "../../tools/car";
import { CARS } from "../../tools/mock-cars";
import CarouselItem from "../CarouselItem/CarouselItem";
import './InfiniteCarousel.css'

interface InfiniteCarouselProps {
  items: Car[]
}

const InfiniteCarousel = (props: InfiniteCarouselProps) => {
  const [isVisible, setIsVisible] = useState<Map<number, boolean>>(new Map);
  const carouselRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const carouselItems = useMemo(() => {
    let items: JSX.Element[] = [];

    props.items.forEach((item) => {
      items.push(<CarouselItem key={item.id + Math.random()} item={item} />)
    })

    return items;
  }, [props.items]);
  const beforeItems = useMemo(() => {
    let items: JSX.Element[] = []
    console.log(isVisible.size)
    if(isVisible.size > 0) {
      // console.log(Object.entries(isVisible))
      for (let [key, value] of isVisible) {
        if(value) break;

        items.push(<CarouselItem key={key - 1 + Math.random()} item={props.items[key - 1]} />)
      }
      // Object.entries(isVisible).some((entry: any, i) => {
      //   console.log(entry)
      //   if(entry[1]) return entry[1];

      //   items.push(<CarouselItem key={entry[0] - 1 + Math.random()} item={props.items[entry[0] - 1]} />)
      // })
    }
    console.log(items)
    return items;
  }, [isVisible])
  const afterItems = useMemo(() => {
    let items: JSX.Element[] = []
    console.log(isVisible.size)
    if(isVisible.size > 0) {
      // console.log(Object.entries(isVisible))
      for (let [key, value] of isVisible) {
        if(value) break;

        items.push(<CarouselItem key={key - 1 + Math.random()} item={props.items[key - 1]} />)
      }
      // Object.entries(isVisible).some((entry: any, i) => {
      //   console.log(entry)
      //   if(entry[1]) return entry[1];

      //   items.push(<CarouselItem key={entry[0] - 1 + Math.random()} item={props.items[entry[0] - 1]} />)
      // })
    }
    console.log(items)
    return items;
  }, [isVisible])


  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      setIsVisible((isVisible) => {
        let state = new Map(isVisible);

        entries.forEach((entry, i) => {
          state.set(parseInt(entry.target.classList[0]), entry.isIntersecting)
        })
        return state;
      })
      console.log(entries)
    }

    const options = {root: null, rootMargin: `${carouselRef.current!.offsetWidth / 3}px`, threshold: 0}

    observer.current = new IntersectionObserver(callback, options)
  }, []);

  useEffect(() => {
    const carouselContent = carouselRef.current;

    if(carouselContent && observer.current) {
      const children = carouselContent!.children;

      for(let i = 0; i < children.length; i++) {
        observer.current.observe(children[i]);
      }


    }

    return (() => {
      if(observer.current) observer.current.disconnect();
    })
  }, []);

  useEffect(() => {
    // if(carouselRef.current)
    //   carouselRef.current.scroll(carouselRef.current.offsetWidth , 0)
  }, []);

  useEffect(() => {
    const carouselContent = carouselRef.current;
    console.log(carouselContent?.children[0])
    // if(carouselContent)
    //   carouselContent.innerHTML += carouselContent.innerHTML;
  }, [])

  const handleMouseEnter = () => {
    const carouselContent = carouselRef.current;
    if(carouselContent)
      carouselContent.style.animationPlayState = 'paused';
  }

  const handleMouseLeave = () => {
    const carouselContent = carouselRef.current;
    if(carouselContent)
      carouselContent.style.animationPlayState = 'running';
  }

  return (
    <div className="carousel w-full overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* <app-carousel-item *ngFor="let car of cars" [car]="car"></app-carousel-item> */}
      <div ref={carouselRef} className='carousel-content'>
        {carouselItems}
        {afterItems}
      </div>
    </div>
  )
}

export default InfiniteCarousel;