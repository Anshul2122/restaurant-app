import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MainNav from './MainNav'
import MobileNav from './MobileNav'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
    const {user} = useSelector(store=>store.auth);
  return (
    <div className='mb-32 py-6 bg-transparent text-white'>
        <div className='container mx-auto flex justify-between items-center'>
            <Link to='/' className='text-3xl font-bold tracking-tight text-white hover:underline'>QuickFeast</Link>
            <div className='hidden md:block'><MainNav user={user}/></div>
            <div className= 'md:hidden'><MobileNav user={user}/></div>
        </div>
    </div>
  )
}

export default Header