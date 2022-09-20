import { useState } from "react";
import { useParams } from "react-router-dom";
import Edit from './Edit'
import Delete from './Delete'
import { Link } from "react-router-dom";


const EditProduct = () => {

    const {id} = useParams()
    const [currentmode,setCurrentmode] = useState('Edit')

    return ( 

        <div className="container-lg mt-3">
            <div className="row justify-content-center">
                <div className="col-8">
                    {currentmode === 'Edit' ? <Edit id={id} /> : null}
                    {currentmode === 'Delete' ? <Delete id={id} setCurrentmode={setCurrentmode} /> : null}

                </div>
                <div className="col-4 border ">
                    <div className="p-2">
                        <p className="lead text-center mt-3">{id} ویرایش محصول</p>
                        <ul className="list-group text-center">
                            <li style={{borderColor : currentmode === 'Edit' ? 'red' : null}} onClick={() => setCurrentmode('Edit')} className="list-item btn btn-outline-secondary mt-4 ">ویرایش محصول </li>
                            <li style={{borderColor : currentmode === 'Delete' ? 'red' : null}} onClick={() => setCurrentmode('Delete')} className="list-item btn btn-outline-secondary mt-4">حذف محصول</li>
                            <Link to='/products' className="list-item btn btn-outline-secondary mt-4">بازگشت</Link>


                        </ul>
                    </div>
                </div>
            </div>
        </div>

     );
}
 
export default EditProduct;