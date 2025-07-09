import React, { useContext } from "react";
import ProductContext from "../context/ProductContext";
import { MdDelete } from "react-icons/md";

const CartItems = () => {
  const context = useContext(ProductContext);
  const {
    state: { cart },
    removeFromCart,
    updateCartItem,
    clearCart,
  } = context;

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="container mt-4 cart-container">
      <h2 className="text-center mb-4">Your Cart</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="bg-primary text-white">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((item) => (
              <tr key={item._id}>
                <td>
                  <img
                    src={
                      item.product?.image?.[0]
                        ? `http://localhost:5000/uploads/${item.product.image[0]}`
                        : "/oranges.jpg"
                    }
                    style={{
                      height: "100px",
                      width: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                    className="img-fluid"
                    alt="product"
                  />
                </td>
                <td>{item.product?.title || "Untitled"}</td>
                <td>Rs. {item.price}</td>
                <td>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      updateCartItem(item.product._id, Number(e.target.value))
                    }
                    className="form-control"
                  >
                    {[...Array(10).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(item.product._id)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="summary mt-4 d-flex flex-column align-items-center">
        <h5>Total items: {cart.length}</h5>
        <h4 className="mb-3">Sub-total: Rs. {total}</h4>

        <div className="d-flex flex-wrap justify-content-center gap-3">
          <button
            className="btn btn-outline-danger btn-lg"
            onClick={clearCart}
            style={{ minWidth: "180px" }}
          >
            Clear Cart
          </button>

          <button
            className="btn btn-success btn-lg"
            onClick={() => alert("Proceeding to checkout...")}
            style={{ minWidth: "180px" }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
