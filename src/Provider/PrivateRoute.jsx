import React, { use } from 'react';
import { Authcontext } from './AuthProvider';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(Authcontext)
   
    if(loading){
        return <div className="flex justify-center">
            <span className="loading loading-spinner text-info min-h-screen items-center w-20"></span>
        </div>
    }
     
    if (user && user?.email) {
        return children
    }
    return <Navigate to='/login'></Navigate>




};

export default PrivateRoute;