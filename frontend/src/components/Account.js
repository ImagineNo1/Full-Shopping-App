import { useState } from 'react';
import {UseAuthContext} from '../hooks/UseAuthContext'


const Account = () => {
    const {user,dispatch} = UseAuthContext()
    const [isediting,setIsediting] = useState(false)
    const [name,setName] = useState(user.name)
    const [lastname,setLastName] = useState(user.lastname)
    const [email,setEmail] = useState(user.email)
    const [password,setPassword] = useState('')
    const [isshow,setIsshow] = useState(false)
    const [error,setError] = useState(null)
    const [isloading,setIsloading] = useState(false)
    const [isdone ,setIsdone] = useState(false)

    const EditAccount = async(e) => {

        e.preventDefault()

        setIsloading(true)
      
        if (name === "" ){
            setName(user.name)
        }
        if (lastname === ""){
            setLastName(user.lastname)
        }
        if (email === ""){
            setEmail(user.email)
        }
        if (password === "" || !password){
            setPassword(user.password)
        }
        const response = await fetch(`api/user/update/${user.user_id}`,{
            method : 'PATCH',
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({name,lastname,email,password})
        })
        const json = await response.json()

        if (!response.ok){
            setIsloading(false)
            setError(json.error)
            setTimeout(()=>{
                setError(null)
            },3000)
        }
        if(response.ok){
            setIsloading(false)
            setIsdone(true)
            setTimeout(()=>{

                localStorage.removeItem('user')
                dispatch({ type: 'LOGOUT' })

            },5000)
        }
    }

    return ( 
        <div className="container border">
            <h5 className="text-end pt-3 pe-3 mb-4">حساب کاربری من </h5>
            <p className='text-end lead mt-3'><span className='h5'>{user.name}</span> : نام  </p>
            <p className='text-end lead'> <span className='h5'>{user.lastname}</span> : نام خانوادگی </p>
            <p className='text-end lead'> <span className='h5'>{user.email}</span> : ایمیل </p>
            {
                !isediting 
                ?
                    <button 
                        onClick={() => setIsediting(true)} 
                        // style={ isediting ? {display : 'none'} : {display : 'block'}} 
                        className='btn btn-outline-primary btn-lg fw-btn my-5'>
                        ویرایش حساب کاربری
                    </button>
                 :
                    <div>
                        <form onSubmit={EditAccount} className="mt-5">
                            <div className="text-end">
                                <label className="form-label lead">نام</label>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
                                <input type="text" 
                                    className="form-control" 
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                 />
                        </div>
                        <div className="text-end">
                             <label className="form-label mt-3 lead">نام خانوادگی</label>
                        </div>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
                            <input type="text" 
                                className="form-control" 
                                value={lastname}
                                onChange={(e)=>setLastName(e.target.value)}
                            />
                        </div>
                        <div className="text-end">
                            <label className="form-label mt-3 lead">ایمیل </label>
                        </div>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                            <input type="email" 
                        className="form-control" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                        </div>

                        <div className="text-end">
                        <span>
                                {isshow ? 
                                <i onClick={() =>setIsshow(false)}  className="bi bi-eye-slash-fill"></i> 
                                : 
                                <i onClick={() =>setIsshow(true) }className="bi bi-eye"></i>  
                                }
                            </span>
                            <label className="form-label mt-3 lead">رمز عبور جدید</label>
                        </div>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-lock"></i></span>
                            <input type={isshow ? 'text' : 'password'} 
                                className="form-control" 
                                placeholder="در صورت تمایل به تغییر رمز این فیلد را پر کنید"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                       

                        <button 
                            style={ isdone ? {display : 'none'} : {display : 'block'}}
                            disabled={ isdone} 
                            className="btn btn-lg btn-primary my-3 fw-btn mt-4">
                            {isloading ? "در حال ویرایش حساب" : "ویرایش حساب" }
                        </button>

                        


                    </form>
                        <button
                                style={ isdone ? {display : 'none'} : {display : 'block'}}
                                disabled={ isdone}
                                onClick={() => setIsediting(false)}
                                className='btn btn-lg btn-outline-secondary fw-btn'
                            >
                                برگشت
                        </button>
                        {error && (
                            <div className='border border-3 border-danger my-2 text-center'>
                                <p className='p-1 text-secondary'>{error}</p>
                            </div>
                        )}
                        {isdone && (
                            <div className='bg-success my-2 text-center'>
                                <p className='p-3'>"حساب کاربری شما با موفقیت ویرایش شد ! تا 5 ثانیه دیگر از حساب خود خارج می شوید"</p>
                            </div>
                        )}
                    </div>
            }

        </div>
     );
}
export default Account;