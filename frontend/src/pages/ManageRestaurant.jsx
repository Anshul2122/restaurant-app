import OrderStatus from '@/components/OrderStatus';
import { Button } from '@/components/ui/button'
import ManageRestaurantForm from '@/forms/manageRestuarantForm/ManageRestaurantForm';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

let ORderstyles = 'bg-green-600 text-white hover:bg-green-900 hover:text-white shadow-xl';
let manageStyles = 'bg-green-600 text-white hover:bg-green-900 hover:text-white shadow-xl';
const ManageRestaurant = () => {
  const {restaurant} = useSelector(store=>store.auth);
    const [component, setComponent] = useState(false);
    const handleOrderClick = () => {
      setComponent(false)
      manageStyles= 'shadow-xl'
     ORderstyles = 'bg-green-600 text-white hover:bg-green-900 hover:text-white shadow-xl';
    };
    const handlManageClickClick = () => {
      setComponent(true)
      manageStyles = 'bg-green-600 text-white hover:bg-green-900 hover:text-white shadow-xl';
      ORderstyles='shadow-xl'
}
  return (
    <div className='my-10'>
        <div>
        <div className='m-3 space-x-3 w-fit p-2 bg-green-50 rounded-lg shadow-xl'>
            <Button onClick={handleOrderClick} variant="outline" className={ORderstyles}>order status</Button>
            <Button onClick={handlManageClickClick}  variant="outline" className={manageStyles}>Manage Restaurant</Button>
        </div>
        </div>
        
        <div className='m-3 rounded-lg shadow-lg'>
            {component ? <ManageRestaurantForm restaurant={restaurant}/> : <OrderStatus/> }
        </div>

    </div>
  )
}

export default ManageRestaurant