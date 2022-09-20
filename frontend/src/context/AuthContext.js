import { useEffect } from "react";
import { createContext , useReducer } from "react";

export const AuthContext = createContext()

export const AuthReducer = (state,action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                user : action.payload,
                isAdmin : state.isAdmin
            }
        case 'LOGOUT' :
            return {
                user : null,
                isAdmin : null

            }
        case 'SET_ADMIN' :
            return {
                user : state.user,
                isAdmin : true
            }
        default: 
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(AuthReducer,{
        user : null,
        isAdmin : null
    })

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))

        if (user){

            dispatch({type:"LOGIN",payload:user})
            
            const checkAdmin = async () => {
                const response = await fetch('/api/admin/verify',{
                    method : 'POST',
                    headers : {
                        'Authorization' : `Bearer ${user.token}`
                    }
                })
                if (response.ok){
                    dispatch({type:"SET_ADMIN"})
                }
            }
            checkAdmin()
        }

            
        
    },[dispatch])

    return ( 
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}