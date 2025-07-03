import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {
      const navigate = useNavigate();
     const [showPassword, setShowPassword] = useState(false);
      const [credential, setCredential] = useState({
           name: "",
           email: "",
           password: "",
          
         });
     
         const handleChange =  (event) => {
           setCredential({...credential, [event.target.name]: event.target.value});
         }
     
         const handleSubmit = async (event) => {
           event.preventDefault();
           const { name, email, password } = credential; // destructuring

          // if(password !== confirmPassword) {
          //   alert("Passwords dont match!!");
          //   return;
          // }

           const response = await fetch ('http://localhost:5000/api/auth/createuser', {
             method: 'POST',
             headers: { 
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({ name, email, password }),
           })
           const data = await response.json();
           console.log(data);
           if(data) {
             localStorage.setItem("Token", data.authToken);
             navigate("/login");
           }
           else {
             alert("Invalid Credentials");
           }
     
           console.log("Signup Form is submitted");
         }


    //  const toastToggle = () => {
    //     const name = document.getElementById('name').value;
    //     const mobNumber = document.getElementById('mobNumber').value;
    //     const email = document.getElementById('email').value;
    //     const password = document.getElementById('password').value;

    //     if(!name || !mobNumber || !email || !password) {
    //         toast('Please fill all the details', {
    //             position: "top-center",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: false,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light", 
    //         });
    //     }

    //  else {
    //     toast('Registration successful!!', {
    //             position: "top-center",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: false,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light", 
    //         });
    //  }
    // }
  return (
    <div>
        <ToastContainer />
        <div className="auth-container">
      <div className="auth-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" id='name' name="name" value={credential.name} placeholder='Enter username' onChange={handleChange}/>
          </div>
          <div className="mb-4">
            <label className="form-label">Mobile Number</label>
            <input type="tel" className="form-control" id='mobNumber' name="mobileNumber" value={credential.mobileNumber} placeholder='Enter mobile number' onChange={handleChange}/>
          </div>
          <div className="mb-4">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" id='email' name="email" value={credential.email} placeholder='Enter email' onChange={handleChange}/>
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <div className="password-wrapper">
              <input type={showPassword ? "text" : "password"} className="form-control" name="password" value={credential.password} id='password' placeholder='Enter password' onChange={handleChange}/>
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>
          {/* <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <div className="password-wrapper">
              <input type={showPassword ? "text" : "password"} className="form-control" name="confirmPassword" value={credential.confirmPassword} id='confirmPassword' placeholder='Confirm Password' onChange={handleChange}/>
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div> */}
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
        <p className="toggle-link">
          Already registered? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
    </div>
  )
}

export default Signup
