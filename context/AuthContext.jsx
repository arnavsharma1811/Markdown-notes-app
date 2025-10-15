
'use client'

import { auth } from "@/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect } from "react"
import { useState } from "react";

const AuthContext = createContext()
export function useAuth () {
    return (useContext(AuthContext))
}
export default function AuthProvider (props){
    const {children} = props;
    const [currentUser, setCurrentUser] = useState (null);
    const [isLoadingUser, setisLoadingUser] = useState(true);
   
   function signUp ( email, password){
    return (
        createUserWithEmailAndPassword(auth,email,password)
    )
   }
    function login(email, password){
        return (
            signInWithEmailAndPassword(auth,email,password)
        )
    }
    function logout (){
        setCurrentUser(null);
        return signOut(auth);
    }
  
   
   
   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        console.log('Authenticating user...')
        setisLoadingUser(true)
        try {
         setCurrentUser(user)

         if(!user) {
            throw Error ('no user found')
         }
        }
        catch (err){
            console.log(err.message)
        }
        finally {
            setisLoadingUser(false);
        }
    })

    return unsubscribe
    }, [])
   
   
   
   
    const value = {
        currentUser,
        isLoadingUser,
        signUp,
        login,
        logout
    }
return (<AuthContext.Provider value = {value}>
    {children}
    </AuthContext.Provider>) 
    

}