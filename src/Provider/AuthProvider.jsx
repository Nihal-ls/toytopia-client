import React, { createContext, useEffect, useState } from 'react';
 export const Authcontext = createContext()
 import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import app from '../Firebase/firebase.config';
const AuthProvider = ({ children }) => {
    const auth = getAuth(app)
   const [user,setUser] = useState(null)
    console.log(user)
   const  createUser= (email,password) => {
    return createUserWithEmailAndPassword(auth,email,password)

   }

 const login = (email,password) => {
    return signInWithEmailAndPassword(auth,email,password)
 } 

  const logOut = () => {
    return signOut(auth)
  } 
  
  const googleSignin = (googleprovider) => {
    return signInWithPopup(auth,googleprovider)
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
    logOut,
    login,
    googleSignin,
   }

    return <Authcontext value={authData}>{children}</Authcontext>
};

export default AuthProvider;