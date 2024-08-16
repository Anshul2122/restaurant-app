import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom';
import UsernameMenu from './UsernameMenu';

const MainNav = ({user}) => {
    const navigate = useNavigate();
  return (
    <span className='flex space-x-2 items-center'>
        {user? <UsernameMenu user={user}/> :
        <Button onClick={()=>navigate('/login')} className='bg-green-600 hover:bg-green-900'>Login</Button>
        }
    </span>
  )
}

export default MainNav