import { Link } from "react-router-dom";
import { UseAuthContext } from "../hooks/UseAuthContext";


const Navbar = () => {

  const {user,isAdmin} = UseAuthContext()


    return ( 
      <div className="bg-light">
            <div className="container-lg">
                    <nav className="navbar navbar-expand-lg pb-3">
            <div className="container-fluid">
            <Link className="navbar-brand design-nav" to="/"> ! فروشنده شو </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link design-nav" to="/products" >محصولات</Link>
                </li>

              </ul>
              
                {user && (
                  <div>
                      <span className="nav-item me-2">! {user.name} خوش آمدید</span>
                      <Link to='/user' className="btn btn-outline-success" >پروفایل من </Link>
                      {isAdmin && <Link to='/admin' className="btn btn-outline-danger ms-2" >پنل ادمین</Link>}
                  </div>
                )}
                {!user && (
                  <form className="d-lg-flex d-none " role="search">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link className="nav-link design-nav" to="/login">ورود</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link design-nav" to="/signup">ساخت حساب</Link>
                    </li>

                  </ul>
                  </form>
                )}
              

            </div>
            </div>
            </nav>
            </div>
      </div>
       
     );
}
 
export default Navbar;