import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductContext from "../context/ProductContext";

const Login = () => {
  const navigate = useNavigate();
  const { fetchCart } = useContext(ProductContext);

  const [showPassword, setShowPassword] = useState(false);
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setCredential({ ...credential, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = credential;

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("Token", data.authToken);
        fetchCart();
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(data.message || "Invalid credentials");
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
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={credential.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credential.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter password"
                  required
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>

            <div className="text-center mt-3">
              <Link to="/request-reset" className="btn btn-link">
                Forgot Password?
              </Link>
            </div>
          </form>
          <p className="toggle-link">
            Don't have an account? <Link to="/signup">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
