import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-custom-100">
      <div className=" text-white z-50 pt-8 md:mx-20 my-6 border-t-2">
        <div className="flex justify-around">
          <div className="text-sm hidden sm:flex justify-evenly">
            <div className="p-2 whitespace-nowrap">
              <p>Store Location</p>
              <p>1000 Fake Address Dr.</p>
              <p>Notreal, FA, 12345</p>
            </div>
            <div className="p-2">
              <p>Store Hours</p>
              <p>Mon-Sat: 9am-5pm</p>
            </div>
            <div className="p-2">
              <p>Call Us</p>
              <p>(555) 555-5555</p>
            </div>
          </div>
          <div className="inline-block">
            <a href="https://www.facebook.com" className="block w-fit mb-2 py-3 px-4 bg-blue-500" target="_blank">Follow us on Facebook</a>
            <a href="https://www.instagram.com" className="block w-fit mt-2 py-3 px-4 bg-fuchsia-500" target="_blank">Follow us on Instagram</a>
          </div>
        </div>
        
      </div>
    </footer>
  )
}

export default Footer;