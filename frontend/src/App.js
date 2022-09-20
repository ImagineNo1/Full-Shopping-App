import { BrowserRouter, Routes, Route ,Navigate } from 'react-router-dom'
import { UseAuthContext } from './hooks/UseAuthContext'

// pages & components
import Home from './pages/Home'
import Login from './pages/login'
import PersonalPage from './pages/PersonalPage'
import Signup from './pages/signup'
import Navbar from './components/Navbar'
import Products from './pages/Products'
import Details from './pages/Details'
import EditProduct from './components/EditProduct'
import NotFound from './components/404'
import Footer from './components/Footer'
import Admin from './pages/Admin'

function App() {

  const {user} = UseAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
         <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              exact path= "/" 
              element={<Home />} 
            />
            <Route 
              path='/admin'
              element={<Admin />}
            />
            <Route 
              path="/products" 
              element={<Products />} 
            />
            <Route 
              path="/user" 
              element={user ? <PersonalPage /> : <NotFound />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/products"/> } 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/products"/> } 
            />
            <Route 
              path="/details/:id" 
              element= {<Details />} 
            />
            <Route 
              path="/editproduct/:id" 
              element= {<EditProduct />} 
            />
            <Route 
              path="*" 
              element= {<NotFound />} 
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;