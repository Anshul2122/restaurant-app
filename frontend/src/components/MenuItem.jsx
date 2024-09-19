import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from '@/components/ui/button';

const MenuItem = ({menuItem, addToCart, removeFromCart}) => {
    // console.log(menuItem)
  return (
    <Card className='cursor-pointer' >
        <CardHeader>
            <CardTitle>{menuItem.name}</CardTitle>
        </CardHeader>
        <CardContent className='font-bold mr-1 flex justify-between'>
        ₹ {(menuItem.price*10).toFixed(2)}
        <div className='flex  gap-3'>
          <Button onClick={addToCart} className='flex justify-end rounded-full text-center items-center bg-green-600'>add</Button>
        </div>
        </CardContent>
    </Card>
  )
}

export default MenuItem;