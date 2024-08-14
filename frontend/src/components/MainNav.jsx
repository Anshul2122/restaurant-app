import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom';
import UsernameMenu from './UsernameMenu';

const MainNav = () => {
    const navigate = useNavigate();
    const user = true;
  return (
    <span className='flex space-x-2 items-center'>
        {user? <UsernameMenu/> :
        <Button onClick={navigate('/login')}>login</Button>
        }
    </span>
  )
}

export default MainNav