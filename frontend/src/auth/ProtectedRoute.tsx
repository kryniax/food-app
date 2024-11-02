import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader'

const ProtectedRoute = () => {

    const { isAuthenticated, isLoading } = useAuth0();

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

    if(isAuthenticated) {
      return <Outlet/>
    }
  
    return <Navigate to="/" replace/>
}

export default ProtectedRoute