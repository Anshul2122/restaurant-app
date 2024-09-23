import OrderStatusDetails from '@/components/OrderStatusDetails';
import OrderStatusHeader from '@/components/OrderStatusHeader';
import { useGetMyOrder } from '@/hooks/useGetMyOrder'
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import React from 'react'

const OrderStatus = () => {
    const {result: orders, isLoading } = useGetMyOrder();
    if(isLoading){
      return "Loading..."
    }
    if(!orders || !orders.length===0){
      return "No Order found :("
    }
    

  return (
    <div className='space-y-10'>
      {orders.map((order)=>(
        <div className='space-y-10 bg-gray-50 p-10 rounded-lg'>
          <OrderStatusHeader order={order}/>
          <div className='grid gap-10 md:grid-cols-2 mb-5'>
            <OrderStatusDetails order={order}/>
            <AspectRatio ratio={16/5} >
             <img src={"https://plus.unsplash.com/premium_photo-1661953124283-76d0a8436b87?q=80&w=888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" className='h-full w-full rounded-md object-cover sm:h-full sm:w-full sm:object-cover'/>
            </AspectRatio>
          </div>
        </div>      
      ))}
    </div>
  )
}

export default OrderStatus