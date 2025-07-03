import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [credential, setCredential] = useState({
      email: "",
      password: "",
    });

    const handleChange =  (event) => {
      setCredential({...credential, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      const { email, password } = credential; // destructuring
      const response = await fetch ('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json();
      if(data) {
        localStorage.setItem("Token", data.authToken);
        navigate("/");
      }
      else {
        alert("Invalid Credentials");
      }

      console.log("Login Form is submitted");
    }


    // const toastToggle = () => {
    //         const email = document.getElementById('email').value;
    //         const password = document.getElementById('password').value;
    
    //         if(!email || !password) {
    //             toast('Please fill all the details', {
    //                 position: "top-center",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: false,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "light", 
    //             });
    //         }
    
    //      else {
    //         toast('Login successful!!', {
    //                 position: "top-center",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: false,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "light", 
    //             });
    //      }
    //     }
  return (
    <div>
        {/* <ToastContainer /> */}
      <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label">Email</label>
            <input type="email" name="email" value={credential.email} onChange={handleChange} className="form-control" id='email' placeholder='Enter email'/>
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <div className="password-wrapper">
              <input type={showPassword ? "text" : "password"}  name="password" value={credential.password} onChange={handleChange}  className="form-control" id='password' placeholder='Enter password'/>
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="toggle-link">
          Don't have an account? <Link to="/signup">Register here</Link>
        </p>
      </div>
    </div>
    </div>
  )
}

export default Login
