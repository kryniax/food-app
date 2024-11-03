import React from 'react'
import ManageRestaurantForm from '../forms/manage-restaurant-form/ManageRestaurantForm'
import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from '../api/MyRestaurantApi'

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading  } = useUpdateMyRestaurant();

  const isEditing = !!restaurant;

  return (
    <ManageRestaurantForm
      onSave={isEditing? updateRestaurant : createRestaurant}
      isLoading={isCreateLoading || isUpdateLoading}
      restaurant={restaurant}
    />
  )
}

export default ManageRestaurantPage