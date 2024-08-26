import React from 'react'
import hero from '../assets/hero.png'
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
const Hero = () => {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchFormValues)=>{
    console.log(`searched city : ${searchFormValues.searchQuery}`);
    navigate(`/search/${searchFormValues.searchQuery}`)
  }
  return (
    <div className="relative">
      <img src={hero} alt="hero-image" className="w-full max-h-[450px] object-cover blur-[2px]" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <span className=" text-white text-5xl font-bold italic hover:scale-110 transition-transform duration-300 ">
          Delicious Food, Delivered to Your Doorstep
        </span>
        <br />
        
        <div className='pt-7 flex justify-center'><span className='border-none w-full'><SearchBar onSubmit={handleSearchSubmit}  placeholder='Search by City or Town'/></span></div>
        
      </div>
    </div>
  )
}

export default Hero