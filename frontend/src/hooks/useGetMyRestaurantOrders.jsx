import axios from 'axios';
import { useQuery } from 'react-query';
import { MY_RESTAURANT_API_END_POINT } from '@/utils/contants';


const useGetMyRestaurantOrders = () => {
  const  getMyRestaurantOrdersRequest = async()=>{
    try {
      const res = await axios.get(`${MY_RESTAURANT_API_END_POINT}/order`,
        {withCredentials: true,}
      );

      // console.log("res: ", res.data) 
      return res.data;
    } catch (error) {
        console.log("error: ",error)
    } 
  }

  const {data:result, isLoading} = useQuery(
    "fetchMyOrders", 
    getMyRestaurantOrdersRequest,
    {
      refetchInterval: 5000, //
    } 
  );

  return { result, isLoading }
}

export default useGetMyRestaurantOrders