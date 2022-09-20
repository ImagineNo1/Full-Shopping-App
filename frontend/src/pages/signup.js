import { useState } from "react";
import { Link } from "react-router-dom";
import {UseSignup} from '../hooks/UseSignUp'

const Signup = () => {
    const [name,setName] = useState('')
    const [lastname,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {error,isloading,signup} = UseSignup()
    const [isshow,setIsshow] = useState(false)

    const pressHandler = async (e) => {
        e.preventDefault()

        await signup(name,lastname,email,password)
        
    }
    return ( 
        <div className="container-lg">
            <div className="row justify-content-center align-items-center">
                <div className="col-5">
                    <form onSubmit={pressHandler} className="mt-5">
                        <div className="text-end">
                          <label className="form-label lead">نام</label>
                        </div>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
                            <input type="text" 
                                className="form-control" 
                                placeholder="e.g. Amir"
                                required
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
                                placeholder="e.g. Ahmadi"
                                required
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
                            <label className="form-label mt-3 lead">رمز عبور </label>
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
                       

                        <button disabled={isloading} className="btn btn-lg btn-primary my-3 fw-btn mt-4">{isloading ? "در حال ساخت ...":"ثبت نام" }</button>
                        {error && <div className="my-3 text-danger">{error}</div>}
                        <Link className="d-block fs-5 text-end" to="/login">حساب کاربری دارید ؟ وارد شوید</Link>

                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default Signup;