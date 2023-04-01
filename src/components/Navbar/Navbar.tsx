import React, { useRef } from 'react';
import { FaCar, FaSearch } from 'react-icons/fa'
import { HiOutlineMenu } from 'react-icons/hi'

interface NavbarProps {
  page: string;
}

const Navbar = () => {
  const page = useRef(window.location.pathname.substring(1));

  if(page.current.length < 1) page.current = 'home';

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
      <div id='topbar' className='px-9 py-2 bg-custom-200 text-right'>topbar works!</div>
      <nav id='navbar' className='sticky top-0 overflow-hidden'>
        <div className='py-2 bg-custom-100 w-full text-white whitespace-nowrap z-50 shadow-md'>
          <div className='grid grid-cols-2'>
            <div className='flex items-center mx-7 my-1 '>
              {/* <FaCar className='text-6xl inline-block py-3' /> */}
              <h1 className='inline-block text-xl lg:text-3xl xl:text-6xl font-bold'>Mock Motors</h1>
            </div>
            <div className='burger flex md:hidden justify-end items-center text-3xl px-3'>
              <HiOutlineMenu className='' />
            </div>
            <div className='hidden md:flex items-center justify-end'>
              <a id='home' href='/' className={`px-4 py-3`}>Home</a>
              <a id='inventory' href='inventory' className='px-4 py-3'>Inventory</a>
              <a id='about-us' href='about-us' className='px-4 py-3'>About Us</a>
              <a id='contact-us' href='contact-us' className='px-4 py-3'>Contact Us</a>
              <input type='input' className='ml-4'></input>
              <FaSearch className='text-2xl float-right mx-2' />
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;