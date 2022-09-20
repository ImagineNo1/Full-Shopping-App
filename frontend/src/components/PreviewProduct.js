import { useState,useEffect } from "react"
import Loading from './Loading'
import {UseAuthContext} from '../hooks/UseAuthContext'
import pic from '../assets/2.jpg';

const PreviewProduct = ({id,product}) => {

    const [isloading,setIsloading] = useState(true)
    // const [product,setProduct] = useState(null)
    const {user} = UseAuthContext()
    const [isliked,setIsliked] = useState(null)
    const [addintresting,setAddintresting] = useState(false)
    const [likes,setLikes] = useState(null)


    const AddIntresting = async(id) => {
        setAddintresting(true)
        const response = await fetch(`/api/products/interests/${id}`,{
            method : 'PATCH',
            headers : {
                'Authorization' : `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok){
            setLikes((json.interests).length)
            setIsliked(true)
            setAddintresting(false)
        }

        
    }
    const RemoveIntresting = async(id) => {
        setAddintresting(true)
        const response = await fetch(`/api/products/interests/${id}`,{
            method : 'DELETE',
            headers : {
                'Authorization' : `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        
        if (response.ok){
            setLikes((json.interests).length)
            setIsliked(false)
            setAddintresting(false)
        }

    }

    useEffect(()=>{


            if(product){
                if (product.interests.includes(user.user_id)){
                    setIsliked(true)
                }
                setLikes((product.interests).length)
                setIsloading(false)

            }      
    },[user,id])

    return ( 
        <div className="container border border-primary">
            <p className="text-end lead pt-2 pe-2">مشاهده محصول </p>
            {
                isloading 

                ?

                <Loading /> 

                :

                <div className="card my-3">
                  <div className="card-header">
                    <img src={pic} alt='picture' style={{width : "100%" , height : "500px" }} />
                  </div>
                  <div className="card-header text-center">{product.title}</div>
                  <div className="card-body">
                     <div className="card-title text-end">دسته بندی : {product.category}</div>
                     <div className="card-subtitle text-end">
                        {product.instagram} : اینستاگرام
                        <br />
                        {product.telegram} : تلگرام
                     </div>
                     <div className="card-text text-end">{product.about}</div>
                    <div className="card-text" id="preview-buttons">
                            <button 
                                    style={isliked ? {backgroundColor : 'red' , color : 'white'} : {backgroundColor : null}}
                                    disabled={addintresting} 
                                    onClick={isliked ? () => RemoveIntresting(product._id)  : () => AddIntresting(product._id)} 
                                    className="btn btn-outline-danger me-2 mb-2 fw-btn mt-3"> 
                                    
                                    {isliked  ? 
                                            <span><i className="bi bi-heart-fill"></i> {likes}</span>
                                              :
                                            <span><i className="bi bi-heart"></i> {likes}</span> 
                                    }
                            </button>
                    </div>    


                
                  </div>
                </div>
            }
        </div>
     );
}
 
export default PreviewProduct;