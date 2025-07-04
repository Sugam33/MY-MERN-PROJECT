import React, { useContext, useState } from 'react'
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
  console.log("nav cart", cart);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    } else {
      alert("product not found");
      navigate("/");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return ( 
    <div>
      <nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">{title}</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/blogs">Blogs</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/contacts">Contact us</Link>
        </li>
        {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> */}
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
      <Link to="/cart">
              <button
                type="button"
                className="btn btn-primary mx-3 position-relative"
              >
              <FaShoppingCart />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </Link>
        <button className="btn btn-primary me-2" onClick={notify}>Show Toast from Navbar</button>
        <button className="btn btn-primary me-2" onClick={changeNavColor}>{modeName}</button>
        <Link to="/signup"><button className="btn btn-warning me-2">Signup</button></Link>
        <Link className={`profile-btn`} to="/profile">Profile<i className="fa-solid fa-user"></i></Link>
        <Link to="/login"><button className="btn btn-success me-2">Login</button></Link>
      </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar;
