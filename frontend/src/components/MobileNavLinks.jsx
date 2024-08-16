import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/contants'
import { setUser } from '@/redux/authSlice'

const MobileNavLinks = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
      try {
        console.log('clicked');
        
        const res = await axios.get(`${USER_API_END_POINT}/logout`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUser(null));
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        
      }
    };
  return (
    <>
    <Link to='/user-profile' className='flex bg-white items-center font-bold hover:text-green-600'>User profile</Link>
    <Button onClick={logoutHandler} className='flex items-center px-3 font-bold bg-green-600 hover:bg-green-900'>Logout</Button>
    </>
  )
}

export default MobileNavLinks