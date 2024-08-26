import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom';
import UsernameMenu from './UsernameMenu';

const MainNav = ({user}) => {
    const navigate = useNavigate();
  return (
    <span className='flex space-x-2 items-center'>
        {user? <UsernameMenu user={user}/> :
        <div>
          <Button onClick={()=>navigate('/login')} className='text-white bg-inherit hover:bg-white hover:text-green-600 rounded-3xl'>Login</Button>
          <Button onClick={()=>navigate('/register')} className='text-white bg-inherit hover:bg-white hover:text-green-600 rounded-3xl'>Register</Button>
        </div>

        
        }
    </span>
  )
}

export default MainNav