import React, { createContext, use, useEffect, useState } from 'react';
 export const Authcontext = createContext()
 import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../Firebase/firebase.config';
const AuthProvider = ({ children }) => {
    const auth = getAuth(app)
   const [user,setUser] = useState(null)
    console.log(user)
   const  createUser= (email,password) => {
    return createUserWithEmailAndPassword(auth,email,password)

   }
  useEffect(() => {
   const observer =onAuthStateChanged(auth,(currentUser) => {
        setUser(currentUser)

    })
    return () => {
     observer()
    }
  },[])









   const authData = {
    user,
    setUser,
    createUser,
   }

    return <Authcontext value={authData}>{children}</Authcontext>
};

export default AuthProvider;