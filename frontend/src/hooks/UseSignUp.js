import { useState } from "react"
import { UseAuthContext } from "./UseAuthContext"


export const UseSignup = () => {
    const [error,setError] = useState(null)
    const [isloading,setIsloading] = useState(null)
    const { dispatch } = UseAuthContext()
    
    const signup = async (name,lastname,email,password) => {
        setIsloading(true)
        setError(null)
        const response = await fetch('/api/user/signup',{
            method : 'POST',
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({name,lastname,email,password})
        })
        const json = await response.json()

        if(!response.ok){
            setIsloading(false)
            setError(json.error)
        }
        if (response.ok){
            // importing to local storage
            localStorage.setItem('user',JSON.stringify(json))

            setIsloading(false)
            setError(null)
            dispatch({type:"LOGIN",payload:json})

        }
    }

    return {error,isloading,signup}
}