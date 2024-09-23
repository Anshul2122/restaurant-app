import React from 'react'
import { Progress } from './ui/progress';
import { ORDER_STATUS } from '../utils/order-status-congif';

const OrderStatusHeader = ({order}) => {
    const getExpectedDelivery = ()=>{
        const created = new Date(order.createdAt);

        created.setMinutes(created.getMinutes() + order.restaurant.estimatedDeliveryTime);

        const hours = created.getHours();
        const minutes = created.getMinutes();

        const paddedMinutes = minutes <10 ? `0${minutes}`: minutes;

        return `${hours}:${paddedMinutes}`;
    }

    const getOrderStatusInfo = ()=>{
        return (
            ORDER_STATUS.find((o)=> o.value === order.status) || ORDER_STATUS[0]
        );
    };
  return (
    <>
      <h1 className='text-3xl font-bold tracking-tighter flex flex-co; gap-5 md:flex-row md:justify-between'>
        <span className=''> Order Status : {getOrderStatusInfo().value}</span>
        <span>Expected by: {getExpectedDelivery()}</span>
      </h1>
      <Progress className='animated-pulse' value={getOrderStatusInfo().progressValue}/>
    </>  
  )
}

export default OrderStatusHeader