import React from 'react'
import { Link } from 'react-router-dom'

const Footer = ({mode}) => {
  return (
    <div>
      <footer className="footer py-4" style={{backgroundColor: mode === 'light' ? '#94B4C1' : '#0E2148'}}>
    <div className="container text-center">
        <div className="row">
            <div className="col-md-4">
                <h4 className="fw-bold"><Link to="/">Sekuwaghar</Link></h4>
                <p>Serving passion on every plate. Visit us for an unforgettable experience!</p>
            </div>

            <div className="col-md-4">
                <h5 className="fw-bold">Quick Links</h5>
                <ul className="list-unstyled">
                    <li><Link to="/about">Our Products</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/gallery">Gallery</Link></li>
                    <li><Link to="/contacts">Contact</Link></li>
                </ul>
            </div>

            <div className="col-md-4">
                <h5 className="fw-bold">Follow Us</h5>
                <a href="#" className="social-icon"><i className="fa fa-facebook"></i></a>
                <a href="#" className="social-icon"><i className="fa fa-instagram"></i></a>
                <a href="#" className="social-icon"><i className="fa fa-twitter"></i></a>
            </div>
        </div>
        <p className="mt-3">&copy; 2025 Sekuwaghar. All Rights Reserved.</p>
    </div>
</footer>

    </div>
  )
}

export default Footer
