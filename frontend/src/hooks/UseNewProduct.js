import { useState } from "react"
import { UseAuthContext } from "./UseAuthContext"
import {UseProductContext} from './UseProductContext'

export const UseNewProduct = () => {
    const [error,setError] = useState(null)
    const [isloading,setIsloading] = useState(false)
    const {user} = UseAuthContext()
    const {dispatch} = UseProductContext()

    const NewProduct = async (title,about,price,category,number,instagram,telegram) => {
        setIsloading(true)
        setError(null)

        
        const response =  await fetch('/api/products',{
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                'Authorization' : `Bearer ${user.token}`
            },
            body : JSON.stringify({title,about,price,category,number,instagram,telegram})
        })
        const json = await response.json()

        if (response.ok){
            setIsloading(false)
            dispatch({type : "CREATE_PRODUCT",payload : json})
        }
        if (!response.ok){
            setIsloading(false)
            setError(json.error)
        }
    }

    return {error,isloading,NewProduct,setIsloading}
}