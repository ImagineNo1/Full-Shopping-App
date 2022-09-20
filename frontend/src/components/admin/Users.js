import { useEffect, useState } from "react";
import Loading from '../Loading'
import {UseAuthContext} from '../../hooks/UseAuthContext'
import {UseProductContext} from '../../hooks/UseProductContext'


const Users = () => {

    
    const [isloading,setIsloading] = useState(true)
    const {user} = UseAuthContext()
    const {users,dispatch} = UseProductContext()
    const [delloading,setDelloading] = useState(false)
    const [promoteloading,setPromoteloading] = useState(false)
    const [demoteloading,setDemoteloading] = useState(false)

    const confirmisson = (id) => {
        if(window.confirm('آیا از حذف این کاربر اطمینان دارید ؟')){
            deleteUser(id)
        }
    }
    const promoteConfirm = (id) => {
        if(window.confirm('آیا از ارتقا این کاربر به سمت ادمین اطمینان دارید ؟')){
            promoteUser(id)
        }
    }    
    const demoteConfirm = (id) => {
        if(window.confirm('آیا از انزال این ادمین به سمت کاربر عادی اطمینان دارید ؟')){
            demoteUser(id)
        }
    }
    
    const deleteUser = async (id) => {
        setDelloading(true)
        const response = await fetch(`/api/admin/deluser/${id}`,{
            method : 'DELETE',
            headers : {
                'Authorization'  : `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok){
            window.alert(json.error)
            setDelloading(false)
        }
        if (response.ok){
            dispatch({type : 'DELETE_USER',payload : json})
            setDelloading(false)
        }
    }
    const promoteUser = async (id) => {
        setPromoteloading(true)
        const response = await fetch(`/api/admin/promote/${id}`,{
            method : 'POST',
            headers : {
                'Authorization'  : `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        
        if (!response.ok){
            window.alert(json.error)
            setPromoteloading(false)
        }
        if (response.ok){
            dispatch({type:'SET_USERS',payload:json})
            setPromoteloading(false)
        }
    }
    const demoteUser = async (id) => {
        setDemoteloading(true)
        const response = await fetch(`/api/admin/demote/${id}`,{
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
            dispatch({type:'SET_USERS',payload:json})
            setDemoteloading(false)
        }
    }
    useEffect(()=>{
        const getUsers = async()=>{

            const response = await fetch('/api/admin/users',{
                headers : {
                    'Authorization'  : `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET_USERS',payload:json})
                setIsloading(false)
            }
        }
            getUsers()
    },[])

    return ( 
        <div className="container border border-primary">
            <p className="text-end pt-2 pe-2 display-6">لیست کاربران</p>
            <hr />
            {isloading ?

                <Loading />

                :

                <div className="row justify-content-center">
                    {users && users.map((u) => (
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
                                    {/* <span className="h5">{u.password}</span> : <span className="lead">رمز عبور</span>
                                    <hr />  */}

                                    
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
                                        {u.isAdmin 

                                            ?
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
                                            :
                                            <div>
                                                {!u.isOwner && (
                                                    <button 
                                                          disabled = {promoteloading}
                                                          onClick={() => promoteConfirm(u._id)}
                                                        className="btn btn-outline-success fw-btn p-2 mb-2"
                                                    >
                                                       {promoteloading ? "در حال ارتقا رتبه به ادمین " : "ارتقا رتبه به ادمین"}
                                                    </button>
                                                )}
                                            </div>
                                        }

                                </div>
                                <div className="card-text">
                                    {!u.isOwner && (
                                        <button 
                                             disabled = {delloading}
                                             onClick={() => confirmisson(u._id)}
                                             className="btn btn-outline-danger fw-btn p-2"
                                        >
                                            {delloading ? "در حال حذف کاربر" : "حذف کاربر"}
                                        </button>
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
 
export default Users;