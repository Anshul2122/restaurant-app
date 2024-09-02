import React, { useEffect } from 'react'
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import {Search } from 'lucide-react';
import { Button } from './ui/button';
import { MdCancel } from "react-icons/md";

const formSchema = z.object({
  searchQuery : z.string({
    required_error:"restaurant name is required",
  }),
});

const SearchBar = ({onSubmit, onReset,placeholder, searchQuery}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {searchQuery},
  });
  useEffect(()=>{
    form.reset({searchQuery});
  }, [form, searchQuery]);

  const handleReset = ()=>{
    form.reset({searchQuery:"",});
    if(onReset){
      onReset();
    }
  };
  return (
    <div className="w-full flex flex-row ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} // Yeh form data submit karega aur onSubmit function ko trigger karega
        className={`flex w-full items-center gap-3 justify-between flex-row  rounded-full p-3 ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}>
        
          <FormField 
            control={form.control}
            name='searchQuery' 
            render={({field})=>(
            <FormItem className='flex-1'>
              
              <FormControl>
                <Input {...field} 
                  className="border-none shadow-none text-xl rounded-full focus-visible:ring-0"
                  placeholder={placeholder}
                />
              </FormControl>
            </FormItem>)}
          />
          {form.formState.isDirty && (
            <Button onClick={handleReset} type='button'  className='rounded-full bg-inherit hover:bg-inherit font-extrabold absolute right-[490px]'>
              <MdCancel className='text-gray-300 text-xl' />
            </Button>)
           }
            
        </form>
      </Form>
      
    </div>

        
  )
}

export default SearchBar;