import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import { cuisineList } from '../../../config/restaurant-options-config';
import CuisineCheckbox from '../components/CuisineCheckbox';

const CuisinesSection = () => {
    const { control } = useFormContext();

  return (
    <div className='space-y-2'>
        <div>
            <header>
                <h2 className='text-2xl font-bold'>Cuisines</h2>
            </header>
            <FormDescription>
                Select the cuisines that your resteurant serves
            </FormDescription>
        </div>
        <FormField 
            control={control} 
            name="cuisines" 
            render={({ field }) => (
                <FormItem>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1'>
                        {cuisineList.map((cuisineItem, index) => (
                            <CuisineCheckbox key={cuisineItem} cuisine={cuisineItem} field={field}/>
                        ))}
                    </div>
                    <FormMessage/>
                </FormItem>
            )}
        />
    </div>
  )
}

export default CuisinesSection