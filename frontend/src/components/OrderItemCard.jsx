import React, { useEffect, useState } from 'react'

import { ORDER_STATUS } from '@/utils/order-status-congif'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';


const OrderItemCard = ({ord, isLoading}) => {
  // console.log(ord)
  // console.log("cartItems", ord.cartItems)
  const getTime=()=>{
    const orderDateTime = new Date(ord.createdAt);
    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes

    return `${hours}:${paddedMinutes}`;
  }
  const [status, setStatus] = useState(ord.status);

  useEffect(()=>{
        setStatus(ord.status);
  },[ord.status])
  return (
    <Card>
      <CardHeader>
        <CardTitle className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 justify-between mb-3'>
          <div>Customer name: 
            <span className='ml-2 font-normal'>
              {ord.deliveryDetails.name}
            </span>
          </div> 
          <div>
            Delivery address:
            <span className="ml-2 font-normal">
              {ord.deliveryDetails.addressLine1}, {ord.deliveryDetails.city}
            </span>
          </div>
          <div>
            Time:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>
          <div>
            Total Cost:
            <span className="ml-2 font-normal">
            ₹{(ord.totalAmount).toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator/>
      </CardHeader>
      <CardContent className='flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          {ord.cartItems.map((cartItem)=>(
            <span>
              <Badge variant='outline' className='mr-2'>{cartItem.quantity}</Badge>
              {cartItem.name}
            </span>
          ))}
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='status' className='font-bold text-xl'>change status of the order</Label>
          <Select 
            value={status} 
            disabled={isLoading}
            onValueChange={(value)=>handelStatusChange(value)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder='status'/>
            </SelectTrigger>
            <SelectContent placeholder='popper'>
              {ORDER_STATUS.map((status)=>(
                <SelectItem value={status.value}>{status.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

export default OrderItemCard