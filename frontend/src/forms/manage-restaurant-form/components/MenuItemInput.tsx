import React from 'react'
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Trash2 } from 'lucide-react';

type MenuItemInputProps = {
    index: number;
    removeMenuItem: () => void;
}

const MenuItemInput = (props: MenuItemInputProps) => {
    const {index, removeMenuItem} = props;
    const { control } = useFormContext();
  return (
    <div className='flex flex-row items-end gap-2'>
        <FormField 
            control={control} 
            name={`menuItems.${index}.name`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className='flex items-center gap-1'>
                        Name <FormMessage/>
                    </FormLabel>
                    <FormControl>
                        <Input 
                            {...field} 
                            placeholder='Funghi Pizza' 
                            className='bg-white'
                        />
                    </FormControl>
                </FormItem>
            )}
        />
        <FormField 
            control={control} 
            name={`menuItems.${index}.price`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className='flex items-center gap-1'>
                        Price ($) <FormMessage/>
                    </FormLabel>
                    <FormControl>
                        <Input 
                            {...field} 
                            placeholder='12.50' 
                            className='bg-white'
                        />
                    </FormControl>
                </FormItem>
            )}
        />
        <Button 
            type='button' 
            onClick={() => removeMenuItem()}
            className='bg-red-500 max-h-fit'
        >
            <Trash2/>   
        </Button>
    </div>
  )
}

export default MenuItemInput