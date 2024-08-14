import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { CircleUserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from './ui/separator';
import { Button } from './ui/button';


const UsernameMenu = () => {
    // const user = true;
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className='flex items-center px-3 font-bold hover:text-green-600'>
            <CircleUserRound className='text-green-600' />
            anshulmakhija125@gmail.com
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem>
                <Link to='/user-profile' className='font-bold hover:text-green-600'>User Profile</Link>
            </DropdownMenuItem>
            <Separator/>
            <DropdownMenuItem>
                <Button onClick={()=>logout()} className='flex flex-1 font-bold bg-green-600'>Logout</Button>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UsernameMenu