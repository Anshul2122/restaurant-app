import React from 'react'
import { Input } from './ui/input'
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  return (
    <div className='w-[500px]'>
        <IoSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 ml-2 flex items-center text-2xl" />
        <Input type='text' placeholder='Search for restaurant, cuisine or a dish' className='bg-white ml-4 pl-8 text-gray-700 rounded-xl'/>
    </div>

        
  )
}

export default SearchBar;