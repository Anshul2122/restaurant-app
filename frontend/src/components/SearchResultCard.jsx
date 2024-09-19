import React from 'react'
import { Link } from 'react-router-dom'

const SearchResultCard = ({restaurant}) => {
  return (
    <div className="flex w-[350px]  rounded-lg p-2 m-1 hover:shadow-2xl">
      <Link to={`/details/${restaurant._id}`} className="">
        <div className='flex '>
          <img
            src="https://b.zmtcdn.com/data/pictures/chains/8/1400208/cb8ad5f90f76f566e5f10165b983b3b6_o2_featured_v2.jpg?output-format=webp"
            alt=""
            className=" h-48 rounded-lg "
          />
        </div>
        <div className="m-2 sm:mt-28 md:mt-2 flex flex-col rounded-lg ">
          <h3 className="font-semibold text-xl">{restaurant.restaurantName}</h3>
          <div className="flex flex-row w-80  justify-between">
            {restaurant.cuisines.slice(0, 4).map((item, index) => (
              <span key={index} >
                <span className='flex'>{item}<span>,</span></span>

              </span>
            ))}
            {restaurant.cuisines.length > 3 && (
              <span className="flex">
                <span>...</span>
              </span>
            )}
            <span className="ml-9 flex w-8 justify-end">
              {" "}
              ₹{restaurant.deliveryPrice.toFixed(2)}
            </span>
          </div>
          <span className="flex justify-end mr-1">
            {restaurant.estimatedDeliveryTime} mins
          </span>
        </div>
      </Link>

      {/* <Link to={`/detail/${restaurant._id}`} className='grid lg:grid-cols-[3fr_2fr]  gap-5 group'>
      <div className='flex flex-col gap-4'>
      <AspectRatio ratio={16/6}>
        <img src="" alt={restaurant.name} className='w-[507px] border border-black rounded-md object-cover m-1 h-[190px]'/>
      </AspectRatio>
      <div className='m-2 sm:mt-28 md:mt-2'>
        <h3 className='font-bold text-xl'>{restaurant.restaurantName}</h3>
        <div id='card-content' className='grid grid-rows-2 gap-2'>
          <div className='flex flex-row flex-wrap '>
            {restaurant.cuisines.map((item, index)=>(
              <span className='flex'>
                <span className=''>{item}</span>
                {  index <  restaurant.cuisines.length-1 && <Dot/> }
              </span>
            ))}
          </div>
          <div className='flex gap-2 flex-col'>
            <div className='flex items-center gap-1 text-green-600'>
              <Clock className='text-green-600'/>
              {restaurant.estimatedDeliveryTime} mins
            </div>
            <div className='flex items-center gap-1'>
              <Banknote/>
              Delivery from ₹ {(restaurant.deliveryPrice).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
      </div>
    </Link> */}
    </div>
  );
}

export default SearchResultCard