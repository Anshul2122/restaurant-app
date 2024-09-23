import React from 'react'
import { Separator } from './ui/separator'

const OrderStatusDetails = ({order}) => {
  return (
    <div className='space-y-5'>
      <div className='flex flex-col'>
        <span className='font-bold'>Delivery to: </span>
        <span>name: {order.deliveryDetails.name}</span>
        <span>address: {order.deliveryDetails.address}, {order.deliveryDetails.city}</span>
      </div>
      <div className='flex flex-col'>
        <span className='font-bold'>Your Order</span>
        <ul>
          {order.cartItems.map((item)=>(
            <li>{item.name} x {item.quantity}</li>
          ))}
        </ul>
      </div>
      <Separator/>
      <div className='flex flex-col'>
        <span className='font-bold'>Total</span>
        <span> ₹ {(order.totalAmount).toFixed(2)}</span>
      </div>
    </div>
  )
}

export default OrderStatusDetails