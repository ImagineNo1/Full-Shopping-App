import { UseLogout } from '../hooks/UseLogout'

const Logout = ({setCurrentmode}) => {

    const { logout } = UseLogout()
    
    const logoutHandler = () => {
        logout()
    }

    return ( 
        <div className="container border border-primary">
             <h5 className="text-end pt-3 pe-3">خروج از حساب کاربری </h5>
             <div className="row justify-content-center align-items-center">
                <div className="col-6">
                    <p className='pt-5 h5 mb-5'>آیا از خروج از حساب کاربری خود اطمینان دارید ؟</p>
                    <div className="row">
                        <div className="col-6 pb-5">
                            <button className="btn btn-lg btn-outline-success" onClick={()=>setCurrentmode('AddProduct')}>خیر </button>                 
                        </div>
                        <div className="col-6">
                            <button className="btn btn-lg btn-outline-danger" onClick={logoutHandler}>بله</button>    
                        </div>
                      
                    
                    </div>
                </div>

             </div>
        </div>
     );
}
 
export default Logout;
