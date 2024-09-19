import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useGetRestaurnat from '@/hooks/useGetRestaurant';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import ResturantInfo from '@/components/ResturantInfo';
import MenuItem from '@/components/MenuItem';
import OrderSummary from '@/components/OrderSummary';
import { Card, CardFooter } from '@/components/ui/card';
import CheckoutButton from '@/components/CheckoutButton';
import { useCreateCheckoutSession } from '@/hooks/useCreateCheckoutSession';


const DetailPage = () => {

  const {restaurantId} = useParams();
  const {restaurant, isLoading} = useGetRestaurnat(restaurantId);
  const {createCheckoutSession} = useCreateCheckoutSession(); 
  const [cartItems, setCartItems] =  useState(()=>{
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems):[]}
  );
  // add items to cart
  const addToCart = (menuItem) =>{
    setCartItems((prevCartItems)=>{
      // check if item already exists in cart
      const existingCartItem = prevCartItems.find((cartItem)=>cartItem._id === menuItem._id);

      // if item exists in cart, update the quantity
      let updatedCartItems;
      if(existingCartItem){
        updatedCartItems = prevCartItems.map((cartItem)=>
        cartItem._id === menuItem._id ? {...cartItem, quantity: cartItem.quantity+1} : cartItem);
      } else{ 
        // if item doesn't exist in cart, add it to the cart
        updatedCartItems =[
          ...prevCartItems,
          {
            _id: menuItem._id,
            name:menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }
      sessionStorage.setItem(`cartItems-${restaurantId}`, 
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems
    });
  }
  // remove items from cart
  const removeFromCart = (menuItem) => {
    setCartItems((prevCartItems) => {
      // Find the item in the cart
      const existingCartItem = prevCartItems.find((item) => item._id === menuItem._id);
  
      // If the item exists and its quantity is greater than 1, reduce the quantity
      if (existingCartItem && existingCartItem.quantity > 1) {
        return prevCartItems.map((item) =>
          item._id === menuItem._id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        // If the quantity is 1, remove the item from the cart
        return prevCartItems.filter((item) => item._id !== menuItem._id);
      }
    });
  };

  const onCheckout = async(userFormData)=>{
    console.log("use form Data: ",userFormData)
    if(!restaurant){
      return;
    }
    const checkoutData = {
      cartItems:cartItems.map((cartItem)=>({
        menuItemId:cartItem._id,
        name:cartItem.name,
        quantity:cartItem.quantity.toString(),
      })),

      restaurantId:restaurant._id,
      deliveryDetails: {
        name:userFormData.name,
        address:userFormData.address,
        city:userFormData.city,
        email:userFormData.email,
      }
    };
    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  }

  if(isLoading || !restaurant){
    return "Loading... ";
  }
  //console.log(restaurant.menuItems)
  return (
    <div className='flex flex-col gap-10 m-4'>
      <AspectRatio ratio={16/5}>
        <img src="https://b.zmtcdn.com/data/pictures/chains/8/1400208/cb8ad5f90f76f566e5f10165b983b3b6_o2_featured_v2.jpg?output-format=webp" alt="" className='rounded-md object-cover h-full w-full' />
      </AspectRatio>
      <div className='grid md:grid-cols-[4fr_2fr] gap-5 md:px-32'>
        <div className='flex flex-col gap-4'>
          <ResturantInfo restaurant={restaurant} />
          <span className='text-2xl font-bold tracking-tight'>Menu</span>
          {restaurant.menuItems.map((menuItem)=>(
            <MenuItem menuItem = {menuItem} addToCart={()=>addToCart(menuItem)} removeFromCart={()=>removeFromCart(menuItem)} />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={removeFromCart} />
            <CardFooter>
              <CheckoutButton onCheckout={onCheckout}  cartItems={cartItems} restaurantId={restaurantId}/>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DetailPage