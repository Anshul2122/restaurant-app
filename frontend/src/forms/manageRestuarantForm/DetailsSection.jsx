import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react'
import { useFormContext } from 'react-hook-form';
const styles = 'max-w-[25%] sm:max-w-[50%]';
const DetailsSection = () => {
const {control} = useFormContext();
  return (
    <div className="space-y-2">
        <div>
            <h2 className='text-2xl font-bold'>Details</h2>
        </div>
        <FormField
            control={control}
            name="restaurantName"
            render={({ field }) => (
              <FormItem className={styles}>
                <FormLabel>Restaurant Name</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem className={styles}>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="deliveryPrice"
            render={({ field }) => (
              <FormItem className={styles}>
                <FormLabel>Delivery charges (₹)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='select delivery cost' type='number' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="estimatedDeliveryTime"
            render={({ field }) => (
              <FormItem className={styles}>
                <FormLabel>Delivery Time (minutes)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='delivery time' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
    </div>
  )
}

export default DetailsSection;
