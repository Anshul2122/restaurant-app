import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet'
import { CircleUserRound, Menu } from 'lucide-react'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import MobileNavLinks from './MobileNavLinks'

const MobileNav = () => {
    const navigate = useNavigate();
    const user = true;
  return (
    <Sheet>
        <></>
        <SheetTrigger>
            <Menu className='text-green-600'/>
        </SheetTrigger>
        <SheetContent className='space-y-3'>
            <SheetTitle>
            { user? 
                ( <span className='flex items-center font-bold gap-2'><CircleUserRound className='text-green-600'/> anshulmakhija125@gmail.com</span> )
                :
                (
                    <span>Welcome to QuickFeast.com! </span>
                )
            }
            </SheetTitle>
        <Separator/>
        <SheetDescription className='flex flex-col gap-4'>
            {user? <MobileNavLinks/> : <Button onClick={()=>navigate("/login")} className='flex-1 font-bold bg-green-600' >Login</Button>}
        </SheetDescription>
        </SheetContent>
    </Sheet>
    
  )
}

export default MobileNav