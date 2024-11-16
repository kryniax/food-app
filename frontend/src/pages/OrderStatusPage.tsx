import React from 'react'
import { useGetMyOrders } from '../api/OrderApi'
import PulseLoader from 'react-spinners/PulseLoader';
import OrderStatusHeader from '../components/OrderStatusHeader';
import OrderStatusDetail from '../components/OrderStatusDetail';
import { AspectRatio } from '../components/ui/aspect-ratio';

const OrderStatusPage = () => {
    const { orders, isLoading } = useGetMyOrders();

    if(isLoading) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <PulseLoader 
                    color='#f97316'
                    size={25}
                />
            </div>
        );
    }

    if(!orders || orders.length === 0) {
        return "No orders found";
    }
  return (
    <div className='space-y-10'>
        {orders.map((order) => (
            <div className='space-y-10 bg-gray-50 p-10 rounded-lg'>
                <OrderStatusHeader order={order}/>
                <div className='grid gap-10 md:grid-cols-2'>
                    <OrderStatusDetail order={order}/>
                    <AspectRatio ratio={16/5}>
                        <img 
                            src={order.restaurant.imageUrl} 
                            className='rounded-md object-cover h-full w-full'
                        />
                    </AspectRatio>
                </div>
            </div>
        ))}
    </div>
  )
}

export default OrderStatusPage