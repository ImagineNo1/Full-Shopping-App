import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {UseNewProduct} from '../hooks/UseNewProduct'



const AddProduct = ({setCurrentmode}) => {

    const [title,setTitle] = useState('')
    const [price,setPrice] = useState()
    const [number,setNumber] = useState()
    const [instagram,setInstagram] = useState('')
    const [telegram,setTelegram] = useState('')
    const [category,setCategory] = useState('ورزش')
    const [about,setAbout] = useState('')
    const {error,isloading,NewProduct,setIsloading} = UseNewProduct()
    const [image,setImage] = useState(null)
    const [preview,setPreview] = useState()
    const [alert,setAlert] = useState(null)
    const [isAdded,setIsAdded] = useState(false)
    const [isdone,setIsdone] = useState(false)

    const fileInputRef = useRef()

    const submitHandler = async (e) =>{
        e.preventDefault()


        await NewProduct(title,about,price,category,number,instagram,telegram)
        if (!error){
            setIsloading(false)
            setIsdone(true)
            setIsAdded(true)
            setAlert('محصول شما با موفقیت افزوده شد ، تا 5 ثانیه دیگه به صفحه محصولات شما منتقل می شوید ')
            setTimeout(() => {
                setCurrentmode('MyProducts')
            }, 5000);
        }
    }
    useEffect(()=>{
        if(image){
             const reader = new FileReader()
             reader.onload = () => {

                
                    setPreview(reader.result) 
                 
             }
             reader.readAsDataURL(image)
        }
    },[image])
    return ( 
        <div className="container border border-primary">
            <h5 className="text-end pt-3 pe-3">افزودن محصول</h5>
            <form onSubmit={submitHandler} className="from-controller product-form">
                <div className="text-end">
                    <label className="form-label lead ">عنوان محصول</label>
                </div>
                <div className="input-group">
                    <span className="input-group-text">
                         <i className="bi bi-pen-fill"></i>
                    </span>
                    <input type="text"
                    required
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
                    required 
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
                    required
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
                    required
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
                    required
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
                    className="form-select text-end"
                     aria-label="Default select example">
                        <option value ="ورزش" >ورزش</option>
                        <option value="سریال">سریال</option>
                        <option value="فیلم">فیلم</option>
                        <option value="بازی">بازی</option>
                    </select>
                </div>

                <div className="text-end">
                    <label className="form-label lead my-2">توضیحات بیشتر</label>
                </div>
                <textarea 
                    required
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="form-control text-end" rows="3"></textarea>
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
                    disabled={isloading || isAdded} 
                    className="btn btn-outline-primary my-4 fw-btn"
                >
                    {isloading ? 'در حال ثبت' : "ثبت محصول"}
                </button>
                {error && <div className="bg-dark text-primary">{error}</div>}
                {alert && (
                    <div className="bg-success mt-3 text-end">
                        <p className="lead p-3">{alert}</p>
                    </div>
                   )}
            </form>
        </div>
     );
}
 
export default AddProduct;