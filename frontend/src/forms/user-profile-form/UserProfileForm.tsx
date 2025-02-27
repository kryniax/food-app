import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import LoadingButton from '../../components/LoadingButton';
import { Button } from '../../components/ui/button';
import { User } from '../../types';

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(3, {message: "Name is required"}),
    address: z.string().min(2, "Address is required"),
    city: z.string().min(2, "City is required"),
    country: z.string().min(2, "Country is required"),
})

export type UserFormData = z.infer<typeof formSchema>;

interface UserProfileFormProps {
    onSave: (userProfileData: UserFormData) => void;
    isLoading: boolean;
    currentUser: User;
    title?: string;
    buttonText?: string;
    checkout: boolean;
}

const UserProfileForm = (props: UserProfileFormProps) => {
   const { 
        onSave, 
        isLoading, 
        currentUser, 
        title ="User Profile", 
        buttonText="Submit",
        checkout
    } = props;
   
   const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser
   });

   useEffect(() => {
    form.reset(currentUser);
   }, [currentUser, form])

  return (
    <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(onSave)}
            className='space-y-4 bg-gray-50 rounded-lg md:p-10'    
        >
            <div>
                <header>
                    <h2 className='text-2xl font-bold'>{title}</h2>
                </header>
                <FormDescription>
                    {checkout ? (
                        <span>View and change your delivery information here.</span>
                    ) : (
                        <span>View and change your profile information here.</span>
                    )}
                </FormDescription>
            </div>
            <FormField 
                control={form.control} 
                name="email" 
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Email
                        </FormLabel>
                        <FormControl>
                            <Input {...field} disabled className='bg-white'/>
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField 
                control={form.control} 
                name="name" 
                render={({field}) => (
                    <FormItem>
                        <FormLabel>
                            Name
                        </FormLabel>
                        <FormControl>
                            <Input {...field} className='bg-white'/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <div className='flex flex-col md:flex-row gap-4 w-full'>
                <FormField 
                    control={form.control} 
                    name="address" 
                    render={({field}) => (
                        <FormItem className='flex-1'>
                            <FormLabel>
                                Address
                            </FormLabel>
                            <FormControl>
                                <Input {...field} className='bg-white'/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control} 
                    name="city" 
                    render={({field}) => (
                        <FormItem className='flex-1'>
                            <FormLabel>
                                City
                            </FormLabel>
                            <FormControl>
                                <Input {...field} className='bg-white'/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField 
                    control={form.control} 
                    name="country" 
                    render={({field}) => (
                        <FormItem className='flex-1'>
                            <FormLabel>
                                Country
                            </FormLabel>
                            <FormControl>
                                <Input {...field} className='bg-white'/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
            {isLoading ? (
                <LoadingButton/> 
            ) : (
                <Button type='submit' className='bg-orange-500'>
                    {buttonText}
                </Button>
            )}
        </form>
    </Form>
  )
}

export default UserProfileForm