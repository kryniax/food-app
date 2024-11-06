import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetRestaurant } from '../api/RestaurantApi';
import PulseLoader from 'react-spinners/PulseLoader';
import { AspectRatio } from '../components/ui/aspect-ratio';
import RestaurantInfo from '../components/RestaurantInfo';
import MenuItemComponent from '../components/MenuItem';

const DetailPage = () => {
    const { restaurantId } = useParams();
    const { restaurant, isLoading } = useGetRestaurant(restaurantId);

    if(isLoading || !restaurant) {
        return (
            <div className='flex items-center justify-center h-screen'>
              <PulseLoader 
                color='#f97316'
                size={25}
              />
            </div>
          );
    }
  return (
    <div className='flex flex-col gap-10'>
        <AspectRatio ratio={16 / 5}>
            <img
                src={restaurant.imageUrl} 
                className='rounded-md object-cover h-full w-full'
            />
        </AspectRatio>
        <div className='grid md:grid-cols-[4fr_2fr] gap-5 md:px-32'>
            <div className='flex flex-col gap-4'>
                <RestaurantInfo restaurant={restaurant}/>
                <span className='text-2xl font-bold tracking-tight'>Menu</span>
                {restaurant.menuItems.map((menuItem) => (
                    <MenuItemComponent menuItem={menuItem}/>
                ))}
            </div>
            
        </div>
    </div>
  )
}

export default DetailPage