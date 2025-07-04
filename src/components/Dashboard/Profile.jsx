import React from 'react';
import Kratos from '../../assets/kratos.jpg';

const Profile = () => {
  return (
    <section className="profile-container">
      <div className="profile-card">
        <div className="profile-image">
          <img src={Kratos} alt="kratos profile img" />
        </div>
        <div className="profile-info">
          <h2>Kratos</h2>
          {/* <p className="role">Admin</p> */}
          <p className="email">Kratos@gmail.com</p>
          <p className="location">Midgard</p>
        </div>
      </div>

      <div className="product-summary">
        <h3>My Products</h3>
        <p className="product-count">Total: 0</p>
        <button className="view-products">View my Products</button>
      </div>
    </section>
  );
};

export default Profile;