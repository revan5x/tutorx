import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';


function PrivateRoutes({children}) {
    const {user,loading} = useContext(AuthContext)
    if (loading) {
        return (
            <div class="flex items-center justify-center h-screen bg-gray-100">
            <div class="relative flex items-center justify-center">
              <div class="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-dotted"></div>
              <div class="absolute inset-0 h-12 w-12 rounded-full border-4 border-gradient-to-r from-green-400 to-blue-500"></div>
            </div>
          </div>
          
        );
        
    }
    if(user){
        return children;
    }
    return (
        <Navigate state={location.pathname} to={`/signIn`}></Navigate>
    )
}

export default PrivateRoutes;
