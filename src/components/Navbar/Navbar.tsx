/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import React, { ReactPortal, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaCar, FaSearch } from 'react-icons/fa'
import { HiOutlineMenu } from 'react-icons/hi'

interface NavbarProps {
  page: string;
}

const Navbar = () => {
  const [burger, setBurger] = useState<ReactPortal | null>();
  const page = useRef(window.location.pathname.substring(1));

  const burgerMenu = () => {
    if(document.getElementById("burger-menu")) {
      document.getElementById("burger-menu")!.classList.toggle("menu-exit");
      return setTimeout(() => setBurger(null), 300);
    }
    setBurger(createPortal(<>
    <div css={css`animation: ${dropdown} 300ms ease-in-out forwards;`} id="burger-menu" className="flex flex-col md:hidden absolute z-50 w-full origin-top text-white">
      <a id='home' href='/' className="border border-custom-100 hover:border-custom-400 px-4 py-3 bg-custom-100">Home</a>
      <a id='inventory' href='inventory' className="border border-custom-100 hover:border-custom-400 px-4 py-3 bg-custom-100">Inventory</a>
    </div>
    </>, document.getElementById("burger")!))
  }

  if(page.current.length < 1) page.current = 'home';

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
      <style>
        {`
          #${page.current} {
            background-color: rgb(var(--color-custom-400));
            color: rgb(var(--color-custom-100));
          }
        `}
      </style>
      <div id='topbar' className='px-9 py-2 bg-custom-200 text-right text-white font-bold'>Your one stop shop for cars that you can't buy.</div>
      <nav id='navbar' className='sticky top-0 z-50 overflow-hidden shadow'>
        <div className='py-2 bg-custom-100 w-full text-white whitespace-nowrap z-50 shadow-md'>
          <div className='grid grid-cols-2'>
            <div className='flex items-center mx-7 my-1 '>
              {/* <FaCar className='text-6xl inline-block py-3' /> */}
              <a href="/">
                <h1 className='inline-block text-5xl font-bold'>Mock Motors</h1>
              </a>
            </div>
            <div className='burger flex md:hidden justify-end items-center text-3xl px-3'
              onClick={() => burgerMenu()}
            >
              <HiOutlineMenu className='' />
            </div>
            <div className='hidden md:flex items-center justify-end mr-3'>
              <a id='home' href='/' className="border border-custom-100 hover:border-custom-400 px-4 py-3">Home</a>
              <a id='inventory' href='inventory' className="border border-custom-100 hover:border-custom-400 px-4 py-3">Inventory</a>
            </div>
          </div>
        </div>
      </nav>
      <div id="burger">{burger}</div>
    </>
  )
}

export default Navbar;