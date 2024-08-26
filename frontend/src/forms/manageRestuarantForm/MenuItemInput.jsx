import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import React from 'react'
import { useFormContext } from 'react-hook-form';

const MenuItemInput = ({index, removeMenuItem}) => {
  const {control} = useFormContext();
  return (
    <div className='flex flex-row items-end gap-2'>
      <FormField 
        control = {control}
        name={`menuItems.${index}.name`}
        render={({field})=>(
          <FormItem>
            <FormLabel className='flex items-center gap-1'>name of dish <FormMessage/> </FormLabel>
            <FormControl>
              <Input {...field} placeholder='cheese pizza' className='bg-white' />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField 
        control = {control}
        name={`menuItems.${index}.price`}
        render={({field})=>(
          <FormItem>
            <FormLabel className='flex items-center gap-1'>price of dish <FormMessage/> </FormLabel>
            <FormControl>
              <Input {...field} placeholder='100' className='bg-white' />
            </FormControl>
          </FormItem>
        )}
      />
      <Button className='bg-green-600 hover:bg-green-900' onClick={removeMenuItem} >remove</Button>
    </div>
  )
}

export default MenuItemInput