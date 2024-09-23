import { CHECKOUT_API_END_POINT } from '@/utils/contants';
import axios from 'axios';
import { useQuery } from 'react-query';


export const useGetMyOrder = ()=>{
  const getMyOrderRequest = async()=>{
    try {
      const res = await axios.get(`${CHECKOUT_API_END_POINT}/getMyOrders`,
       {withCredentials: true,});
      // console.log("res: ",res)    
      return res.data;
    } 
   catch (error) {
      console.log("error: ",error)
    }
  }
  const {data:result, isLoading} = useQuery(
    "fetchMyOrders", 
    getMyOrderRequest,
    {
      refetchInterval: 5000, //
    } 
  );
  return { result, isLoading }
}

