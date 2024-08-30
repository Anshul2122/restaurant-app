import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { USER_API_END_POINT } from '@/utils/contants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';


const UserProfileForm = ({user, loading}) => {
  const [input, setInput] = useState({
    name:user.name,
    email:user.email,
    address:user.address,
    city:user.city,
    file:"",
    phoneNumber:user.phoneNumber
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeEventHandler = (e) =>{
    setInput({...input, [e.target.name]:e.target.value});
  };

  const changeFileHandler = (e)=>{
    setInput({...input, file:e.target.files?.[0]});
  };

  const submitHandler = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    if(input.name) {formData.append('name', input.name);}
    if(input.email) {formData.append("email", input.email);}
    if(input.address){formData.append("address", input.address);}
    if(input.city){formData.append("city", input.city);}
    if(input.file){ formData.append("file", input.file);}
    console.log(input);

    try {
      e.preventDefault();
      console.log("clicked");
      dispatch(setLoading(true));
      const res = await axios.put(`${USER_API_END_POINT}/update`, formData, {
        headers: {
          'Content-Type':'multipart/form-data',
        },
        withCredentials: true,
      });
      if(res.data.success){
        navigate('/');
        console.log(res.data);
        toast.success('Profile updated successfully')
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally {
      dispatch(setLoading(false));
    }
  }
    // useEffect(()=>{
    //     if(user){
    //       navigate('/');
    //     }
    // }, []);


  return (
    <div className='flex items-center justify-center w-[100%]  '>
      <form onSubmit={submitHandler}
      className="w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-2xl">
        <div className="my-2 ">
            <Label >Full Name</Label>
            <Input
              type="text"
              placeholder="Enter your name"
              value={input.name}
              name="fullname"
              onChange={changeEventHandler}
            />
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />
            <Label>Phone </Label>
            <Input
              type="text"
              placeholder="Enter your phone number"
              value={input.phoneNumber}
              disabled
              name="phoneNumber"
              onChange={changeEventHandler}
            />
            <Label>Address </Label>
            <Input
              type="text"
              placeholder="Enter your phone number"
              value={input.address}
              name="address"
              onChange={changeEventHandler}
            />
            <Label>City </Label>
            <Input
              type="text"
              placeholder="Enter your phone number"
              value={input.city}
              name="city"
              onChange={changeEventHandler}
            />
            <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
                onChange={changeFileHandler}
              />
          </div>
          {loading ? (
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              loading...
            </Button>
            ) : (
            <Button type="submit" className="bg-green-600 hover:bg-green-900">
              Update
            </Button>
          )} 
      </form>
    </div>
  );
}

export default UserProfileForm