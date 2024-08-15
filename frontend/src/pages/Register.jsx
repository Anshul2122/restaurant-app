import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setLoading } from '@/redux/authSlice'
import { USER_API_END_POINT } from '@/utils/contants'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const[input, setInput] = useState({
    name:"",
    email:"",
    password:"",
    phoneNumber:""
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading, user} = useSelector(store=>store.auth);
  const changeEventHandler = (e)=>{
    setInput({...input, [e.target.name]:e.target.value});
  }

  const submitHandler = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('email', input.email);
    formData.append('password', input.password);
    formData.append('phoneNumber', input.phoneNumber);

    console.log(input);
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData,{
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials:true,
      });
      if(res.data.success){
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      dispatch(setLoading(false));
    }
    useEffect(()=>{
      if(user){
        console.log(user);
        
        navigate('/');
      }
    },[user]);
  };
  
  return (
    <div>
      <Header/>
      <div className='flex items-center justify-center max-w-7xl max-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-2xl'>
          <h1 className='font-bold text-xl mb-5'>Register</h1>
          <div className='my-2'>
            <Label>Name</Label>
            <Input type='text' placeholder='Enter your name' name="name" onChange={changeEventHandler} />
            <Label>Email</Label>
            <Input type='eamil' placeholder='Enter your email' name="email" onChange={changeEventHandler}  />
            <Label>Password</Label>
            <Input type="Password" placeholder="Enter your password" name="password" onChange={changeEventHandler} />
            <Label>Phone </Label>
            <Input type="text" placeholder="Enter your phone number" name="phoneNumber" onChange={changeEventHandler} />
          </div>
          {loading ? (
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              loading...
            </Button>
          ) : (
            <Button type="submit" className="bg-green-600 hover:bg-green-900">
              Sign up
            </Button>
          )}
          <p className="my-2"> already have account?{" "}
            <span className="text-green-700 hover:underline">
              <Link to="/login">login</Link>
            </span></p>
        </form>
        </div>
    </div>
  )
}

export default Register