import { Link } from 'react-router-dom';
import showcaselogo from '../assets/1.jpg'
import aboutpic from '../assets/2.jpg';

const Home = () => {

    return ( 
        <div className="bg-light">
             <div className="container-lg  ">
            <div className="row justify-content-around align-items-center">
            <div className=" col-8 col-lg-6">
                    <img id="showcase-img" className="img=fluid d-none d-lg-block pt-3 ps-5" src={showcaselogo} alt="The Image" />
                </div>
                <div className="col-8 col-lg-4 ">
                    <h1 className = 'text-center'>فروشنده شو</h1>
                    <p className='lead text-end mt-3'>با فروشنده شو می توانید به سادگی محصولات خود را به اشتراک گذارید و به فروش برسانید ، برای قبت محصول کافی است روی دکمه زیر کلیک کنید</p>
                </div>

            </div>

            <div id="about">
        <div className="container-lg">
            <div className="text-end pe-4 my-5">
                <h4>درباره ما </h4>
                <p className="lead">با سیستم کاری فروشنده شو آشنا شوید</p>
            </div>
            <div className="row justify-content-center align-items-center">
                <div className="col-6 col-md-4 d-none d-lg-block">
                    <img id='about-img' src={aboutpic} className="img-fluid" alt="image"/>
                </div>
                <div className="col-8 ">
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                             نحوه ثبت محصول
                            </button>
                          </h2>
                          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body text-end">
                              برای ثبت محصول در فروشنده شو تنها کافی است حساب کاربری بسازید و وارد حساب کاربری خود شوید و از بخش افزودن محصول اطلاعات محصول خود را وارد کنید . محصولات ثبت شده از بخش محصولات در صفحه اصلی قابل مشاهده هستید و  برای مشاهده نیازی به حساب کاربری نیست اما برای ثبت محصول باید حساب کاربری داشته باشید . پس بدون معطلی همین الان محصول حود را ثبت کنید ! 
                              
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                              نحوه مشاهده محصولات و خرید
                            </button>
                          </h2>
                          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div className="accordion-body text-end">
                            برای مشاهده محصولات می توانید به منوی محصولات مراجعه کنید و محصولات تمامی کاربران را ببینید هر چند برای دیدن جزِیات کامل و ارتباط با فرشونده یا خرید حساب یا موارد دیگر باید در فروشنده شو اکانت بسازید .
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" >
                              نقش سایت ما و کارمزد فروشنده شو
                            </button>
                          </h2>
                          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div className="accordion-body text-end">
                                نفش سایت ما کمک به مردم است تا محصولات خود را هر چه سریعتر به فروش برسانند .  در حال حاضر با توجه به نسخه های اول سایت هزینه ثبت محصول و فروش کاملا رایگان است هر چند مراقب باشید قبل از خرید محصول حتما از صحت اطلاعات و فروشنده اطمینان حاصل کنید زیرا سایت ما هیچگونه مسیولیتی در فبال کلاهبرداری و غیره را قبول نمی کند .
                            </div>
                          </div>
                        </div>
                      </div>
                </div>
            </div>
        </div>
    </div>


 





        </div>
        </div>
       
        
        

     );
}
 
export default Home;