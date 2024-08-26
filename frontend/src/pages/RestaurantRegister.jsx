import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setLoading } from '@/redux/authSlice'
import { MY_RESTAURANT_API_END_POINT } from '@/utils/contants'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const RestaurantRegister = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        restaurantName:"",
        city:"",
    });
    const changeEventHandler=(e)=>{
        setInput({...input, [e.target.name]:e.target.value});
    };
    const navigate = useNavigate();
    const {loading, restaurant} =  useSelector(store=>store.auth);
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(input);
        try {
          dispatch(setLoading(true));
          const res = await axios.post(`${MY_RESTAURANT_API_END_POINT}/register`, input, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
          if (res.data.success) {
            dispatch(setUser(res.data.user));
            toast.success("welcome back");
            navigate("/userRestaurant");
          }
        } catch (error) {
          console.error(error);
          toast.error("Invalid email or password");
          // Implement error handling for user feedback (e.g., state for error message)
        } finally {
          dispatch(setLoading(false));
        }
        useEffect(() => {
          console.log("Navigating to home, user:", restaurant);
          if (restaurant) {
            navigate("/userRestaurant");
          }
        }, [restaurant]);
      };
    

  return (

    <div>
        <Header/>
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-2xl'>
          <h1 className='font=bold text-xl mb-5'>Create Restaurant</h1>
          <div className='my-2'>
            <Label>Restaurant Name</Label>
            <Input type="text" placeholder="Enter your restaurant name" name="restaurantName" onChange={changeEventHandler}/>
            <Label>City</Label>
            <Input type="text" placeholder="Enter your city" name="city" onChange={changeEventHandler}/>
          </div>
          {loading ? (
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              loading...
            </Button>
          ) : (
            <Button type="submit" className="bg-green-600 hover:bg-green-900">
              Create
            </Button>
          )}
          <p className='my-2'> Already have restaurant? <span className='text-green-600 hover:underline'> <Link to='/userRestaurant'>Manage your restaurant here</Link> </span> </p>
        </form>
      </div>
    </div>
  )
}

export default RestaurantRegister