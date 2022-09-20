import { createContext ,useReducer } from "react";


export const ProductContext = createContext()

export const productReduces = (state,action) =>{
    switch(action.type){
        case 'SET_PRODUCTS' :
            return {
                products : action.payload,
            }
        case 'SET_PRODUCT' :
            return {
                product : action.payload,
            }
        case 'SET_LIKES' :
            return {
                likes : action.payload
            }
        case 'REMOVE_LIKE' :
            return {
                likes : state.likes.filter((p) => p._id !== action.payload._id)
            }
        case 'SET_COMMENTS' :
            return {
                comments : action.payload
            }
        case 'REMOVE_COMMENT' :
            return {
                comments : state.comments.filter((p) => p._id !== action.payload._id)
            }
        case 'SET_USERS':
            return {
                users : action.payload
            }
        case 'DELETE_USER':
            return {
                users : state.users.filter((u) => u._id !== action.payload._id)
            }
        case 'ADMIN_PRODUCTS':
            return {
                adminProducts : action.payload
            }
        case 'ADMIN_DEL_PRODUCT':
            return {
                adminProducts : state.adminProducts.filter((p) => p._id !== action.payload._id)
            }
        case 'SET_PENDINGS':
            return {
                pending : action.payload
            }
        case 'DEL_PENDING':
            return {
                pending : state.pending.filter((p) => p._id !== action.payload._id)
            }
        case 'SET_ADMINS':
            return {
                admins : action.payload
            }
        case 'DEL_ADMIN':
            return {
                admins : state.admins.filter((p) => p._id !== action.payload._id)
            }
        default: 
            return state
    }
}

export const ProductContextProvider = ({children}) => {


    const [state,dispatch] = useReducer(productReduces,{
        products : null,
        product : null ,
        likes : null,
        comments : null,
        users : null,
        adminProducts : null,
        pending : null,
        admins : null
    })
    


    return (
        <ProductContext.Provider value={{...state,dispatch}}>
            {children}
        </ProductContext.Provider>
    )
}