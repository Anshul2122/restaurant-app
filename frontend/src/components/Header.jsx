import React from 'react'
import { Link } from 'react-router-dom'
import MainNav from './MainNav'
import MobileNav from './MobileNav'
import { useSelector } from 'react-redux'

const Header = () => {
    const {user} = useSelector(store=>store.auth);
  return (
    <div className='mb-32 py-6 bg-transparent text-white focus-visible:ring-0'>
        <div className='container mx-auto flex justify-between items-center'>
            <Link to='/' className='text-4xl font-bold tracking-tight text-white hover:underline italic'>QuickFeast</Link>
            <div className='hidden md:block'><MainNav user={user}/></div>
            <div className= 'md:hidden'><MobileNav user={user}/></div>
        </div>
    </div>
  )
}

export default Header