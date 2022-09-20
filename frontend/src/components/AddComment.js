import { useState ,useEffect } from "react";
import {UseAuthContext} from '../hooks/UseAuthContext'
import {UseProductContext} from '../hooks/UseProductContext'
import Loading from './Loading'

const AddComment = ({id,product}) => {

    const[comment,setComment] = useState(null)
    const [comerror,setComerror] = useState(null)
    const [comloading,setComloading] = useState(false)
    const {user} = UseAuthContext()
    const {comments,dispatch} = UseProductContext()
    const [isloading,setIsloading] = useState(true)
    const [delcomloading,setDelcomloading] = useState(false)

    const PostComment = async () => {
        setComloading(true)
        const response = await fetch(`/api/products/comment/${id}`,{
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
                'Authorization' : `Bearer ${user.token}`
            },
            body : JSON.stringify({comment})
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
            dispatch({type : "SET_COMMENTS" , payload : json})
            setComloading(false)
        }
    }
    const RemoveComment = async () => {
        
        setDelcomloading(true)
            const response = await fetch(`/api/products/comment/${id}`,{
                method : 'DELETE',
                headers : {
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            const json = await response.json()
    
            if (response.ok) {
                dispatch({type : "SET_COMMENTS" , payload : json})
                setDelcomloading(false)
            }
 
    }

    useEffect(()=>{

        if(product){
            dispatch({type : "SET_COMMENTS" , payload : product})
                
            setIsloading(false)
        }

    },[])

    return ( 
        <div className="container border border-primary">
            { isloading

                ?

                <Loading />

                :
                
                <div>
                    <div className="text-end">
                        <label  className="form-label lead mt-3"> افزودن نظر</label>
                    </div>
                    <div className="input-group  mb-3">
                            <span className="input-group-text">
                                <i className="bi bi-pencil-square"></i>
                            </span>
                            <input 
                                type="text" 
                                value={comment}
                                maxLength = {50}
                                onChange={(e)=>setComment(e.target.value)}
                                className="form-control text-end" 
                                placeholder="نطر خود را به اشتراک بگذارید " />
                    </div>
                    { comment && (
                        <div>
                            <button
                                disabled ={comloading}
                                onClick={PostComment} 
                                className="btn btn-outline-success mb-3 fw-btn">
                                    {comloading ? "در حال انتشار" : "انتشار نظر "} 
                            </button>
                            {comerror && (
                                <div className="border border-2 border-danger mt-2 text-center">
                                    <p className="p-1">{comerror}</p>
                                </div>
                            )}
                        </div>
                    )}
                    <hr/>
                    <div className="text-end"> 
                                
                        <p className="lead">: نظرات </p>
                            {(comments.comments) 
                                    
                                    ?
                                    
                                    <div className="card-text ">
                                        {(comments.comments).map((c) => (
                                            <div className="text-end">
                                                { c.user == user.user_id 
                                                
                                                    ? 
                                                    (
                                                    <div className="border border-2 custom-redius mb-2">
                                                        <h6 className="pt-2 pe-2 pb-0 lead">: نظر شما </h6> 
                                                        <div className=" d-flex justify-content-between">
                                                            <p 
                                                                 onClick={!delcomloading ? RemoveComment : null}
                                                                className="text-danger ps-4 fs-5 btn"
                                                            >
                                                                 <i className="bi bi-trash-fill"></i>
                                                            </p>
                                                            <p className="pe-2 pt-2">{c.comment}</p>
                                                    
                                                        </div> 
                                                    </div>
                                                    

                                                    )
                                                    :
                                                    (
                                                        <div className="border border-2 custom-redius mb-2">
                                                             
                                                            <div className="text-end">
                                                                <p className="pe-2 pt-2">{c.comment}</p>
                                                        
                                                            </div> 
                                                        </div>
                                                        
    
                                                        )
                                                }

                                                </div>
                                            ))}
                                        </div>
                                    :

                                    null
                                    
                                    }

                    </div>
                </div>
            }
        </div>
     );
}
 
export default AddComment;