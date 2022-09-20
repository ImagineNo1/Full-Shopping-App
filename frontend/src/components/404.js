import image from '../assets/404.jpg'

const NotFound = () => {
    return ( 
        <div className="container-lg">
            <div id="notfound">
                <h3 id='headerLoading' >صفحه ای که دنبال آن هستید موجود نیست </h3>
                <img src={image} id="notfoundimg" />
            </div>
        </div>

     );
}
 
export default NotFound;