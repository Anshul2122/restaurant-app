import { FormField, FormItem } from '@/components/ui/form'
import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import MenuItemInput from './MenuItemInput';
import { Button } from '@/components/ui/button';

const MenuSection = () => {
  const {control} = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });
  return (
    <div className='space-y-2'>
      <div>
        <h1 className='text-2xl font-bold'>Menu</h1>
      </div>
      <div>
        <FormField 
          control={control}
          name='menuItems'
          render={()=>(
            <FormItem className="flex flex-col gap-2">
            {fields.map((_, index) => (
              <MenuItemInput
                index={index}
                removeMenuItem={() => remove(index)}
              />
            ))}
          </FormItem>
          )}
        />
        <Button className='my-2 bg-green-600 hover:bg-green-900' onClick={()=>append({name:"", price:""})} >add</Button>
      </div>
    </div>
  )
}

export default MenuSection
