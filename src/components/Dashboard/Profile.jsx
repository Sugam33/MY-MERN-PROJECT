import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profilepic from '../../assets/profilepic.jpg';
import AddProduct from '../AddProduct';


const Profile = () => {
  const [products, setProducts] = useState([]);
  const [viewing, setViewing] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({ name: '', email: '', mobile: '' });
  const [updatedUser, setUpdatedUser] = useState({ name: '', email: '', mobile: '', password: '' });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('Token');
    navigate('/login');
  };

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/getuser', {
        headers: {
          'auth-token': localStorage.getItem('Token')
        }
      });
      setUser(res.data);
      setUpdatedUser({ ...res.data, password: '' });
    } catch (err) {
      console.error('Error fetching user details:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/product/allhomeproduct');
      setProducts(res.data);
      setViewing('all');
    } catch (err) {
      console.error('Error fetching all products:', err.response?.data || err.message);
    }
  };

  const fetchMyProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/product/allproduct', {
        headers: {
          'auth-token': localStorage.getItem('Token')
        }
      });
      setProducts(res.data);
      setViewing('mine');
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:5000/api/auth/updateuser', updatedUser, {
        headers: {
          'auth-token': localStorage.getItem('Token')
        }
      });
      setUser(res.data);
      setEditMode(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err.response?.data || err.message);
      toast.error('Failed to update profile');
    }
  };

  return (
    <section className="profile-container">
      <ToastContainer position="top-center" autoClose={3000} />
      
      <div className="profile-card">
        <div className="profile-image">
          <img src={Profilepic} alt="profile picture" />
        </div>
        <div className="profile-info">
          <h2>{user.name || 'Loading...'}</h2>
          <p className="email">{user.email}</p>
          <p className="location">📱 {user.mobile || 'Not provided'}</p>
          <button className="btn btn-outline-secondary mt-2" onClick={() => setEditMode(!editMode)}>
            {editMode ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {editMode && (
        <div className="edit-profile-form">
          <h4>Update Profile</h4>
          <form onSubmit={handleUpdateSubmit}>
            <div className="mb-3">
              <label>Name</label>
              <input type="text" name="name" value={updatedUser.name} onChange={handleUpdateChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input type="email" name="email" value={updatedUser.email} onChange={handleUpdateChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label>Mobile</label>
              <input type="tel" name="mobile" value={updatedUser.mobile} onChange={handleUpdateChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label>New Password (optional)</label>
              <input type="password" name="password" value={updatedUser.password} onChange={handleUpdateChange} className="form-control" />
            </div>
            <button type="submit" className="btn btn-success">Save Changes</button>
          </form>
        </div>
      )}

      <div className="product-summary">
        <h3>{viewing === 'mine' ? 'My Products' : 'All Products'}</h3>
        <div className="button-group">
          <button className="view-products" onClick={fetchAllProducts}>View All Products</button>
          <button className="view-products" onClick={fetchMyProducts}>View My Products</button>
          <button className="view-products" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Close Form' : 'Add My Product'}
          </button>
        </div>

        {showForm && (
          <div className="add-product-form">
            <AddProduct onProductAdded={fetchMyProducts} />
          </div>
        )}

        <p className="product-count">Total: {products.length}</p>

        <div className="product-flex">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div className="product-card" key={product._id}>
                {product.image && product.image.length > 0 && (
                  <img
                    src={`http://localhost:5000/uploads/${product.image[0]}`}
                    alt={product.title}
                    className="product-image"
                  />
                )}
                <h4>{product.title}</h4>
                <p>{product.description}</p>
                <p><strong>Price:</strong> Rs. {product.price}</p>
                <p><strong>In Stock:</strong> {product.instock}</p>
              </div>
            ))
          ) : (
            <p className="no-products">No products found.</p>
          )}
        </div>
      </div>

      <div className="logout-section">
        <button className="logout-button" onClick={handleLogout}>
          🔓 Logout
        </button>
      </div>
    </section>
  );
};

export default Profile;
