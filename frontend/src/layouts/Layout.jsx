import { Toaster } from 'react-hot-toast'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import React from 'react'
import Navbar from '@/components/Navbar'

const Layout = ({children, showHero=false}) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
        {showHero && <Hero/>}
        <div>{children}</div>
        <Footer/>
        <Toaster position="top-right"/>
    </div>
  )
}

export default Layout;