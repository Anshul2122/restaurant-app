import OrderStatusForRestauarant from '@/components/OrderStatusForRestauarant';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ManageRestaurantForm from '@/forms/manageRestuarantForm/ManageRestaurantForm';

const ManageRestaurant = () => {
  return (
    <div className='my-10'>
      <div>
        <div className='m-3 space-x-3 w-fit p-2 rounded-lg shadow-xl'>
          <Tabs defaultValue="Order" className="lg:w-[1490px] sm:w-[700px] md:w-[500px]">
            <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="Order" className='font-bold'>Manage Orders</TabsTrigger>
            <TabsTrigger value="ManageRestaurant">Manage Restaurant</TabsTrigger>
            </TabsList>
            <TabsContent value="ManageRestaurant"><ManageRestaurantForm/></TabsContent>
            <TabsContent value="Order"><OrderStatusForRestauarant/></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ManageRestaurant