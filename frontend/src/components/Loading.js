import loading from '../assets/loading.png'
import "./loading.css" ;

const Loading = () => {
    return ( 
        // <div className = "loading-background">
        //     <div className="container-loading">
        //         <div className = "div-loading">
        //             <div className = "div-loading">
        //                 <div className = "div-loading">
        //                     <div className = "div-loading">
        //                         <div className = "div-loading">
        //                             <div className = "div-loading"> 

        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className="container-lg">
            <div id="loading">
                <h3 id='headerLoading' >در حال بارگذاری اطلاعات </h3>
                <img src={loading} id="loadingImg" />
            </div>
        </div>
     );
}
 
export default Loading;