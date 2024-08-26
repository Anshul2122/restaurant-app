import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
// import { CircleUserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/contants'
import { setUser } from '@/redux/authSlice'


const UsernameMenu = ({user, src}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
    // const user = true;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold text-white">
        <Avatar className='flex items-center justify-center'>
          {src ? (
            <AvatarImage src={src} alt="@shadcn" />
          ) : (
            <FaUserCircle size={32}  /> // Size can be adjusted
          )}
        </Avatar>
        <span className="text-white cursor-pointer mx-2">{user?.name}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className='flex flex-col gap-2'>
          <Link to="/user-profile" className="font-bold hover:text-green-900">
            Profile
          </Link>
          <Link to="/UserRestaurant" className="font-bold hover:text-green-900">
            My restaurant
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={logoutHandler}
            className="flex flex-1 font-bold bg-green-600 hover:bg-green-900"
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UsernameMenu