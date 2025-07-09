import React, { useContext, useEffect, useState } from "react";
import ProductContext from "../context/ProductContext";
import { BsThreeDots } from "react-icons/bs";
import EditProductModal from "./EditProductModal";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const About = () => {
  const context = useContext(ProductContext);
  const params = useParams();
  const { searchQuery } = params;

  const {
    product,
    allProduct,
    state: { cart },
    addToCart,
    removeFromCart,
    editProduct,
    deleteProduct,
  } = context;

  const [menuVisible, setMenuVisible] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleMenu = (id) => {
    setMenuVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const closeEditModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const saveEdit = (updateData) => {
    editProduct(selectedProduct._id, updateData);
    closeEditModal();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleAddToCart = (item) => {
    const token = localStorage.getItem("Token");
    if (!token) {
      toast.warn("Please login to add items to your cart", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    addToCart(item);
  };

  const handleRemoveFromCart = (item) => {
    removeFromCart(item._id);
  };

  useEffect(() => {
    allProduct(searchQuery);
  }, [searchQuery]);

  return (
    <div>
      <ToastContainer />
      <div className="about">
        <div className="container">
          <div className="row">
            {product.map((item) => {
              const isInCart = cart?.some(
                (p) => p.product?._id === item._id
              );

              return (
                <div key={item._id} className="col-md-3" style={{ padding: "6px" }}>
                  <div className="card">
                    <img
                      style={{ height: "200px", width: "100%", objectFit: "cover" }}
                      src={
                        item.image?.[0]
                          ? `http://localhost:5000/uploads/${item.image[0]}`
                          : "/oranges.jpg"
                      }
                      className="card-img-top"
                      alt="product"
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title mb-0">{item.title}</h5>
                        <BsThreeDots
                          style={{ cursor: "pointer" }}
                          onClick={() => toggleMenu(item._id)}
                        />
                      </div>

                      {menuVisible[item._id] && (
                        <div className="menu-options mt-2">
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => openEditModal(item)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}

                      <p className="card-text mt-2">{item.description}</p>
                      <p className="card-text fw-bold">Rs. {item.price}</p>

                      {isInCart ? (
                        <button
                          className="btn btn-danger w-100"
                          onClick={() => handleRemoveFromCart(item)}
                        >
                          Remove from cart
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary w-100"
                          onClick={() => handleAddToCart(item)}
                        >
                          Add to cart
                        </button>
                      )}
                    </div>
                  </div>

                  {modalVisible &&
                    selectedProduct &&
                    selectedProduct._id === item._id && (
                      <EditProductModal
                        product={selectedProduct}
                        onClose={closeEditModal}
                        onSave={saveEdit}
                      />
                    )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
