import React, { use } from 'react';
import { Authcontext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(Authcontext)
   const location  = useLocation()
   console.log(location)
    if(loading){
        return <div className="flex justify-center">
            <span className="loading loading-spinner text-info min-h-screen items-center w-20"></span>
        </div>
    }
     
    if (user && user?.email) {
        return children
    }
    return <Navigate 
      state={location.pathname}
    to='/login'></Navigate>




};

export default PrivateRoute;