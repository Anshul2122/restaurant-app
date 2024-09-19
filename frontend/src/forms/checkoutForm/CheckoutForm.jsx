import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import { Label } from '@/components/ui/label';
import { Loader2} from 'lucide-react';



const CheckoutForm = ({user, isLoading, makePayment, onCheckout}) => {

  const [input, setInput] = useState({
    name:user.name,
    email:user.email,
    address:user.address,
    city:user.city,
    phoneNumber:user.phoneNumber
  });

  const changeEventHandler = (e) =>{
    setInput({...input, [e.target.name]:e.target.value});
  };

  const submitHandler = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('email', input.email);
    formData.append('address', input.address);
    formData.append('city', input.city);
    formData.append('phoneNumber', input.phoneNumber);

    onCheckout(input);
  }

    

  return (
    <>
		  <h1 className='text-3xl font-bold'>Confirm Delivery Details</h1>
		  <span>view and change your address here</span>
		  <div className='flex items-center justify-center w-[100%]  '>
        <form onSubmit={submitHandler} // Check
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-2xl">
          <div className="mb-5 ">
            <Label >Full Name</Label>
            <Input
              type="text"
              placeholder="Enter your name"
              value={input.name}
              name="fullname"
              onChange={changeEventHandler}
              className='focus-visible:ring-0'
            />
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              className='focus-visible:ring-0'
            />
            <Label>Phone </Label>
            <Input
              type="text"
              placeholder="Enter your phone number"
              value={input.phoneNumber}
              disabled
              name="phoneNumber"
              onChange={changeEventHandler}
              className='focus-visible:ring-0'
            />
            <Label>Address </Label>
            <Input
              type="text"
              placeholder="Enter your phone number"
              value={input.address}
              name="address"
              onChange={changeEventHandler}
              className='focus-visible:ring-0'
            />
            <Label>City </Label>
            <Input
              type="text"
              placeholder="Enter your phone number"
              value={input.city}
              name="city"
              className='focus-visible:ring-0'
              onChange={changeEventHandler}
            />
          </div>
          {isLoading ? (
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              loading...
            </Button>
            ) : (
            <Button type="submit" makePayment={makePayment} className="bg-green-600 hover:bg-green-900">
              confirm order
            </Button>
          )} 
        </form>
      </div>
		</>
  );
}

export default CheckoutForm;
