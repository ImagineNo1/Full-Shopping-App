import { UseAuthContext } from "../hooks/UseAuthContext";
import { useState } from "react";

// import components

import Account from "../components/Account";
import AddProduct from "../components/AddProduct";
import Opininos from "../components/Opinions";
import Orders from "../components/Orders";
import MyProducts from "../components/MyProducts";
import Logout from "../components/Logout";
import MyLikes from "../components/MyLikes";



const PersonalPage = () => {
    const {user} = UseAuthContext()
    const [currentmode,setCurrentmode] = useState('AddProduct')


    return ( 
        
      <div className="bg-light">
        
   <div className="container-lg ">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    {currentmode === 'AddProduct' ? <AddProduct setCurrentmode={setCurrentmode} /> : null}
                    {currentmode === 'Orders' ? <Orders /> : null}
                    {currentmode === 'MyProducts' ? <MyProducts /> : null}
                    {currentmode === 'Opininos' ? <Opininos /> : null}
                    {currentmode === 'Account' ? <Account /> : null}
                    {currentmode === 'MyLikes' ? <MyLikes /> : null}
                    {currentmode === 'Logout' ? <Logout setCurrentmode = {setCurrentmode} /> : null}

                </div>
                <div className="col-9 col-lg-4 border mt-3 mt-lg-0 ">
                    <div className="p-2">
                        <p className="lead text-center mt-3">عزیز خوش آمدید <strong>{user.name}</strong></p>
                        <ul className="list-group text-center">
                            <li style={{borderColor : currentmode === 'AddProduct' ? 'blue' : null , color : currentmode === 'AddProduct' ? 'blue' : null}} onClick={() => setCurrentmode('AddProduct')} className="list-item btn btn-outline-secondary mt-4 ">افزودن محصول  <i className="bi bi-file-earmark-plus"></i></li>
                            <li style={{borderColor : currentmode === 'Orders' ? 'blue' : null,color : currentmode === 'Orders' ? 'blue' : null}} onClick={() => setCurrentmode('Orders')} className="list-item btn btn-outline-secondary mt-4">سفارشات من  <i className="bi bi-basket"></i></li>
                            <li style={{borderColor : currentmode === 'MyProducts' ? 'blue' : null,color : currentmode === 'MyProducts' ? 'blue' : null}} onClick={() => setCurrentmode('MyProducts')} className="list-item btn btn-outline-secondary mt-4"> محصولات من <i className="bi bi-cart"></i></li>
                            <li style={{borderColor : currentmode === 'Opininos' ? 'blue' : null,color : currentmode === 'Opininos' ? 'blue' : null}} onClick={() => setCurrentmode('Opininos')} className="list-item btn btn-outline-secondary mt-4">دیدگاه ها <i className="fa-solid fa-comment"></i></li>
                            <li style={{borderColor : currentmode === 'MyLikes' ? 'blue' : null,color : currentmode === 'MyLikes' ? 'blue' : null}} onClick={() => setCurrentmode('MyLikes')} className="list-item btn btn-outline-secondary mt-4">علاقه مندی ها <i className="bi bi-heart"></i></li>
                            <li style={{borderColor : currentmode === 'Account' ? 'blue' : null,color : currentmode === 'Account' ? 'blue' : null}} onClick={() => setCurrentmode('Account')} className="list-item btn btn-outline-secondary mt-4">اطلاعات حساب کاربری <i className="bi bi-person"></i></li>
                            <li style={{borderColor : currentmode === 'Logout' ? 'blue' : null,color : currentmode === 'Logout' ? 'blue' : null}} onClick={() => setCurrentmode('Logout')} className="list-item btn btn-outline-secondary mt-4">خروج از حساب کاربری <i className="bi bi-box-arrow-left"></i></li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </div>
           
        
     );
}
 
export default PersonalPage;