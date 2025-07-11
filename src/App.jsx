import { useEffect, useState } from 'react' // curly braces ma cha vane named import
import { ToastContainer, toast } from 'react-toastify';
import './App.css'
import Navbar from './components/Navbar'; // without curly braces cha vane default import
import Banner from './components/Banner';
import Alert from './components/Alert';
import One from './components/One';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'; // React Router DOM import
import Home from './components/Home';
import About from './components/About';
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Services from './components/Services';
import Gallery from './components/Gallery';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import Signup from './components/Signup';
import Login from './components/Login';
import ProductState from './context/ProductState';
import CartItems from './components/CartItems';
import AddProduct from './components/AddProduct';
import FormDetails from './components/FormDetails';
import SearchResult from './components/SearchResult';
import Profile from './components/Dashboard/Profile.jsx';
import ResetRequest from './components/AuthReset/ResetRequest.jsx';
import VerifyOtp from './components/AuthReset/VerifyOtp.jsx';
import ResetPassword from './components/AuthReset/ResetPassword.jsx';



function App() {
  

  // usestates 
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Sugam');
  const [mode, setMode] = useState('light');
  const [modeName, setModeName] = useState('Set Dark Mode');
  const [alert, setAlert] = useState(null);
  const [textColor, setTextColor] = useState('dark');

  // functions
   const handleIncrement = () => {
    setCount(count + 1);
    setName("Sugam");
  }

  const handleDecrement = () => {
    setCount(count - 1);
    setName("Rohan");
  }

    const changeNavColor = () => {
        if(mode === 'light' && modeName === 'Set Dark Mode'){
          setMode('dark');
          setModeName('Set Light Mode');
          showAlert("You have changed to dark mode", "success");
          setTextColor('light');
          setTimeout(() => {
            setAlert(null);
          }, 2000)
        }

        else {
          setMode('light');
          setModeName('Set Dark Mode');
          showAlert("You have changed to light mode", "success");
          setTextColor('dark');
           setTimeout(() => {
            setAlert(null);
          }, 2000)
        }
    }


  
    // Alert function
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
  }

  // Toastify function
  const notify = () => toast("Toastify is Working!!", {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
});


  let title = "Sekuwaghar";

  return (
    <>
    <ProductState>
    <Router>
    <Navbar title={title} mode={mode} changeNavColor={changeNavColor} modeName = {modeName}  notify = {notify} />
    <ToastContainer 
    position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"/>
    <Alert alert = {alert}/>

    {/* <Banner />
    <One mode={mode} textColor = {textColor}/> */}
      {/* <div className="container">
          <button onClick={handleIncrement}>Click to increase</button>
          <button onClick={handleDecrement}>Click to decrease</button>
          <button onClick={notify}>Show Toast</button>

        <h3>Count is: {count}</h3>
        <h3>My name is: {name}</h3>
      </div> */}
        <div>
        <Routes>
          <Route path="/" element={<Home mode={mode} textColor={textColor}/>} />
          <Route path='/about' element = {<About mode={mode} textColor={textColor}/>}/>
          <Route path='/blogs' element = {<Blogs />}/>
          <Route path='/contacts' element = {<Contact />}/>
          <Route path='/gallery' element = {<Gallery />} />
          <Route path='/services' element = {<Services mode={mode} textColor={textColor}/>} />
          <Route path='/userlist' element = {<UserList />}/>
          <Route path='/:id/:username/:age' element = {<UserDetail />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/cart' element={<CartItems />}/>
          <Route path='/addproduct' element={<AddProduct />}/>
          <Route path='/formdetails' element={<FormDetails />} />
          <Route path="/search/:searchQuery" element={<SearchResult />} />
          <Route path="/profile" element={<Profile />} />

          {/* Reset password Route */}
         <Route path="/request-reset" element={<ResetRequest />} />
         <Route path="/verify-otp" element={<VerifyOtp />} />
         <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
      <Footer mode={mode}/>
      </Router>
      </ProductState>
    </>
  )
}

export default App
