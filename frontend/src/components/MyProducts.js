import { useState ,useEffect } from "react";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { UseAuthContext } from "../hooks/UseAuthContext";
import { Link } from "react-router-dom";
import Loading from './Loading'
import pic from '../assets/2.jpg';

const MyProducts = () => {
    
    const [error,setError] = useState(null)
    const [products,setProducts] = useState(null)
    const {user} = UseAuthContext()
    const [isloading,setIsloading] = useState(true)

    useEffect(()=>{
        const getUserProducts = async () => {
            const response = await fetch('/api/products/userproduct',{
                headers : {
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (!response.ok){
                setError(json.error)
            }
            if(response.ok){
                setProducts(json)
                setIsloading(false)
            }
        }
        if (user){
            getUserProducts()
        }
    },[user])

    return ( 
        <div className="products">
            {isloading && <Loading />}  
            {!isloading && (
                <div className="container border border-primary">
                    <h5 className="text-end pt-3 pe-3">محصولات های من </h5>
                        {error && <div>{error}</div>}
                        {products && products.map((p)=>(
                            <div className="row justify-content-center" key={p._id}>
                                    <div className="col-12 col-md-8 my-3 " >
                                    <div className="card">
                                        <div className="card-header"><img src={pic} style={{width : "100%" , height : "100%"}} /></div>
                                        
                                            {  p.status == "pending" ? 
                                                <div className="card-header text-center text-warning h4">
                                                    در انتظار تایید
                                                </div>
                                                
                                                :

                                                <div className="card-header text-center text-success h4">
                                                    منتشر شده
                                                </div>                                             
                                            }
                                        
                                        <div className="card-body">
                                            <div className="card-title text-end">
                                                <span className="h5">{p.title}</span> : <span className="lead">عنوان</span> 
                                            </div>
                                            <div className="card-subtitle text-end my-2"><span className="lead">
                                                قیمت </span>: <span className="h5">{p.price}</span> هزار تومان
                                            </div>
                                            <div className="card-text text-end mb-2"><span className="h5">
                                                {formatDistanceToNow(new Date(p.createdAt), { addSuffix: true })} </span>: 
                                                <span className="lead">منتشر شده در </span>
                                            </div>

                                            <div className="text-center">
                                                <Link to={`/editproduct/${p._id}`} 
                                                    className="btn btn-lg btn-secondary me-2 fw-btn mt-3"
                                                >
                                                    ویرایش محصول 
                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                                ))}
                    </div>
            )}              
        </div>
        
        
     );
}
 
export default MyProducts;