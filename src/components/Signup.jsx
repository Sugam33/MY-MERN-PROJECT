import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [profileImage, setProfileImage] = useState(null); 

  const handleChange = (event) => {
    setCredential({ ...credential, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    setProfileImage(event.target.files[0]); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, mobile } = credential;

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("mobile", mobile);
      if (profileImage) {
        formData.append("profileImage", profileImage); 
      }

      const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',
        body: formData, 
      });

      const data = await response.json();

      if (response.status === 201) {
        toast.success("Signup successful!! Please log in to continue.", {
          position: "top-center",
          autoClose: 3000,
        });
        navigate("/login");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="auth-container">
        <div className="auth-card">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label className="form-label">Username</label>
              <input type="text" className="form-control" name="name" value={credential.name} placeholder="Enter username" onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="form-label">Mobile Number</label>
              <input type="tel" className="form-control" name="mobile" value={credential.mobile} placeholder="Enter mobile number" onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" name="email" value={credential.email} placeholder="Enter email" onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <div className="password-wrapper">
                <input type={showPassword ? "text" : "password"} className="form-control" name="password" value={credential.password} placeholder="Enter password" onChange={handleChange} required />
                <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label">Profile Picture</label>
              <input type="file" accept="image/*" className="form-control" onChange={handleImageChange} />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          </form>
          <p className="toggle-link">
            Already registered? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
