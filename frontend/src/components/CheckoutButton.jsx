import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import LoadingButton from './LoadingButton';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';
import { loadStripe } from '@stripe/stripe-js';
import { CHECKOUT_API_END_POINT } from '@/utils/contants';
import axios from 'axios';
import CheckoutForm from '@/forms/checkoutForm/CheckoutForm';


const CheckoutButton = ({ cartItems, restaurantId, onCheckout}) => {
  const {loading, user} =  useSelector(store=>store.auth);
  const navigate = useNavigate();
  // payment integration
  const makePayment = async()=>{
    const stripe = await loadStripe('pk_test_51PywYjHYn2dioh6QUnwuyAEqlf5fLBSLkkWHO38FZRTYuPNIIjvhOWaW6rRpdCgiCL4QozelC3N9mxDRtvNlqdgI00OcJY8efG');
    const body = {
      checkoutSessionRequest: {
        cartItems,
        restaurantId: restaurantId, // Ensure this is set correctly
      },
    };
    try {
      const response = await axios.post(`${CHECKOUT_API_END_POINT}/create-checkout-session`,
        body,
        {
        headers:{
          "Content-Type":"application/json",
        },
          withCredentials: true,
      });
      const url = response.data.url;
      // console.log("url: ", url);
      if (url) {
        const stripp = stripe
        window.location.href = url; // Redirect to the Stripe Checkout page
      }
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  
  
  if(!user){
    return (
      <Button onClick={()=>navigate('/login')} className='bg-green-600 flex-1'>log in to checkout</Button>
    )
  }
  if(loading || !user){
    return <LoadingButton/>
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-green-600 flex-1'>checkout</Button>
      </DialogTrigger>
      <DialogContent className='max-w-[425px] md:min-w-[700px] bg-gray-50'>
        <CheckoutForm  cartItems={cartItems} user={user} isLoading={loading} makePayment={makePayment} onCheckout={onCheckout} />
         
      </DialogContent>
    </Dialog>
  )
}

export default CheckoutButton