import { useState ,useEffect } from "react"
import {UseProductContext} from '../../hooks/UseProductContext'
import Loading from '../Loading'
import {UseAuthContext} from '../../hooks/UseAuthContext'
import picture from '../../assets/2.jpg'


const Pending = () => {
    const {pending,dispatch} = UseProductContext()
    const [isloading,setIsloading] = useState(true)
    const [ispublishing,setIspublishing] = useState(false)
    const [delloading,setDelloading] = useState(false)

    const {user} = UseAuthContext()

    const publishConfirm = (id) => {
        if (window.confirm ('آیا از انتشار این محصول اطمینان دارید ؟')){
            publishProduct(id)
        }
    }
    const deleteConfirm = (id) => {
        if (window.confirm ('آیا از حذف این محصول اطمینان دارید ؟')){
            deleteProduct(id)
        }
    }
    const publishProduct = async (id) => {
        setIspublishing(true)
        const response = await fetch(`/api/admin/publishPending/${id}`,{
            method : 'POST',
            headers : {
                'Authorization'  : `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok){
            window.alert(json.error)
            setIspublishing(false)
        }
        if (response.ok){
            dispatch({type : 'DEL_PENDING',payload : json})
            setIspublishing(false)
        }
    }
    const deleteProduct = async (id) => {
        setDelloading(true)
        const response = await fetch(`/api/admin/delproduct/${id}`,{
            method : 'DELETE',
            headers : {
                'Authorization'  : `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok){
            dispatch({type : 'ADMIN_DEL_PRODUCT',payload : json})
            setDelloading(false)
        }
    }
    useEffect(()=>{
        const getProducts = async()=>{

            const response = await fetch('/api/admin/pending',{
                headers : {
                    'Authorization'  : `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET_PENDINGS',payload:json})
                setIsloading(false)
            }
        }
            getProducts()
    },[])

    return ( 
        <div className="container border border-primary">
            <p className="text-end pt-2 pe-2 display-6">در انتظار تایید</p>
            {isloading 
                
                ?

                <Loading />

                :

                <div className="row justify-content-center">
                    {pending && pending.map((p) => (
                        <div className="col-12 col-lg-9" key={p._id}>
                            <div className="card mb-3">
                                <div className="card-header">
                                    <img src={picture} alt="Photo" style={{width : '100%' , height : '100%'}}/>
                                </div>
                                <div className="card-header text-center">
                                    <span className="display-6">{p.title} </span>
                                </div>
                                <div className="card-subtitle text-end my-2 pe-2">
                                    <span className="h5">{p.price} </span>: <span className="lead">قیمت</span>
                                    <hr />
                                </div>
                                <div className="card-text text-end pe-2 mb-3">
                                    <span className="h5">{p.instagram}</span> : <span className="lead">اینستاگرام</span> 
                                    <hr/> 
                                    <span className="h5">{p.telegram}</span> : <span className="lead">تلگرام</span> 
                                    <hr /> 
                                    <span className="h5">{p.about}</span> : <span className="lead">درباره</span>
                                    <hr /> 
                                    <span className="h5">{(p.interests).length}</span> <i className="bi bi-heart-fill text-danger"></i>
                                </div>
                                <div className="card-text">
                                    <button 
                                            disabled = {ispublishing}
                                            onClick={() => publishConfirm(p._id)}
                                            className="btn btn-outline-success fw-btn p-2"
                                        >
                                            {ispublishing ? "در حال تایید و انتشار محصول" : "تایید و انتشار محصول"}
                                    </button>
                                    <button 
                                        disabled = {delloading}
                                        onClick={() => deleteConfirm(p._id)}
                                        className="btn btn-outline-danger fw-btn p-2 my-2"
                                    >
                                        {delloading ? "در حال حذف محصول" : "حذف محصول"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
            }
        </div>
     );
}
 
export default Pending;