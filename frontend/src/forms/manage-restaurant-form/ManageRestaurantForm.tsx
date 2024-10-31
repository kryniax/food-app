import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../../components/ui/form';
import DetailsSection from './sections/DetailsSection';
import { Separator } from '../../components/ui/separator';
import CuisinesSection from './sections/CuisinesSection';
import MenuSection from './sections/MenuSection';
import ImageSection from './sections/ImageSection';
import LoadingButton from '../../components/LoadingButton';
import { Button } from '../../components/ui/button';

const formSchema = z.object({
    restaurantName: z.string({
        required_error: "restaurant name is required",
    }),
    city: z.string({
        required_error: "city name is required",
    }),
    country: z.string({
        required_error: "country name is required",
    }),
    deliveryPrice: z.coerce.number({
        required_error: "delivery price is required",
        invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: "estimated delivery time is required",
        invalid_type_error: "must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "please select at least one item",
    }),
    menuItems: z.array(
        z.object({
            name: z.string().min(1, "name is required"),
            price: z.coerce.number().min(1, "price is required"),
        })
    ),
    imageFile: z.instanceof(File, { message: "image is required" }),
})

type restaurantFormData = z.infer<typeof formSchema>;

type ManageRestaurantFormProps = {
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
}

const ManageRestaurantForm = (props: ManageRestaurantFormProps) => {
    const { onSave, isLoading } = props;

    const form = useForm<restaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{ name: "", price: 0 }],
        },
    });

    const onSubmit = (formDataJson: restaurantFormData) => {
        console.log(formDataJson);
    }

  return (
    <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 bg-gray-50 p-10 rounded-lg'
        >
            <DetailsSection/>
            <Separator/>
            <CuisinesSection/>
            <Separator/>
            <MenuSection/>
            <Separator/>
            <ImageSection/>
            {isLoading ? <LoadingButton/> : <Button type="submit">Submit</Button>}
        </form>
    </Form>
  )
}

export default ManageRestaurantForm