import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MainNav from './MainNav'
import MobileNav from './MobileNav'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const {user} = useSelector(store=>store.auth);
  return (
    <div className='mb-15 py-6 bg-green-600'>
        <div className='container mx-auto flex justify-between items-center'>
            <Link to='/' className='text-3xl font-bold tracking-tight text-white hover:underline'>QuickFeast</Link>
            <div className='hidden md:block'><MainNav user={user}/></div>
            <div className= 'md:hidden'><MobileNav user={user}/></div>
        </div>
    </div>
  )
}

export default Navbar