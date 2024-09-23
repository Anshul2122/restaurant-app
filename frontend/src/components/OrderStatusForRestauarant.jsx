import useGetMyRestaurantOrders from '@/hooks/useGetMyRestaurantOrders';
import React from 'react'
import OrderItemCard from './OrderItemCard';

const OrderStatusForRestauarant = () => {
    const {result: orders, isLoading } = useGetMyRestaurantOrders();
    // console.log("orders: " ,orders );
    let order = orders.orders;
    // // console.log(order);
  return (
    <div>
        <h1 className='text-2xl font-bold'>({order?.length}) active orders</h1>
        {order.map((ord)=>(
          <OrderItemCard ord={ord} isLoading={isLoading}/>
        ))}
    </div>
  )
}

export default OrderStatusForRestauarant