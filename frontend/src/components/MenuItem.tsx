import React from 'react'
import { MenuItem } from '../types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type MenuItemProps = {
    menuItem: MenuItem;
    addToCart: () => void;
}

const MenuItemComponent = ({ menuItem, addToCart }: MenuItemProps) => {
  return (
    <Card className='cursor-pointer' onClick={addToCart}>
        <CardHeader>
            <CardTitle>
                {menuItem.name}
            </CardTitle>
        </CardHeader>
        <CardContent className='font-bold'>
            ${(menuItem.price / 100).toFixed(2)}
        </CardContent>
    </Card>
  )
}

export default MenuItemComponent