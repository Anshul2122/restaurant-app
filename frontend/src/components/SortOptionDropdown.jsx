import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Button } from './ui/button'

const SORT_OPTION =[
  {
    label:"Best match",
    value:"bestMatch"
  },
  {
    label:"Delivery Price",
    value:"deliveryPrice"
  },
  {
    label:"Delivery Time",
    value:"estimatedDeliveryTime"
  }
]

const SortOptionDropdown = ({onChange, sortOption}) => {
  const selectedSortLabel = SORT_OPTION.find((option)=>option.value === sortOption)?.label || 
    SORT_OPTION[0].label;
  return (
    <div>
      <DropdownMenu >
      <DropdownMenuTrigger className='cursor-pointer'>
        <Button variant='outline' className='w-full'>
          Sort by : {selectedSortLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTION.map((option)=>(
          <DropdownMenuItem className='cursor-pointer'
            onClick={()=>onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}

export default SortOptionDropdown