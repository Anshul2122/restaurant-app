import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from 'zod';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import { USER_API_END_POINT } from '@/utils/contants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const formSchema = z.object({
    email:z.string().optional(),
    name:z.string().min(4, "name is required"),
    address:z.string().min(4, "address is required"),
    city:z.string().min(4, "city is required"),
})

const UserProfileForm = ({user}) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: user,
    });
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

    const submitHandler = async(e)=>{
        try{
            e.preventDefault();
            console.log("clicked")
            // dispatch(setLoading(true));
            const updatedData = form.getValues();
            const res = await axios.put(`${USER_API_END_POINT}/update`, updatedData, {
                withCredentials: true,
            });
            if(res.data.success){
                dispatch(setUser(res.data.user));
                toast.success("profile updated successfully")
                navigate('/')
                
            }
        } catch(error){
            console.log(error);
            toast.error("Failed to update profile")
        } finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        form.reset(user);
    }, [user, form]);


  return (
    <div className='flex items-center justify-center w-[100%] mx-auto '>
      <Form {...form}>
        <form
          onSubmit={submitHandler}
          className="space-t-4  bg-gray-50 shadow-lg rounded-lg md:p-10 my-5 w-2/3 px-5 pb-5"
        >
          <div className='flex items-center' >
            <h2 className="text-2xl font-bold"> User profile form</h2>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row gap-4 my-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>phone Number</FormLabel>
                  <FormControl>
                    <Input disabled  {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {loading ? (
            <LoadingButton/>
          ) : (
            <Button
              type="submit"
              variant="outline"
              className="bg-green-600 hover:bg-green-900 text-white hover:text-white "
            >
              Update
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}

export default UserProfileForm