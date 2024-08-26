import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { cuisineList } from '@/utils/cuisineList';
import React from 'react'

import { useFormContext } from 'react-hook-form'
import CuisineCheckBox from './CuisineCheckBox';

const CuisinesSection = () => {
    const {control} = useFormContext();

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="grid sm:grid-cols-5 gap-1">
              {cuisineList.map((cuisine, i) => (
                <CuisineCheckBox cuisine={cuisine} field={field} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default CuisinesSection