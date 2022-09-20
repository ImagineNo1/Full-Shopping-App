import { useState ,useEffect } from "react"
import { UseAuthContext } from "../hooks/UseAuthContext"
import Loading from "./Loading"
import {UseProductContext} from '../hooks/UseProductContext'

import pic from '../assets/2.jpg';
import { Link } from "react-router-dom";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'



const MyLikes = () => {


    const {user} = UseAuthContext()
    const [isloading,setIsloadig] = useState(true)
    const {likes,dispatch} = UseProductContext()
    const [error,setError] = useState(null)
    const [addintresting,setAddintresting] = useState(false)

    const RemoveIntresting = async(id) => {
        setAddintresting(true)
        const response = await fetch(`/api/products/interests/${id}`,{
            method : 'DELETE',
            headers : {
                'Authorization' : `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        
        if (!response.ok){
            setError('شما این محصول را لایک نکرده اید ')
        }
        if (response.ok){
            setAddintresting(false)
            dispatch({type:'REMOVE_LIKE',payload:json})
        }

    }
    useEffect(()=>{
        const getUserLikes = async () => {
            const response = await fetch('/api/products/interests',{
                method : 'POST',
                headers : {
                    'Authorization' : `Bearer ${user.token}`
                }
                })
                const json = await response.json()
                if (!response.ok){
                    setError(json.error)
                }
                if(response.ok){
                    setIsloadig(false)
                    dispatch({type:'SET_LIKES',payload:json})
    
                }
    
            
        }
        getUserLikes()
    },[user])

    return ( 
        <div className="likes">
            <div className="container border border-primary">
                <h5 className="text-end pt-3 pe-3">علاقه مندی های من  </h5>
                {isloading && <Loading />}
            
                {!isloading && (
                    <div>
                        {error && <div>{error}</div>}
                        {likes && likes.map((p)=>(
                            <div className="row justify-content-center"  key={p._id}>
                                    <div className="col-12 col-md-8 my-3 ">
                                    <div className="card">
                                        <div className="card-header"><img src={pic} style={{width : "100%" , height : "100%"}} /></div>
                                        <div className="card-body">
                                            <div className="card-title text-end">{p.title}</div>
                                            <div className="card-subtitle text-end my-2">قیمت : {p.price} هزار تومان</div>
                                            <div className="card-text text-end mb-2">{formatDistanceToNow(new Date(p.createdAt), { addSuffix: true })}</div>

                                            
                                            <button 
                                                    disabled={addintresting} 
                                                    onClick={() => RemoveIntresting(p._id)} 
                                                    className="btn btn-outline-danger me-2 mb-2 fw-btn"> 
                                                    برای حذف از علاقه مندی ها کلیک کنید  <i className="bi bi-heart-fill"></i>
                                                </button>
                                                <Link to={`/details/${p._id}`} className="btn btn-lg btn-secondary me-2 fw-btn">مشاهده محصول </Link>
                                            
                                        {error && (
                                            <div className="bg-danger my-2">
                                                <p className="p-3 text-secondary lead">{error}</p>
                                            </div>
                                        )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                                ))}
                    </div>

                    )}
                        
        
              

            </div>
        </div>

     );
}
 
export default MyLikes;