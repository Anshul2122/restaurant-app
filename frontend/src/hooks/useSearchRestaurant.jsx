import {useQuery} from 'react-query';
import { RESTAURANT_API_END_POINT } from "@/utils/contants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setRestaurants } from '@/redux/restaurantSlice';

const useSearchRestaurant = (city) => {
    const dispatch = useDispatch();
    const createSearchRequest = async()=>{
      try {
        const params = new URLSearchParams();
        const res = await axios.get(`${RESTAURANT_API_END_POINT}/search/${city}?${params.toString()}`,{
          withCredentials: true,
        });
        console.log( 'ye rha pura data: ',  res.data);
        console.log('chal');
        
        console.log(res.data);
        return res.data
      } catch (error) {
        console.log('to error yha hai');
        console.log(error)
      }
    }
    const {data: results , isLoading} = useQuery(
      ['searchRestaurant', city], createSearchRequest,{enabled: !!city}
    );
    
    

  return {results, isLoading}
}

export default useSearchRestaurant

