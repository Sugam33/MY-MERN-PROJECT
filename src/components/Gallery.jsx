import React from 'react'
import Gallery1 from '../assets/gallery1.jpg'
import Gallery2 from '../assets/gallery2.jpg'
import Gallery3 from '../assets/gallery3.jpg'
import Gallery4 from '../assets/gallery4.jpg'
import Gallery5 from '../assets/gallery5.jpg'
import Gallery6 from '../assets/gallery6.jpg'
import Gallery7 from '../assets/gallery7.jpg'
import Gallery8 from '../assets/gallery8.jpg'


const Gallery = ({mode, textColor}) => {
   
  return (
    <div>
        <section className={`gallery py-5 bg-${mode}`}>
    <div className="container text-center">
        <h2 className="fw-bold">Gallery</h2>
        <p className={`lead text-${textColor}`}>Explore the delightful dishes and mouth watering foods that make our restaurant special.</p>

        <div className="row">
            <div className="col-md-3">
                <img src={Gallery1} className="img-fluid rounded shadow gallery-img" alt="Dish 1"  />
            </div>
            <div className="col-md-3">
                <img src={Gallery2} className="img-fluid rounded shadow gallery-img" alt="Dish 2" />
            </div>
            <div className="col-md-3">
                <img src={Gallery3} className="img-fluid rounded shadow gallery-img" alt="Dish 3" />
            </div>
            <div className="col-md-3">
                <img src={Gallery4} className="img-fluid rounded shadow gallery-img" alt="Dish 4" />
            </div>
            <div className="col-md-3">
                <img src={Gallery5} className="img-fluid rounded shadow gallery-img" alt="Dish 5" />
            </div>
            <div className="col-md-3">
                <img src={Gallery6} className="img-fluid rounded shadow gallery-img" alt="Dish 6" />
            </div>
            <div className="col-md-3">
                <img src={Gallery7} className="img-fluid rounded shadow gallery-img" alt="Dish 7" />
            </div>
            <div className="col-md-3">
                <img src={Gallery8} className="img-fluid rounded shadow gallery-img" alt="Dish 8" />
            </div>
        </div>
    </div>
</section>

    </div>
  )
}

export default Gallery
