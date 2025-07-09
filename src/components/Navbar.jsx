import React, { useContext, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import ProductContext from '../context/ProductContext';

const Navbar = ({ title, mode, modeName, changeNavColor, notify, loginMode }) => {
  const context = useContext(ProductContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    state: { cart },
  } = context;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    } else {
      alert("Product not found");
      navigate("/");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("Token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("Token");

  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">{title}</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/blogs">Blogs</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/contacts">Contact us</Link>
              </li>
            </ul>

            <form onSubmit={handleSearchSubmit} className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                name="searchQuery"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>

            {/* ✅ Show cart icon only if logged in */}
            {isLoggedIn && (
              <Link to="/cart">
                <button type="button" className="btn btn-primary mx-3 position-relative">
                  <FaShoppingCart />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.length}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </button>
              </Link>
            )}

            <button className="btn btn-primary me-2" onClick={notify}>Show Toast from Navbar</button>
            <button className="btn btn-primary me-2" onClick={changeNavColor}>{modeName}</button>

            {!isLoggedIn && (
              <>
                <Link to="/signup"><button className="btn btn-warning me-2">Signup</button></Link>
                <Link to="/login"><button className="btn btn-success me-2">Login</button></Link>
              </>
            )}

            {isLoggedIn && (
              <>
                <Link className="profile-btn me-2" to="/profile">
                  Profile <i className="fa-solid fa-user"></i>
                </Link>
                <button className="btn btn-danger me-2" onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
