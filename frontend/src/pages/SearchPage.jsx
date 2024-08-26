import useSearchRestaurant from '@/hooks/useSearchRestaurant';
import React from 'react'
import { useParams } from 'react-router-dom'

const SearchPage = () => {
  const {city} = useParams();


  // const [isExpanded, setIsExpanded] = useState(false);

  const {results} = useSearchRestaurant(city);
  
  console.log( 'ye results value  hai: ',results);
  

  return (
    <div className='m-4 p-4'>
      <span>you searched for  
        <span>
          {results?.response?.data?.map((restaurant)=>(
            <span> found - {restaurant.restaurantName},  {restaurant.city}</span>
          ))}
        </span>
      </span>
    </div>
  )
}

export default SearchPage