import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormItem, FormLabel } from '@/components/ui/form'
import React, { useEffect, useState } from 'react'

const CuisineCheckBox = ({cuisine, field}) => {
    
  return (
    <FormItem className='flex flex-row items-center space-x-1 space-y-0 mt-2'>
        <FormControl>
            <Checkbox className='bg-white' 
                checked={Array.isArray(field.value) && field.value.includes(cuisine)}
                onCheckedChange={(checked)=>{
                    const currValue = Array.isArray(field.value) ? field.value : []
                    if(checked){
                        field.onChange([...currValue,cuisine,]);
                    }
                    else{
                        field.onChange(field.value.filter((value)=> value!=cuisine));
                    }
                    console.log(currValue);
                    console.log(cuisine);
                }}

            />
        </FormControl>
        <FormLabel className='text-sm font-normal' >{cuisine}</FormLabel>
    </FormItem>
  )
}

export default CuisineCheckBox