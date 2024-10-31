import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { FormDescription, FormField, FormItem } from '../../../components/ui/form';
import { Button } from '../../../components/ui/button';
import MenuItemInput from '../components/MenuItemInput';
import { Plus } from 'lucide-react';

const MenuSection = () => {
    const { control } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "menuItems"
    })
  return (
    <div className='space-y-2'>
        <div>
            <header>
                <h2 className='text-2xl font-bold'>Menu</h2>
            </header>
            <FormDescription>
                Create your menu and give each item a name and a price.
            </FormDescription>
        </div>
        <FormField 
            control={control} 
            name="menuItems" 
            render={({ field }) => (
                <FormItem className='flex flex-col gap-2'>
                    {fields.map((_, index) => (
                        <MenuItemInput
                            key={`menuItem${index}`} 
                            index={index} 
                            removeMenuItem={() => remove(index)}/>
                    ))}
                </FormItem>
            )}
        />
        <Button type='button' onClick={() => append({name: "", price: ""})}>
            <Plus/>
        </Button>
    </div>
  )
}

export default MenuSection