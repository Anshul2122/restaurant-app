import React from 'react'
import hero from '../assets/hero.png'
import  SearchBar  from './SearchBar'
const Hero = () => {
  return (
    <div>
      <img src={hero} alt="hero-image" className='w-full max-h-[400px] object-cover blur-[1px] '/>
      <div className='absolute top-0 w-[500px] mx-[100px] lg:mx-[440px] h-full flex justify-center items-center '>
        <SearchBar/>
      </div>
    </div>
  )
}

export default Hero