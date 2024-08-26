import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator'
import React, { useEffect, useState } from 'react'
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { MY_RESTAURANT_API_END_POINT } from '@/utils/contants';
import { setRestaurant } from '@/redux/authSlice';
import DetailsSection from './DetailsSection';
import CuisinesSection from './CuisinesSection';
import MenuSection from './MenuSection';

const formSchema = z.object({
    restaurantName:z.string().optional(),
    city:z.string().optional(),
    deliveryPrice:z.coerce.number(),
    estimatedDeliveryTime:z.coerce.number(),
    cuisines : z.array(z.string()),
    menuItems : z.array(z.object({
        name:z.string(),
        price:z.coerce.number(),
    })),
})

const ManageRestaurantForm = ({restaurant}) => {
    const [loading, setLoading] = useState(false);
    const form = useForm({
        resolver:zodResolver(formSchema),
        defaultValues: restaurant,
    });
    const dispatch =  useDispatch();
    const navigate = useNavigate();
    const submitHandler = async(e)=>{
        try {
            e.preventDefault();
            setLoading(true);
            const updatedData = form.getValues();
            const res = await axios.put(`${MY_RESTAURANT_API_END_POINT}/update`, updatedData, {
                withCredentials: true,
            });
            if(res.data.success){
                dispatch(setRestaurant(res.data.restaurant));
                toast.success('restaurant data updated');
                navigate('/userRestaurant');
            }
            console.log(updatedData);
        } catch (error) {
            console.log(error);
            toast.error('failed to update profile');
        }
        finally{
            setLoading(false);
        }
        
    }
    useEffect(()=>{
        form.reset(restaurant);
    }, [restaurant, form]);

  return (
    <div>
        <Form {...form}>
            <form onSubmit={submitHandler} className='space-y-8 bg-gray-100 border border-b-gray-50 p-10 rounded-lg'>
                <DetailsSection/>
                <Separator/>
                <CuisinesSection/>
                <Separator/>
                <p><MenuSection/></p>
                <Separator/>
                <p>imageSection</p>
                {loading? <LoadingButton/> : <Button type='submit' className='bg-green-600 hover:bg-green-900'>Save</Button>}
            </form>
        </Form>
    </div>
  )
}

export default ManageRestaurantForm