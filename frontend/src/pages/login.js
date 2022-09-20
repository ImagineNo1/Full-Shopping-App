import { useState } from "react";
import { Link } from "react-router-dom";
import {UseLogin} from "../hooks/UseLogin"

const Login = () => {
    
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {error,isloading,login} = UseLogin()
    const [isshow,setIsshow] = useState(false)


    const pressHandler = async(e) => {
        e.preventDefault()
        await login(email,password)
    }

    return ( 
        <div className="container-lg">
            <div className="row justify-content-center align-items-center">
                <div className="col-5">
                    <form onSubmit={pressHandler} className="mt-5">
                        <div className="text-end">
                            <label className="form-label mt-3 lead">ایمیل  </label>
                        </div>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                            <input type="email" 
                        className="form-control" 
                        placeholder="e.g.test@gmail.com"
                        required
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
                             <label className="form-label mt-3 lead text-end">رمز عبور </label>
                        </div>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-lock"></i></span>
                            <input type={isshow ? 'text' : 'password'}
                                className="form-control" 
                                placeholder="e.g. #242231dajd@"
                                required
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                            
                            
                          

                        </div>

                        
                        <button disabled={isloading} className="btn btn-lg btn-primary my-3 fw-btn mt-4">{isloading ? "در حال ورود": "ورود"}</button>
                        {error && <div className="my-3 text-danger">{error}</div>}
                        <Link className="d-block fs-5 text-end" to="/signup">حساب کاربری ندارید ؟ ثبت نام کنید </Link>


                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default Login;