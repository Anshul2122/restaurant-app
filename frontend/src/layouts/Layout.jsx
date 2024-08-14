import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import React from 'react'

const Layout = ({children, showHero=false}) => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header/>
        {showHero && <Hero/>}
        <div>{children}</div>
        <Footer/>
    </div>
  )
}

export default Layout