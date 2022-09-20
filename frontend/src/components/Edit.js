import { useState , useRef  , useEffect} from "react"
import Loading from './Loading'
import { UseAuthContext } from "../hooks/UseAuthContext"
import { useNavigate,useParams } from "react-router-dom";


const Edit = () => {
    const {id} = useParams()
    
    const [title,setTitle] = useState('')
    const [price,setPrice] = useState()
    const [number,setNumber] = useState()
    const [instagram,setInstagram] = useState('')
    const [telegram,setTelegram] = useState('')
    const [category,setCategory] = useState('ورزش')
    const [about,setAbout] = useState('')
    const [image,setImage] = useState(null)
    const [preview,setPreview] = useState()
    const [isloading,setIsloadig] = useState(true)
    const [product,setProduct] = useState(null)
    const [error,setError] = useState(null)
    const [isdone ,setIsdone] = useState(false)
    const [isediting,setIsediting] = useState(false)
    
    
    
    const navigate = useNavigate()

    const {user} = UseAuthContext()

    const fileInputRef = useRef()



    const submitHandler = async (e) => {
        e.preventDefault()
        setIsediting(true)
        if (title === "" ){
            setTitle(product.title)
        }
        if (about === ""){
            setAbout(product.about)
        }
        if (price === ""){
            setPrice(product.price)
        }
        if (category === "" ){
            setCategory(product.category)
        }
        if (instagram === ""){
            setInstagram(product.instagram)
        }
        if (telegram === ""){
            setTelegram(product.telegram)
        }
        if (number === "" ){
            setNumber(product.number)
        }
        const response = await fetch(`/api/products/${id}`,{
            method : 'PATCH',
            headers : {
                "Content-Type" : "application/json",
                'Authorization' : `Bearer ${user.token}`
            },
            body : JSON.stringify({title,about,price,category,number,instagram,telegram})
        })
        const json = await response.json()

        if (!response.ok){
            setIsediting(false)
            setError(json.error)
            setTimeout(()=>{
                setError(null)
            },3000)
        }
        if(response.ok){
            setIsediting(false)
            setIsdone(true)
            setTimeout(()=>{
                navigate('/products')
            },5000)
        }
         
    }
    useEffect(()=>{
        
        const getProduct = async () => {
            
            
            const response = await fetch(`/api/products/${id}`,{
                headers : {
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){

                setProduct(json)
                setTitle(json.title)
                setAbout(json.about)
                setPrice(json.price)
                setInstagram(json.instagram)
                setTelegram(json.telegram)
                setCategory(json.category)
                setNumber(json.number)
                setIsloadig(false)
            }
        }
            getProduct()

        if(image){
             const reader = new FileReader()
             reader.onload = () => {

                
                    setPreview(reader.result) 
                 
             }
             reader.readAsDataURL(image)
        }
    },[image])
    return ( 
        
        <div className="container border">
            {
            isloading 
            
            ? 
                <Loading />
            :
                <div>
                            <h5 className="text-end pt-3 pe-3">ویرایش</h5>
                    <form onSubmit={submitHandler} className="from-controller product-form">
                        <div className="text-end">
                            <label className="form-label lead ">عنوان جدید</label>
                        </div>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-pen-fill"></i>
                            </span>
                            <input type="text"
                            
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-control text-end " />
                        </div>
                        <div className="text-end">
                            <label className="form-label lead my-2">قیمت (به تومان)</label>
                        </div>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-tag-fill"></i>
                            </span>
                            <input type="number"
                            
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="form-control text-end" 
                            placeholder="به تومان وارد کنید" />
                        </div>
                        <div className="text-end">
                            <label className="form-label lead my-2">شماره تماس</label>
                        </div>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-telephone-minus"></i>
                            </span>
                            <input type="number" 
                            
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            className="form-control text-end"  />
                        </div>

                        <div className="text-end">
                            <label className="form-label lead my-2">آیدی اینستاگرام</label>
                        </div>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-instagram"></i>
                            </span>
                            <input type="text" 
                            
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            className="form-control text-end" 
                            placeholder="آیدی اینستاگرام خود را بدون @ وارد کنید" />
                        </div>
                        <div className="text-end">
                            <label className="form-label lead my-2">آیدی تلگرام</label>
                        </div>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-telegram"></i>
                            </span>
                            <input type="text" 
                            
                            value={telegram}
                            onChange={(e) => setTelegram(e.target.value)}
                            className="form-control text-end" 
                            placeholder="یوزرنیم تلگرام خود را بدون @ وارد کنید" />
                        </div>
                        <div className="text-end">
                            <label className="form-label lead my-2">دسته بندی</label>
                        </div>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-bookmark-check-fill"></i>
                            </span>
                            <select 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            class="form-select text-end"
                            aria-label="Default select example">
                                <option value ="ورزش">ورزش</option>
                                <option value="سریال">سریال</option>
                                <option value="فیلم">فیلم</option>
                                <option value="بازی">بازی</option>
                            </select>
                        </div>

                        <div className="text-end">
                            <label className="form-label lead my-2">توضیحات بیشتر</label>
                        </div>
                        <textarea 
                            
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            class="form-control text-end" rows="3"></textarea>
                    <div className="text-end mt-2">
                            <label className="form-label lead">عکس محصول</label>
                        </div>
                            <div className="text-center">
                                
                                {preview ? 
                                    <img src={preview} style={{width : "300px" , height : "300px" }}/>
                                :
                                    <button 
                                    onClick={(e) => {
                                        e.preventDefault()
                                        fileInputRef.current.click()
                                    }}
                                    className="addImage">
                                        Add Image
                                    </button>
                                }   
                                

                            </div>

                            <input 
                            
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0]
                                if(file && file.type.substr(0,5) === "image" ){
                                    if(e.target.files[0].size > 2097152){
                                        alert("File is too big!");
                                    }else{
                                        setImage(file)
                                    }
                                }
                            }}
                            type="file"
                            ref={fileInputRef} 
                            style={{display :"none"}}
                            ></input>
            

                        <button 
                            style={isdone ? {display : 'none'} : {display : 'block'}}
                            disabled={isediting} 
                            className="btn btn-outline-primary my-4 fw-btn"
                        >
                            {isediting ? 'در حال ویرایش محصول' : ".ویرایش محصول"}
                        </button>

                        {error && (
                            <div className='border border-3 border-danger my-2 text-center'>
                                <p className='p-1 text-secondary'>{error}</p>
                            </div>
                        )}
                        {isdone && (
                            <div className='bg-success my-2 text-center'>
                                <p className='p-3'>"محصول شما با موفقیت ویرایش شد . تا 5 ثانیه دیگر به صفحه محصولات منتقل خواهید شد "</p>
                            </div>
                        )}
                    </form>
                </div>
        
            }
           
           </div>
     );
}
 
export default Edit;