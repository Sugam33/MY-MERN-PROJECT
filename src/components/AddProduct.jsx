import React from "react";
import axios from "axios";

const AddProduct = ({ onProductAdded }) => {
  const [product, setProduct] = React.useState({
    title: "",
    description: "",
    price: "",
    instock: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("instock", product.instock);
    if (product.image) {
      formData.append("image", product.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/product/addproduct",
        formData,
        {
          headers: {
            "auth-token": localStorage.getItem("Token"),
          },
        }
      );

      if (response.status === 201) {
        alert("Product Added Successfully");
        setProduct({ title: "", description: "", price: "", instock: "", image: "" });
        if (onProductAdded) onProductAdded();
      } else {
        alert("Error adding product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setProduct({
        ...product,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input type="text" name="title" value={product.title} onChange={handleChange} className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <input type="text" name="description" value={product.description} onChange={handleChange} className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Price</label>
        <input type="number" name="price" value={product.price} onChange={handleChange} className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">In Stock</label>
        <input type="number" name="instock" value={product.instock} onChange={handleChange} className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Image</label>
        <input type="file" name="image" onChange={handleChange} className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default AddProduct;
