import { useState,useEffect } from "react";
import Loading from './Loading'
import {UseProductContext} from '../hooks/UseProductContext'
import pic from '../assets/2.jpg';
import { UseAuthContext } from "../hooks/UseAuthContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Opininos = () => { 

    const [isloading,setIsloading] = useState(true)
    const {comments,dispatch} = UseProductContext()
    const {user} = UseAuthContext()
    const [comloading,setComloading] = useState(false)
    const [comerror,setComerror] = useState(null)

    const RemoveComment = async (id) => {
        
        setComloading(true)
            const response = await fetch(`/api/products/comment/${id}`,{
                method : 'DELETE',
                headers : {
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            const json = await response.json()
    
            if (!response.ok){
                setComloading(false)
                setComerror(json.error)
                setTimeout(()=>{
                    setComerror(null)
                },2000)
            }
            if (response.ok) {
                dispatch({type : "REMOVE_COMMENT" , payload : json})
                setComloading(false)
            }
 
    }

    useEffect(()=>{
        const getUserComments = async () => {
            
            const response = await fetch('/api/products/comment',{
                method : 'POST',
                headers : {
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            const json = await response.json()
    
            if (response.ok) {
                dispatch({type : "SET_COMMENTS" , payload : json})
                
                setIsloading(false)
            }

            
        }
        getUserComments()
    },[])
    return ( 
        <div className="container border border-primary">
            <h5 className="text-end pt-3 pe-3">دیدگاه های من  </h5>
            {
                isloading 
                ?

                <Loading />
                
                :

                <div> 
                    {comments && comments.map((p)=>(
                        <div className="row justify-content-center" key={p._id}>
                            <div className="col-12 col-md-8 my-3 " >
                                <div className="card">
                                    <div className="card-header"><img src={pic} style={{width : "100%" , height : "100%"}} /></div>
                                    <div className="card-body">
                                        <div className="card-title text-end">{p.title}</div>
                                        <div className="card-subtitle text-end my-2">قیمت : {p.price} هزار تومان</div>
                                        <div className="card-text text-end mb-2">
                                            {formatDistanceToNow(new Date(p.createdAt), { addSuffix: true })}
                                        </div>
                                        {(p.comments) 
                                            ?

                                            <div className="card-text ">
                                                {(p.comments).map((c) => (
                                                    <div className="text-end">
                                                    { c.user == user.user_id && (
                                                        <div className="border border-2 custom-redius">
                                                            <h6 className="pt-2 pe-2 pb-0 lead">: نظر شما </h6> 
                                                            <div className=" d-flex justify-content-between">
                                                                <p 
                                                                    onClick={!comloading ? () => RemoveComment(p._id) : null}
                                                                    className="text-danger ps-4 fs-5 btn"
                                                                >
                                                                    <i className="bi bi-trash-fill"></i>
                                                                </p>
                                                                <p className="pe-2 pt-2">{c.comment}</p>
                                                                
                                                            </div> 
                                                        </div>
                                                    )}

                                                    </div>
                                                ))}
                                            </div>
                                            :

                                            null
                                        }
                                            {comerror && (
                                                <div className="border border-2 border-danger mt-2 text-center">
                                                    <p className="p-1">{comerror}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                                ))}
                </div>
            }
        </div>
     );
}
 
export default Opininos;