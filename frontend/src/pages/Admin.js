import { useState } from 'react'
import { UseAuthContext } from '../hooks/UseAuthContext'
import NotFound from '../components/404'
import Users from '../components/admin/Users'
import Products from '../components/admin/Products'
import { Link } from 'react-router-dom'
import Roles from '../components/admin/roles'
import Pending from '../components/admin/Pending'

const Admin = () => {

    const {isAdmin,user} = UseAuthContext()
    const [currentmode,setCurrentmode] = useState('Users')

    return ( 
        <div className="container-lg">
        { 
            isAdmin 
                
            ? 
            
            <div className="bg-light">
        
            <div className="container-lg ">
                     <div className="row justify-content-center">
                         <div className="col-12 col-lg-8">
                             {currentmode === 'Users' ? <Users /> : null}
                             {currentmode === 'Products' ? <Products /> : null}
                             {currentmode === 'Roles' ? <Roles /> : null}
                             {currentmode === 'Pending' ? <Pending /> : null}

         
                         </div>
                         <div className="col-9 col-lg-4 border mt-3 mt-lg-0 ">
                             <div className="p-2">
                                 <p className="lead text-center mt-3"><span className="text-danger h5">ادمین</span> عزیز خوش آمدید <strong>{user.name}</strong></p>
                                 <ul className="list-group text-center">
                                     <li 
                                        style={{borderColor : currentmode === 'Users' ? 'blue' : null , 
                                        color : currentmode === 'Users' ? 'blue' : null}} 
                                        onClick={() => setCurrentmode('Users')} 
                                        className="list-item btn btn-outline-secondary mt-4 "
                                    >
                                        لیست کاربران <i className="bi bi-file-earmark-plus"></i>
                                    </li>
                                    <li 
                                        style={{borderColor : currentmode === 'Products' ? 'blue' : null , 
                                        color : currentmode === 'Products' ? 'blue' : null}} 
                                        onClick={() => setCurrentmode('Products')} 
                                        className="list-item btn btn-outline-secondary mt-4 "
                                    >
                                        لیست محصولات  <i className="bi bi-file-earmark-plus"></i>
                                    </li>
                                    <li 
                                        style={{borderColor : currentmode === 'Roles' ? 'blue' : null , 
                                        color : currentmode === 'Roles' ? 'blue' : null}} 
                                        onClick={() => setCurrentmode('Roles')} 
                                        className="list-item btn btn-outline-secondary mt-4 "
                                    >
                                        لیست ادمین ها   <i className="bi bi-file-earmark-plus"></i>
                                    </li>
                                    <li 
                                        style={{borderColor : currentmode === 'Pending' ? 'blue' : null , 
                                        color : currentmode === 'Pending' ? 'blue' : null}} 
                                        onClick={() => setCurrentmode('Pending')} 
                                        className="list-item btn btn-outline-secondary mt-4 "
                                    >
                                        محصولات در انتظار تایید  <i className="bi bi-file-earmark-plus"></i>
                                    </li>
                                    <Link 
                                        to= '/'
                                        className="list-item btn btn-outline-secondary mt-4 "
                                    >
                                        بازگشت <i className="bi bi-file-earmark-plus"></i>
                                    </Link>
         
                                 </ul>
                             </div>
                         </div>
                     </div>
                 </div>
               </div>
            
            :

            <NotFound />

        }
        </div>
     );
}
 
export default Admin;