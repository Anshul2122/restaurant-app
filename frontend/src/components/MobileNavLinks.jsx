import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

const MobileNavLinks = () => {
    const navigate = useNavigate();
  return (
    <>
    <Link to='/user-profile' className='flex bg-white items-center font-bold hover:text-green-600'>User profile</Link>
    <Button onClick={()=>navigate("/logout")} className='flex items-center px-3 font-bold hover:bg-gray-500'>Logout</Button>
    </>
  )
}

export default MobileNavLinks