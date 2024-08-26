import React from 'react'
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-green-600 py-1 text-white">
      <section className="py-1 sm:pt-1 lg:pt-2">
        <div className="px-2 mx-auto sm:px-1 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-1 gap-x-2">
            <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pr-4">
              <span className='font-bold text-4xl' >QuiclFeast</span>
              <ul className="flex items-center space-x-3 mt-3 text-xl">
                <span>Social Links :</span>
                <li className='hover:text-blue-600  bg-transparent ' ><FaFacebook /></li>
                <li className='hover:text-blue-400  bg-transparent ' ><FaTwitter /></li>
                <li className=' hover:text-purple-600  bg-transparent '><FaInstagramSquare /></li>
                <li className='hover:text-blue-600  bg-transparent '><FaLinkedin /></li>
              </ul>
            </div>

            <div>
              <p className="text-md font-semibold tracking-widest text-white uppercase">Company</p>
              <ul className="mt- space-y-4 text-sm">
                <li>About</li>
                <li>Features</li>
                <li>Works</li>
                <li>Career</li>
              </ul>
            </div>
            <div>
              <p className="text-md font-semibold tracking-widest text-white uppercase">Help</p>
              <ul className="text-sm mt-3 space-y-4">
                <li>Customer Support</li>
                <li>Delivery Details</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>

          <hr className="mt-2 mb-10 border-gray-200" />

          <p className="text-sm text-center text-white">
            © Copyright 2024, All Rights Reserved
          </p>
        </div>
      </section>
    </footer>
  );
}

export default Footer