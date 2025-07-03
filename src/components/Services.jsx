import React from 'react'
import Dinein from '../assets/dinein.jpg'
import Takeaway from '../assets/takeaway.jpg'
import Delivery from '../assets/delivery.jpg'
import Private from '../assets/private.jpg'
import Birthday from '../assets/birthday.jpg'
import Livemusic from '../assets/livemusic.jpg'

const Services = ({ mode }) => {
    
  return (
    <div>
      <section className="services py-5" style={{backgroundColor: mode === 'light' ? '#F2F2F2' : 'rgb(79, 79, 79)'}}>
      
    <div className="container text-center">
        <h2 className="fw-bold">Our Services</h2>
        <p className="lead" style={{color: mode === 'light' ? 'black' : 'white'}}>Explore the delightful experiences we offer to make every visit special.</p>
        <div className="row mt-4">
            <div className="col-md-4">
                <div className="service-card p-4 d-flex flex-column justify-content-between">
                    <img src={Dinein} className="img-fluid rounded mb-3" alt="Dine-in" />
                    <h4>Dine-in</h4>
                    <p>Enjoy a cozy ambiance and expertly crafted dishes in our welcoming restaurant.</p>
                </div>
            </div>

           
            <div className="col-md-4">
                <div className="service-card p-4 d-flex flex-column justify-content-between">
                    <img src={Takeaway} className="img-fluid rounded mb-3" alt="Takeaway" />
                    <h4>Takeaway</h4>
                    <p>Order your favorite meals to go and enjoy them wherever you like.</p>
                </div>
            </div>

            
            <div className="col-md-4">
                <div className="service-card p-4 d-flex flex-column justify-content-between">
                    <img src={Delivery} className="img-fluid rounded mb-3" alt="Delivery" />
                    <h4>Delivery</h4>
                    <p>Freshly prepared dishes delivered straight to your doorstep.</p>
                </div>
            </div>
             </div>

            <div className="row mt-4">
            <div className="col-md-4">
                <div className="service-card p-4 d-flex flex-column justify-content-between">
                    <img src={Private} className="img-fluid rounded mb-3" alt="Private Events" />
                    <h4>Private Events</h4>
                    <p>Host unforgettable gatherings with customized catering and service.</p>
                </div>
            </div>

             <div className="col-md-4">
                <div className="service-card p-4 d-flex flex-column justify-content-between">
                    <img src={Birthday} className="img-fluid rounded mb-3" alt="Private Events" />
                    <h4>Birthdays</h4>
                    <p>Make your birthday unforgettable! We'll handle the details, you enjoy the celebration.</p>
                </div>
            </div>

             <div className="col-md-4">
                <div className="service-card p-4 d-flex flex-column justify-content-between">
                    <img src={Livemusic} className="img-fluid rounded mb-3" alt="Private Events" />
                    <h4>Live Music</h4>
                    <p>From elegant sophistication to vibrant energy, our live music transforms any occasion into an extraordinary experience.</p>
                </div>
            </div>
            </div>
    </div>
</section>
    </div>
  )
}

export default Services
