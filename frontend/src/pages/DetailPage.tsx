import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetRestaurant } from '../api/RestaurantApi';
import PulseLoader from 'react-spinners/PulseLoader';
import { AspectRatio } from '../components/ui/aspect-ratio';
import RestaurantInfo from '../components/RestaurantInfo';
import MenuItemComponent from '../components/MenuItem';
import { Card, CardFooter } from '../components/ui/card';
import OrderSummary from '../components/OrderSummary';
import { MenuItem } from '../types';
import CheckoutButton from '../components/CheckoutButton';

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}

const DetailPage = () => {
    const { restaurantId } = useParams();
    const { restaurant, isLoading } = useGetRestaurant(restaurantId);

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);

        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    const addToCart = (menuItem: MenuItem) => {
        setCartItems((prevCartItems) => {
            const existingCartItem = prevCartItems.find(
                (cartItem) => cartItem._id === menuItem._id
            );
            let updatedCartItems;

            if(existingCartItem) {
                updatedCartItems = prevCartItems.map(
                    (cartItem) => cartItem._id === menuItem._id 
                    ? { ...cartItem, quantity: cartItem.quantity + 1} 
                    : cartItem
                )
            } else {
                updatedCartItems = [
                    ...prevCartItems, {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1
                    },
                ];
            }
            sessionStorage.setItem(
                `cartItems-${restaurantId}`, 
                JSON.stringify(updatedCartItems)
            );
            return updatedCartItems;
        });
    }

    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter(
                (item) => cartItem._id !== item._id
            
            );
            sessionStorage.setItem(
                `cartItems-${restaurantId}`, 
                JSON.stringify(updatedCartItems)
            );
            return updatedCartItems;
        })
    }

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
                    <MenuItemComponent menuItem={menuItem} addToCart={() => addToCart(menuItem)}/>
                ))}
            </div>
            <div>
                <Card>
                    <OrderSummary 
                        restaurant={restaurant} 
                        cartItems={cartItems} 
                        removeFromCart={removeFromCart}
                    />
                    <CardFooter>
                        <CheckoutButton/>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
  )
}

export default DetailPage