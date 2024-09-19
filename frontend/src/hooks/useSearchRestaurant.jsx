import {useQuery} from 'react-query';
import { RESTAURANT_API_END_POINT } from "@/utils/contants";
import axios from "axios";

const useSearchRestaurant = (searchState,city) => {
    const createSearchRequest = async()=>{
      try {
        const params = new URLSearchParams();
        
        params.set("searchQuery", searchState.searchQuery); 
        params.set("page", searchState.page.toString());
        params.set("searchState", searchState.selectedCuisines.join(","));
        params.set("sortOption", searchState.sortOption); 

        const res = await axios.get(`${RESTAURANT_API_END_POINT}/search/${city}?${params.toString()}`,{
          withCredentials: true,
        });
        return res.data
      } catch (error) {

        console.log(error)
      }
    }
    const {data: results , isLoading} = useQuery(
      ['searchRestaurant', searchState], createSearchRequest,{enabled: !!city}
    );
    
    

  return {results, isLoading}
}

export default useSearchRestaurant

