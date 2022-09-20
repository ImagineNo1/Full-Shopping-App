import { useState } from "react"
import { UseAuthContext } from "./UseAuthContext"


export const UseLogin = () => {
    const [error,setError] = useState(null)
    const [isloading,setIsloading] = useState(null)
    const { dispatch } = UseAuthContext()

    const login = async (email,password) => {
        setIsloading(true)
        setError(null)
        const response = await fetch('/api/user/login',{
            method : 'POST',
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({email,password})
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

            const checkAdmin = async () => {
                const response = await fetch('/api/admin/verify',{
                    method : 'POST',
                    headers : {
                        'Authorization' : `Bearer ${json.token}`
                    }
                })
                if (response.ok){
                    dispatch({type:"SET_ADMIN"})
                }
            }
            checkAdmin()
        }
    }

    return {error,isloading,login}
}