import React from 'react'
import ManageRestaurantForm from '../forms/manage-restaurant-form/ManageRestaurantForm'
import { useCreateMyRestaurant, useGetMyRestaurant } from '../api/MyRestaurantApi'

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  return (
    <ManageRestaurantForm
      onSave={createRestaurant}
      isLoading={isLoading}
      restaurant={restaurant}
    />
  )
}

export default ManageRestaurantPage