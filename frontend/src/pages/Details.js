import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PreviewProduct from '../components/PreviewProduct'
import AddComment from '../components/AddComment'
import { UseAuthContext } from "../hooks/UseAuthContext";
import ContactSeller from '../components/ContactSeller'
import Loading from "../components/Loading";

const Details = () => {

    const {id} = useParams()
    const [currentmode,setCurrentmode] = useState('PreviewProduct')
    const {user} = UseAuthContext()
    const [isowner,setIsowner] = useState(null)
    const [isloading,setIsloading] = useState(true)
    const [product,setProduct] = useState(null)
    
    useEffect(()=>{
        const ownerCheck = async () => {
            const response = await fetch(`/api/products/${id}`,{
                headers : {
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                setProduct(json)

                if (json.user_id === user.user_id){
                    setIsowner(true)
                    setIsloading(false)
                }else{
                    setIsowner(false)
                    setIsloading(false)
                }


            }
        }
        ownerCheck()
    },[user,id])

    return ( 
      <div className="bg-light">
        <div className="container-lg ">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    {!isloading && 
                        <div>
                            {currentmode === 'PreviewProduct' ? <PreviewProduct id={id} product={product} /> : null}
                            {currentmode === 'AddComment' ? <AddComment id={id} product={product} /> : null}
                            {currentmode === 'ContactSeller' ? <ContactSeller/> : null}
                        </div>
                    }
                </div>
                <div className="col-9 col-lg-4 border mt-3 mt-lg-0 ">
                    <div className="p-2">
                        <p className="lead text-center mt-3">مشاهده محصول </p>
                        {isloading 
                            ?
                            <Loading />
                            :
                            <ul className="list-group text-center">
                            <li 
                                style={{borderColor : currentmode === 'PreviewProduct' ? 'blue' : null , 
                                color : currentmode === 'PreviewProduct' ? 'blue' : null}} 
                                onClick={() => setCurrentmode('PreviewProduct')} 
                                className="list-item btn btn-outline-secondary mt-4 "
                            >
                                مشاهده محصول <i className="bi bi-file-earmark-plus"></i>
                            </li>
                            <li 
                                style={{borderColor : currentmode === 'AddComment' ? 'blue' : null,
                                color : currentmode === 'AddComment' ? 'blue' : null}} 
                                onClick={() => setCurrentmode('AddComment')} 
                                className="list-item btn btn-outline-secondary mt-4"
                            >
                                نظرات  <i className="bi bi-basket"></i>
                            </li>
                            {  isowner 

                                ?
                                    <Link 
                                        to={`/editproduct/${id}`}
                                        className="list-item btn btn-outline-secondary mt-4"
                                    >
                                        ویرایش محصول  <i className="bi bi-basket"></i>
                                    </Link>
                                
                                :

                                    <li 
                                    style={{borderColor : currentmode === 'ContactSeller' ? 'blue' : null,
                                    color : currentmode === 'ContactSeller' ? 'blue' : null}} 
                                    onClick={() => setCurrentmode('ContactSeller')} 
                                    className="list-item btn btn-outline-secondary mt-4"
                                    >
                                    ارتباط با فروشنده  <i className="bi bi-basket"></i>
                                    </li>
                            
                            
                            }
                            <Link 
                                to= '/products' 
                                className="list-item btn btn-outline-secondary mt-4"
                            >
                                بازگشت به محصولات <i className="bi bi-box-arrow-left"></i>
                            </Link>

                        </ul>
                        }
                    </div>
                </div>
            </div>
        </div>
      </div>
           
        
     );
}
 
export default Details;