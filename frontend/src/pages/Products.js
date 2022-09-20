import { useState, useEffect } from "react";

import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { UseAuthContext } from "../hooks/UseAuthContext";
import { Link } from "react-router-dom";
import pic from '../assets/2.jpg';
import Loading from "../components/Loading";

const Products = () => {
    const [products,setProducts] = useState()
    const [productsnm,setProductsnm] = useState()
    const [show,setShow] = useState(products)
    const {user} = UseAuthContext()
    const[userid,setUserid] =  useState(null)
    const [isloading,setIsloading] = useState(true)
    
    const filterShowOwn = (value) => {
        if(value == true){
            setShow(productsnm)
        }else if (value == false) {
            setShow(products)
        }
    }

    useEffect(()=>{
        const getProducts = async () => {

            const response = await fetch('/api/products/')
            const json = await response.json()

            if (response.ok){
                setProducts(json)
                setShow(json)
                setIsloading(false)
            }
            if (user){
                setUserid(user.user_id)
                const response = await fetch('/api/products/showOwn',{
                    headers  :{
                        'Authorization' : `Bearer ${user.token}`
                    }
                })
                const json = await response.json()
                if (response.ok){
                    setProductsnm(json)
                }
            }

            
        }   
        getProducts()

    },[user])


    return ( 
    <div>
        <div className="bg-secondary">
            <p className="text-center welcome">به صفحه محصولات خوش آمدید</p>
        </div>
       <div className="container-lg">
            <div className="row justify-content-around">
                <div className="col-12 col-md-9   ">
                    { isloading ? <Loading /> : (
                        <div className="row justify-content-center">
                             {show && show.map((p)=>(
                                <div className="col-12 col-lg-4 my-3 " key={p._id}>
                        <div className="card">
                            <div className="card-header"><img src={pic} alt='image' style={{width : "100%" , height : "100%"}} /></div>
                            <div className="card-body">
                                <div className="card-title text-end"><span className="h6">{p.title}</span> : <span className="lead">عنوان</span> </div>
                                <div className="card-subtitle text-end my-2"><span className="lead">قیمت</span> : <span className="h6">{p.price}</span> هزار تومان</div>
                                <div className="card-text text-end mb-2"> 
                                    <span className="h6">{formatDistanceToNow(new Date(p.createdAt), { addSuffix: true })} </span>: <span className="lead">منتشر شده در 
                                    </span></div>
                               
                                <div className="card-text text-end fs-4">
                                    <i className="bi bi-heart-fill text-danger"></i> {(p.interests).length}
                                </div>
                                <div className="text-center">
                                    { userid !== p.user_id && 
                                    <Link to={user ? `/details/${p._id}` : '/signup'} 
                                        className="btn btn-primary fw-btn my-2">
                                            {user ? "مشاهده محصول " : "  برای مشاهده باید اکانت بسازید"}
                                    </Link>
                                    }
                                    { userid === p.user_id && 
                                    <Link to={user ? `/details/${p._id}` : '/signup'} 
                                        className="btn btn-secondary my-2 fw-btn">
                                        محصول شما - مشاهده و ویرایش
                                    </Link>
                                    } 
                                </div>

                            </div>
                        </div>
                    </div>
                

            ))}
                        </div>
                    )}
                </div>
                <div className="col-12 col-md-3 border mt-3">
                    <p className="h4 text-end pt-3 pe-3">فیلتر ها </p>
                    
                        <hr className="mt-5" />
                        <div className="form-check form-switch text-end">
                            <input
                                onChange={(e) => filterShowOwn(e.target.checked)} 
                                className="form-check-input text-danger mt-2" 
                                type="checkbox"  />
                            <label className="form-check-label lead" >
                                عدم نمایش محصولات من
                            </label>
                        </div>
                        <hr />
                    
                </div>
            </div>
       </div>
    </div>  
     );
}
 
export default Products;