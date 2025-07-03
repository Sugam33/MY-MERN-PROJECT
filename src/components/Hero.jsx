import React from 'react'

const Hero = () => {
  return (
    <div>
         <header className="hero d-flex align-items-center text-white">
        <div className="container hero-container">
            <div className="row">
                <div className="col-md-6 text-container">
                    <h1 className="fw-bold">Welcome to <span>Sekuwaghar</span></h1>
                    <p className="lead">Where Flavor Meets Passion and <br /> food that makes you happy</p>
                    <a href="#menu" className="btn btn-danger btn-lg">View Menu</a>
                </div>
            </div>
        </div>
    </header>
    </div>
  )
}

export default Hero
