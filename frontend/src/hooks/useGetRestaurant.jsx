import {useQuery} from 'react-query';
import { RESTAURANT_API_END_POINT } from "@/utils/contants";
import axios from "axios";


const useGetRestaurnat = (restaurantId)=> {
  const getRestaurantByIdRequest = async()=>{
    // console.log("restaurant id : ",restaurantId);
    // console.log("restaurant api end point : ",`${RESTAURANT_API_END_POINT}/${restaurantId}`);
    try {
      const res = await axios.get(`${RESTAURANT_API_END_POINT}/${restaurantId}`, {
        withCredentials: true,
      });

      // console.log("res: ",res);
  
      if (res.status !== 200) {
        console.log("Error getting restaurant:", res);
        throw new Error(`Failed to fetch restaurant: ${res.statusText || res.status}`);
      }
      return res.data
    } catch (error) {
      console.log("ye hai error : ",error)
    }
    
  };
  const {data:restaurant, isLoading} = useQuery(
    "fetchRestaurant",
    getRestaurantByIdRequest,
    {
      enabled:!!restaurantId,
    }
  );
  return {restaurant, isLoading}
}

export default useGetRestaurnat;
