import { cuisineList } from '@/utils/cuisineList';
import React, { useState } from 'react'
import { Label } from './ui/label';
import { Check, ChevronDown, ChevronUp, SpaceIcon } from 'lucide-react';
import { Button } from './ui/button';

const CuisineFilter = ({onChange, selectedCuisines}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleCuisineReset = () => {
    onChange([]);
  }

  const onExpandedClick=()=>{
    setIsExpanded((prevIsExpanded)=>!prevIsExpanded)
  }
  
  const handleCuisinesChange=(e)=>{
    const clickedCuisine = e.target.value;
    const isChecked = e.target.checked;

    const newCuisinesList = isChecked ? 
    [...selectedCuisines, clickedCuisine ]
      :
    clickedCuisine.filter((cuisine)=>cuisine!==clickedCuisine);
    onChange(newCuisinesList);
  }
  return (
    <>
      <div className='flex justify-between items-center px-2 w-[250px]'>
        <div className='flex flex-col '>
          <div className='text-md font-semibold '>Filter by Cuisine</div>
          <div
           onClick={handleCuisineReset}
           className='text-sm font-semibold mb-2 underline cursor-pointer text-blue-500'>(reset filters)</div>
        </div>
      </div>
      <div className='space-y-2 flex flex-col'>
        {cuisineList.slice(0,isExpanded? cuisineList.length : 9).map((cuisine, index)=>{
          const isSelected = selectedCuisines.includes(cuisine);
          return <div className='flex'>
            <input id={`cuisine_${cuisine}`}
             type='checkbox'
             className='hidden'
             value={cuisine}
             checked={isSelected}
             onChange={handleCuisinesChange} />
             <Label htmlFor={`cuisine_${cuisine}`} 
                className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold 
                ${isSelected ? "border border-green-600 text-green-600":
                "border border-slate-300" }`}>
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
          </div>

        })}
        <Button onClick={onExpandedClick} variant='link' className='mt-4 flex-1 underline text-blue-600'>
          { isExpanded ? 
          ( <span className='flex flex-row items-center'><ChevronUp/> view less </span> ) 
          : ( <span className='flex flex-row items-center'> <ChevronDown/> view more  </span> )} 
        </Button>
      </div>
    </> 
  )
}

export default CuisineFilter