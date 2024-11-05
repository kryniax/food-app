import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { useForm } from 'react-hook-form';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { twMerge } from 'tailwind-merge';

type SearchBarProps = {
    searchQuery?: string;
    onSubmit: (formData: SearchForm) => void;
    placeHolder: string;
    onReset?: () => void;
}

const formSchema = z.object({
    searchQuery: z.string({
        required_error: "Restaurant name is required",

    }),
});

export type SearchForm = z.infer<typeof formSchema>

const SearchBar = (props: SearchBarProps) => {
    const { onSubmit, onReset, placeHolder, searchQuery } = props;

    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery,
        }
    });

    useEffect(() => {
        form.reset({ searchQuery });
    }, [form, searchQuery]);

    const handleReset = () => {
        form.reset({
            searchQuery: "",
        });
        if(onReset) {
            onReset();
        }
    };

  return (
    <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className={
                twMerge("flex flex-row items-center gap-3 justify-beetwen border-2 rounded-full p-3", 
                form.formState.errors.searchQuery && 'border-red-500'
                )}
            >
            <Search strokeWidth={2.5} size={30} className='ml-1 text-orange-500 hidden md:block'/>
            <FormField control={form.control} name="searchQuery" render={( {field} ) => (
                <FormItem className='flex-1'>
                    <FormControl>
                        <Input 
                            {...field} 
                            className='border-none shadow-none text-xl focus-visible:ring-0' 
                            placeholder={placeHolder}
                        />
                    </FormControl>
                </FormItem>
            )}/>
            <Button onClick={handleReset} type='button' variant='outline' className='rounded-full'>
                Reset
            </Button>
            <Button type="submit" className='rounded-full bg-orange-500'>
                Search
            </Button>
        </form>
    </Form>
  )
}

export default SearchBar