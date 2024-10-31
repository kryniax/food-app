import React from 'react'
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { FormControl, FormItem, FormLabel } from '../../../components/ui/form';
import { Checkbox } from '../../../components/ui/checkbox';

type CuisineCheckboxProps = {
    cuisine: string;
    field: ControllerRenderProps<FieldValues, "cuisines">;
}

const CuisineCheckbox = (props: CuisineCheckboxProps) => {
    const { cuisine, field } = props;
  return (
    <FormItem className='flex flex-row items-center space-x-1 space-y-0 mt-2'>
        <FormControl>
            <Checkbox 
                className='bg-white' 
                checked={field.value.includes(cuisine)}
                onCheckedChange={(checked) => {
                    if(checked) {
                        field.onChange([...field.value, cuisine]);
                    } else {
                        field.onChange(
                            field.value.filter((value: string) => value !== cuisine)
                        )
                    }
                }}
                value={cuisine}/>
        </FormControl>
        <FormLabel 
            className='text-sm font-normal cursor-pointer select-none'
        >
            {cuisine}
        </FormLabel>
    </FormItem>
  )
}

export default CuisineCheckbox