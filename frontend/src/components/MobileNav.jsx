import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import MobileNavLinks from './MobileNavLinks'
import { Avatar, AvatarImage } from './ui/avatar'
import { FaUserCircle } from "react-icons/fa";
import { Menu } from 'lucide-react';

const MobileNav = ({src, user}) => {
    const navigate = useNavigate();
  return (
    <Sheet>
      <></>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {user ? (
            <span className="flex items-center font-bold gap-2 text-green-700 cursor-pointer">
              {" "}
              <Avatar>
                {src ? (
                  <AvatarImage src={src} alt="@shadcn" />
                ) : (
                  <FaUserCircle size={32} /> // Size can be adjusted
                )}
              </Avatar>{" "}
              {user?.name}
            </span>
          ) : (
            <span>Welcome to QuickFeast.com! </span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {user ? (
            <MobileNavLinks />
          ) : (
            <div className='flex gap-3 flex-col'>
              <Button
              onClick={() => navigate("/login")}
              className="flex-1 font-bold bg-green-600"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/register")}
              className="flex-1 font-bold bg-green-600"
            >
              Register
            </Button>
            </div>
          
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav