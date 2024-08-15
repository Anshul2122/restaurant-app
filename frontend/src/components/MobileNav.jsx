import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import MobileNavLinks from './MobileNavLinks'
import { Avatar, AvatarImage } from './ui/avatar'
import { FaUserCircle } from "react-icons/fa";
import { Menu } from 'lucide-react'

const MobileNav = ({src}) => {
    const navigate = useNavigate();
    const user = false;
  return (
    <Sheet>
      <></>
      <SheetTrigger>
        <Menu className="text-green-600" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {user ? (
            <span className="flex items-center font-bold gap-2 text-green-600 cursor-pointer">
              {" "}
              <Avatar>
                {src ? (
                  <AvatarImage src={src} alt="@shadcn" />
                ) : (
                  <FaUserCircle size={32} /> // Size can be adjusted
                )}
              </Avatar>{" "}
              anshulmakhija125@gmail.com
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
            <Button
              onClick={() => navigate("/login")}
              className="flex-1 font-bold bg-green-600"
            >
              Login
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav