import React from 'react'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom';
import UsernameMenu from './UsernameMenu';

const MainNav = ({user}) => {
    const navigate = useNavigate();
  return (
    <span className='flex space-x-2 items-center'>
        {user?
         <>
          <Link to='/order-status' className=' text-white font-bold hover:underline'>order status</Link>
          <UsernameMenu user={user}/>
         </>  :
        <div>
          <Button onClick={()=>navigate('/login')} className='text-black bg-inherit hover:bg-white hover:text-green-600 rounded-3xl'>Login</Button>
          <Button onClick={()=>navigate('/register')} className='text-black bg-inherit hover:bg-white hover:text-green-600 rounded-3xl'>Register</Button>
        </div>

        
        }
    </span>
  )
}

export default MainNav