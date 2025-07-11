import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import defaultProfile from '../../assets/profilepic.jpg';
import AddProduct from '../AddProduct';
import ProductContext from '../../context/ProductContext';

const Profile = () => {
  const [products, setProducts] = useState([]);
  const [viewing, setViewing] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({ name: '', email: '', mobile: '', profileImage: '' });
  const [updatedUser, setUpdatedUser] = useState({ name: '', email: '', mobile: '', password: '' });

  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({ title: "", description: "", price: "", instock: "" });

  const navigate = useNavigate();
  const {
    state: { cart },
    addToCart,
    removeFromCart,
    clearCartState,
  } = useContext(ProductContext);

  const handleLogout = () => {
    localStorage.removeItem('Token');
    clearCartState();
    navigate('/login');
  };

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/getuser', {
        headers: { 'auth-token': localStorage.getItem('Token') }
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
        headers: { 'auth-token': localStorage.getItem('Token') }
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
        headers: { 'auth-token': localStorage.getItem('Token') }
      });
      setUser(res.data);
      setEditMode(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err.response?.data || err.message);
      toast.error('Failed to update profile');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setEditedProduct({
      title: product.title,
      description: product.description,
      price: product.price,
      instock: product.instock,
    });
  };

  const handleChangeEdit = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/product/updateproduct/${editingProduct._id}`, editedProduct, {
        headers: { "auth-token": localStorage.getItem("Token") }
      });
      toast.success("Product updated successfully!");
      setEditingProduct(null);
      fetchMyProducts();
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/product/deleteproduct/${id}`, {
        headers: { "auth-token": localStorage.getItem("Token") }
      });
      toast.success("Product deleted!");
      fetchMyProducts();
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const isInCart = (productId) => {
    return cart?.some((item) => item.product?._id === productId);
  };

    return (
    <section className="profile-container">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="profile-card">
        <div className="profile-image">
          <img
            src={user.profileImage ? `http://localhost:5000${user.profileImage}` : defaultProfile}
            alt="profile"
            className="rounded-circle"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              border: "2px solid #007bff"
            }}
          />
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
        <h3>{viewing === 'mine' ? 'My Products' : 'All Products'}</h3>
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

                {viewing === 'mine' && (
                  <div className="mt-3">
                    <button
                      className="btn btn-outline-primary me-2"
                      onClick={() => handleEditProduct(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}

                {editingProduct?._id === product._id && (
                  <form onSubmit={handleEditSubmit} className="mt-3 p-3 border rounded bg-light">
                    <h5 className="mb-3">Update Product</h5>

                    <label className="form-label fw-bold">Title</label>
                    <input type="text" name="title" value={editedProduct.title} onChange={handleChangeEdit} className="form-control mb-3" required />

                    <label className="form-label fw-bold">Description</label>
                    <textarea name="description" value={editedProduct.description} onChange={handleChangeEdit} className="form-control mb-3" required />

                    <label className="form-label fw-bold">Price</label>
                    <input type="number" name="price" value={editedProduct.price} onChange={handleChangeEdit} className="form-control mb-3" required />

                    <label className="form-label fw-bold">In Stock</label>
                    <input type="number" name="instock" value={editedProduct.instock} onChange={handleChangeEdit} className="form-control mb-3" required />

                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn btn-success me-2">Save</button>
                      <button type="button" className="btn btn-secondary" onClick={() => setEditingProduct(null)}>Cancel</button>
                    </div>
                  </form>
                )}

                {isInCart(product._id) ? (
                  <button
                    className="btn btn-danger w-100 mt-2"
                    onClick={() => removeFromCart(product._id)}
                  >
                    Remove from cart
                  </button>
                ) : (
                  <button
                    className="btn btn-primary w-100 mt-2"
                    onClick={() => {
                      const token = localStorage.getItem("Token");
                      if (!token) {
                        toast.warn("Please login to add items to your cart");
                        return;
                      }
                      addToCart(product);
                    }}
                  >
                    Add to cart
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="no-products">No products found.</p>
          )}
        </div>
      </div>

      <div className="logout-section">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </section>
  );
};

export default Profile;
