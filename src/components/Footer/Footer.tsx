import React from "react";

const Footer = () => {
  return (
    <footer className="mx-20">
      <div className="bg-neutral-800 w-full text-white z-50 pt-8">
        <div className="grid grid-cols-4 ">
          <div>
            Store Location
          </div>
          <div>
            Store Hours
          </div>
          <div>
            Call Us
          </div>
          <div className="inline-block">
            <a className="block w-fit mb-2 py-3 px-5 bg-blue-500" target="_blank">Follow us on Facebook</a>
            <a className="block w-fit mt-2 py-3 px-5 bg-fuchsia-500" target="_blank">Follow us on Instagram</a>
          </div>
        </div>
        
      </div>
    </footer>
  )
}

export default Footer;