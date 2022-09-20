import { useState ,useEffect } from "react"
import {UseAuthContext} from '../../hooks/UseAuthContext'
import {UseProductContext} from '../../hooks/UseProductContext'
import Loading from '../Loading'

const Roles = () => {

    const [demoteloading,setDemoteloading] = useState(false)
    const {user} = UseAuthContext()
    const {admins,dispatch} = UseProductContext()
    const [isloading,setIsloading] = useState(true)
    
    
    const demoteConfirm = (id) => {
        if(window.confirm('آیا از انزال این ادمین به سمت کاربر عادی اطمینان دارید ؟')){
            demoteUser(id)
        }
    }
    const demoteUser = async (id) => {
        setDemoteloading(true)
        const response = await fetch(`/api/admin/demoteAdmins/${id}`,{
            method : 'POST',
            headers : {
                'Authorization'  : `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok){
            window.alert(json.error)
            setDemoteloading(false)
        }
        if (response.ok){
            dispatch({type:'DEL_ADMIN',payload:json})
            setDemoteloading(false)
        }
    }

    useEffect(()=>{
        const getAdmins = async()=>{

            const response = await fetch('/api/admin/admins',{

                headers : {
                    'Authorization'  : `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET_ADMINS',payload:json})
                setIsloading(false)
            }
        }
            getAdmins()
    },[])

    return ( 
        <div className="container border border-primary">
            <p className="text-end pt-2 pe-2 display-6">ادمین ها </p>
            {isloading ? <Loading />
                :
                <div className="row justify-content-center">
                {admins && admins.map((u) => (
                    <div className="col-12 col-lg-9" key={u._id}>
                        <div className="card mb-3">
                            <div className="card-header text-center">
                                <span className="h3">{u.email} </span>
                            </div>
                            <div className="card-subtitle text-end my-2 pe-2">
                                <span className="h5">{u.name} </span>: <span className="lead">نام</span>
                                <hr />
                            </div>
                            <div className="card-text text-end pe-2 mb-1">
                                <span className="h5">{u.lastname}</span> : <span className="lead">نام خانوادگی</span> 
                                <hr/> 
                                <span className="h5">{u.email}</span> : <span className="lead">ایمیل</span> 
                                <hr /> 
                                
                            </div>
                            { u.isOwner && (
                                 <p className="text-end pe-2">
                                    <span className="h3 text-success ">مدیر سایت </span> 
                                </p>
                                
                            )}
                            
                            {u.isAdmin && !u.isOwner && (
                                   <p className="text-end pe-2">
                                        <span className="h3 text-danger">ادمین سایت</span> 
                                   </p>   
                            )}
                            <div className="card-text">
                                    {u.isAdmin && (
                                        <div>
                                            {!u.isOwner && (
                                                <button 
                                                  disabled = {demoteloading}
                                                    onClick={() => demoteConfirm(u._id)}
                                                 className="btn btn-outline-warning fw-btn p-2 mb-2"
                                                >
                                                {demoteloading ? "در حال انزال رتبه به کاربر عادی " : 
                                                "انزال رتبه به کاربر عادی "}
                                                </button>
                                            )}
                                        </div>
                                       
                                    )}

                            </div>
                        

                        </div>
                    </div>
                ))}
            </div>
            }
        </div>
     );
}
 
export default Roles;