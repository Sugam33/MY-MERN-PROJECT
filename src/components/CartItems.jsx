import React, { useContext } from "react";
import ProductContext from "../context/ProductContext";
import { MdDelete } from "react-icons/md";

const CartItems = () => {
  const context = useContext(ProductContext);

  const {
    state: { cart },
    dispatch,
  } = context;
  console.log("nav cart", cart);
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
    src={item.image}
    alt="Product"
    style={{
      height: "100px",
      width: "200px",
      objectFit: "cover",
      borderRadius: "8px",
    }}
    className="img-fluid"
  />
</td>
                <td>{item.name}</td>
                <td>Rs. {item.price}</td>
                <td>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_CART_ITEM",
                        payload: { _id: item._id, qty: Number(e.target.value) },
                      })
                    }
                    className="form-control"
                  >
                    {[...Array(item.inStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: item,
                      })
                    }
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="summary mt-3 text-center">
        <h5>Total items: {cart.length}</h5>
        <h4>Sub-total: Rs. {total}</h4>
        <button className="btn btn-success btn-lg mt-2">Proceed to checkout</button>
      </div>
    </div>
  );
};

export default CartItems;
