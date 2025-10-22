import React, { createContext, useEffect, useState } from 'react';
 export const Authcontext = createContext()
 import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../Firebase/firebase.config';
const AuthProvider = ({ children }) => {
    const auth = getAuth(app)
   const [user,setUser] = useState(null)
   const [loading,setLoading] = useState(true)
    console.log(user,loading)
   const  createUser= (email,password) => {
    return createUserWithEmailAndPassword(auth,email,password)

   }

 const login = (email,password) => {
    return signInWithEmailAndPassword(auth,email,password)
 } 


const updateUser = (updateddata) => {
  return updateProfile(auth.currentUser , updateddata)

}

  const logOut = () => {
    return signOut(auth)
  } 
  
  const googleSignin = (googleprovider) => {
    return signInWithPopup(auth,googleprovider)
  }
 
  const forgetpassword = (email) => {
    return sendPasswordResetEmail(auth,email)
  }

  useEffect(() => {
   const observer =onAuthStateChanged(auth,(currentUser) => {
        setUser(currentUser)
        setLoading(false)

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
    loading,
    setLoading,
    updateUser,
    forgetpassword,
   }

    return <Authcontext value={authData}>{children}</Authcontext>
};

export default AuthProvider;