import React from 'react'
import { Restaurant } from '../types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dot } from 'lucide-react';

type RestaurantInfoProps = {
    restaurant: Restaurant;
}

const RestaurantInfo = ({ restaurant }: RestaurantInfoProps) => {

  return (
    <Card className='border-sla'>
        <CardHeader>
            <CardTitle className='text-3xl font-bold tracking-tight'>
                <header>
                    {restaurant.restaurantName}
                </header>
            </CardTitle>
            <CardDescription>
                {restaurant.city}, {restaurant.country}
            </CardDescription>
        </CardHeader>
        <CardContent className='flex'>
            {restaurant.cuisines.map((cuisine, index) => (
                <span className='flex' key={cuisine}>
                    <span>{cuisine}</span>
                    {index < restaurant.cuisines.length -1 && <Dot/>}
                </span>
            ))}
        </CardContent>
    </Card>
  )
}

export default RestaurantInfo