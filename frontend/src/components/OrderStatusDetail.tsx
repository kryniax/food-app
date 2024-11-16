import React from 'react'
import { Order } from '../types'
import { Separator } from './ui/separator';

type OrderStatusDetailProps = {
    order: Order;
}

const OrderStatusDetail = ({ order }: OrderStatusDetailProps) => {
  return (
    <div className='space-y-5'>
        <div className='flex flex-col'>
            <span className='font-bold'>Delivering to:</span>
            <span>{order.deliveryDetails.name}</span>
            <span>
                {order.deliveryDetails.address}, {order.deliveryDetails.city}
            </span>
        </div>
        <div className='flex flex-col'>
            <span className='font-bold'>Your Order</span>
            <ul>
                {order.cartItems.map((item) => (
                    <li>
                        {item.name} x {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
        <Separator/>
        <div className='flex flex-col'>
            <span className='font-bold'>Total</span>
            <span>{(order.totalAmount / 100).toFixed(2)}$</span>
        </div>
    </div>
  )
}

export default OrderStatusDetail