import React, { useReducer, useEffect } from "react";
import ProductContext from "./ProductContext";
import { cartReducer } from "./Reducer";

const ProductState = (props) => {
  const [product, setProduct] = React.useState([]);
  const [state, dispatch] = useReducer(cartReducer, {
    products: product,
    cart: [],
  });

  const allProduct = async (searchQuery = "") => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/product/allhomeproduct?searchQuery=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("Token"),
          },
        }
      );
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchCart = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/cart/mycart`, {
        headers: {
          "auth-token": localStorage.getItem("Token"),
        },
      });
      const data = await res.json();
      const formattedCart = data.map((item) => ({
        ...item,
        qty: item.quantity,
      }));
      dispatch({ type: "SET_CART", payload: formattedCart });
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  const addToCart = async (item) => {
    const token = localStorage.getItem("Token");
    if (!token) {
      console.warn("User not logged in");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/cart/addtocart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          product: item._id,
          quantity: 1,
          price: item.price,
        }),
      });
      const data = await res.json();
      fetchCart();
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("Token");
    if (!token) {
      console.warn("User not logged in");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/cart/removefromcart/${productId}`, {
        method: "DELETE",
        headers: {
          "auth-token": token,
        },
      });
      const data = await res.json();
      fetchCart();
    } catch (err) {
      console.error("Remove from cart failed:", err);
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem("Token");
    if (!token) {
      console.warn("User not logged in");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/cart/clearcart`, {
        method: "DELETE",
        headers: {
          "auth-token": token,
        },
      });
      const data = await res.json();
      fetchCart();
    } catch (err) {
      console.error("Clear cart failed:", err);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    const token = localStorage.getItem("Token");
    if (!token) {
      console.warn("User not logged in");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/cart/updatecart/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ quantity }),
      });
      const data = await res.json();
      fetchCart();
    } catch (err) {
      console.error("Update cart item failed:", err);
    }
  };

  const clearCartState = () => {
    dispatch({ type: "CLEAR_CART" }); //  Clears cart from context
  };

  const editProduct = async (id, updatedData) => {
    try {
      const res = await fetch(`http://localhost:5000/api/product/updateproduct/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("Token"),
        },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      allProduct();
    } catch (err) {
      console.error("Edit product failed:", err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/product/deleteproduct/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem("Token"),
        },
      });
      const data = await res.json();
      allProduct();
    } catch (err) {
      console.error("Delete product failed:", err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      fetchCart();
    }
  }, []);

  return (
    <ProductContext.Provider
      value={{
        product,
        state,
        dispatch,
        allProduct,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        clearCartState, 
        editProduct,
        deleteProduct,
        fetchCart,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
