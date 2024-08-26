import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setLoading, setUser } from '@/redux/authSlice'
import { USER_API_END_POINT } from '@/utils/contants'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'


const Login = () => {
  const [input, setInput] = useState({
    email:"",
    password:"",
  });

  const changeEventHandler=(e)=>{
    setInput({...input, [e.target.name]:e.target.value});
  };
  const navigate = useNavigate();
  const {loading, user} =  useSelector(store=>store.auth);
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success("welcome back");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password");
      // Implement error handling for user feedback (e.g., state for error message)
    } finally {
      dispatch(setLoading(false));
    }
    useEffect(() => {
      console.log("Navigating to home, user:", user);
      if (user) {
        navigate("/");
      }
    }, [user]);
  };

  
  
 
  return (
    <div>
      <Header/>
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-2xl'>
          <h1 className='font=bold text-xl mb-5'>Login</h1>
          <div className='my-2'>
            <Label>Email</Label>
            <Input type="email" placeholder="Enter your email" name="email" onChange={changeEventHandler}/>
            <Label>Password</Label>
            <Input type="password" placeholder="Enter your password" name="password" onChange={changeEventHandler}/>
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
          <p className='my-2'> new user? <span className='text-green-600 hover:underline'> <Link to='/register'>register here</Link> </span> </p>
        </form>
      </div>
    </div>
  )
}

export default Login
