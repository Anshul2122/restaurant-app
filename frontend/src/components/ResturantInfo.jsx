import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Label } from '@/components/ui/label';
import { Dot } from 'lucide-react';

const ResturantInfo = ({restaurant}) => {
  return (
    <Card className='border-sla'>
      <CardHeader>
        <CardTitle className='text-3xl font-bold tracking-tight'>
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription className='font-bold'>
          {restaurant.city}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex'>
        {restaurant.cuisines.map((item, index)=>(
          <span className='flex mr-2'>
            <span >{item}</span>
            {index<restaurant.cuisines.length-1 && <span>,</span>}
          </span>
        ))}
      </CardContent>
    </Card>
  )
}

export default ResturantInfo