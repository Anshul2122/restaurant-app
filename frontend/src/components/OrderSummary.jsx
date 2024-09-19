import React from 'react'
import { CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Minus } from 'lucide-react';

var totalInPence = 0
var totalWithDelivery = 0;
const OrderSummary = ({restaurant, cartItems, removeFromCart}) => {
  const getTotalCost = ()=>{
    // console.log('cart items: ', cartItems);
    // console.log('getTotalCost');
    //console.log(restaurant?.deliveryPrice);
    totalInPence = cartItems.reduce((total, cartItem) => {
      const price = cartItem?.price*10 ?? 0;
      // console.log(price);
      const quantity = cartItem?.quantity ?? 0;;
      //console.log(quantity);
      return total + price * quantity;
      },0);

    totalWithDelivery = totalInPence + restaurant.deliveryPrice;
    if(totalInPence > 500){
      totalWithDelivery -= restaurant.deliveryPrice; 
    }
    // console.log("total with delivery ",totalWithDelivery);
    // console.log("total price ",totalInPence)

    return (totalWithDelivery).toFixed(2);
  }
  return (
    <>
      <CardHeader>
        <CardTitle className='text-2xl font-bold tracking-tight flex justify-between'>
          <span>Your Order</span>
          <span>₹ {getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-5'>
        {cartItems.map((item)=>(
          <div className='flex justify-between'>
            <span>
              <Badge className='mr-2' variant="outline">{item.quantity}</Badge>
              {item.name}
            </span>
            <span className='flex items-center gap-1'> <Minus className='rounded-full bg-red-600 text-white cursor-pointer' size={17} onClick={()=>removeFromCart(item)}/> ₹ {((item.price*item.quantity)*10).toFixed(2)}</span>
          </div>
        ))}
        <Separator/>
        <div className='flex justify-between'>
          <div className='flex flex-col'>
          <span>Delivery Price</span>
          {totalInPence<500 && 
          <span>
            <span className='mr-1'>(order over 500 and</span>
            <span>get free delivery)</span>
          </span>}
          </div>
          {totalInPence>500? <span>₹ 0.00</span>:<span>₹ {(restaurant.deliveryPrice).toFixed(2)}</span>}
        </div>
        <Separator/>
      </CardContent>
    </>
  )
}

export default OrderSummary;
