import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuthContext } from "../hooks/UseAuthContext";

const Delete = ({id,setCurrentmode}) => {

    
    const {user} = UseAuthContext()
    const [isloading,setIsloading] = useState(false)
    const [error,setError] = useState(null)
    const [alert,setAlert] = useState(null)
    const [isdeleted,setIsdeleted] = useState(false)
    const [isdone,setIsdone] = useState(false)

    const navigate = useNavigate()

    const deleteProduct = async () => {
        setIsloading(true)
        const response = await fetch(`/api/products/${id}`,{
            method : 'DELETE',
            headers : {
                'Authorization' : `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok){
            setIsloading(false)
            setError(json.error)
        }
        if (response.ok){
            setIsloading(false)
            setIsdone(true)
            setIsdeleted(true)
            setAlert('محصول شما با موفقیت حذف شد ، تا 5 ثانیه دیگه به صفحه شخصی منتقل می شوید ')
            setTimeout(() => {
                navigate('/user')
            }, 5000);
        }

    }

    return ( 
        <div className="container border ">
        <h5 className="text-end pt-3 pe-3">حذف محصول </h5>
        <div className="row justify-content-center align-items-center">
           <div className="col-8">
               <p className='pt-5 h5 mb-5'>آیا از حذف این محصول اطمینان دارید ؟ </p>
               <div className="row">
                   <div className="col-6 pb-5">
                       <button 
                       style={isdone ? {display : 'none'} : {display : 'block'}}
                       disabled={isdeleted} 
                       onClick={() => setCurrentmode('Edit')} 
                       className="btn btn-lg btn-outline-success" 
                       >
                        خیر </button>                 
                   </div>
                   <div className="col-6">
                       <button 
                            style={isdone ? {display : 'none'} : {display : 'block'}}
                            disabled={isloading || isdeleted} 
                            className="btn btn-lg btn-outline-danger" 
                            onClick={deleteProduct}
                        >
                            {isloading ? 'در حال حذف' : 'حذف'}
                        </button>    
                       {error && <div>{error}</div>}
                   </div>
                   {alert && (
                    <div className="bg-success my-3">
                        <p className="lead p-3">{alert}</p>
                    </div>
                   )}
                 
               
               </div>
           </div>

        </div>
   </div>
     );
}
 
export default Delete;