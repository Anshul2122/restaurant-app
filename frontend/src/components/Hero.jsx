import React, { useState } from 'react'
import hero from '../assets/hero.png'
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { MdCancel } from 'react-icons/md';
const Hero = () => {
  const [input, setInput] = useState("");
  const handleReset = ()=>{
    setInput("");
  }
  const navigate = useNavigate();
  const handleSearchSubmit = (searchFormValues)=>{
    console.log(`searched city : ${searchFormValues.searchQuery}`);
    navigate(`/search/${searchFormValues.searchQuery}`)
  }
  return (
    <div className="relative">
      
      <img src={hero} alt="hero-image" className="w-full max-h-[500px] object-cover blur-[1px]" />
      
      
      <div className=" h-[80vh] w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
      <Header/>
      
        <span className=" text-white text-5xl font-bold italic hover:scale-110 transition-transform duration-300 ">
          Delicious Food, Delivered to Your Doorstep
        </span>
        <br />
        <div className="flex w-[40%] shadow-lg rounded-3xl items-center gap-4 mx-auto ">
        <SearchBar onSubmit={handleSearchSubmit}  placeholder='Search by City or Town'/>
        </div>
      </div>
    </div>
  )
}

export default Hero