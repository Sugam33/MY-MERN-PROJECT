import React, { useState } from "react";

const FormDetails = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h3 className="mb-4">Company Details</h3>
          <form>
            <div className="mb-3">
              <label className="form-label" >Company Name:</label>
              <input 
                type="text" 
                className="form-control" 
                name="companyName" 
                value={formData.companyName} 
                onChange={handleChange} 
                placeholder="Enter company name" 
              />
            </div>
            <div className="mb-3">
              <label className="form-label" >Address:</label>
              <input 
                type="text" 
                className="form-control" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                placeholder="Enter address" 
              />
            </div>
            <div className="mb-3">
              <label className="form-label" >Phone:</label>
              <input 
                type="number" 
                className="form-control" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Enter phone number" 
              />
            </div>
            <div className="mb-3">
              <label className="form-label" >Email:</label>
              <input 
                type="email" 
                className="form-control" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Enter email address" 
              />
            </div>
          </form>
        </div>

        <div className="col-md-6">
          <h3 className="mb-4">Entered Details</h3>
          <div className="border p-3 rounded bg-light">
            <p><strong>Company Name:</strong> {formData.companyName}</p>
            <p><strong>Address:</strong> {formData.address}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Email:</strong> {formData.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDetails

