import React from 'react'

const Testimonials = ({mode, textColor}) => {
  return (
    <div>
      <section className={`testimonials py-5 bg-${mode}`}>
    <div className="container text-center">
        <h2 className="fw-bold">Testimonials</h2>
        <p className={`lead text-${textColor}`}>Hear what our customers have to say about their experience!</p>

        <div className="row justify-content-center">
          
            <div className="col-md-4">
                <div className="testimonial-card p-4 shadow-sm">
                    <p className="testimonial-text">"Best food in town! Highly recommend."</p>
                    <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                    </div>
                    <h5 className="customer-name">- Sugam Shakya</h5>
                </div>
            </div>

      
            <div className="col-md-4">
                <div className="testimonial-card p-4 shadow-sm">
                    <p className="testimonial-text">"Amazing service and delicious meals! Will definitely be back."</p>
                    <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-half-o"></i> 
                    </div>
                    <h5 className="customer-name">- Max Bahadur</h5>
                </div>
            </div>

        
            <div className="col-md-4">
                <div className="testimonial-card p-4 shadow-sm">
                    <p className="testimonial-text">"A fantastic dining experience with a cozy ambiance. Loved it!"</p>
                    <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-o"></i>
                        <i className="fa fa-star-o"></i>
                    </div>
                    <h5 className="customer-name">- Hari Prasad </h5>
                </div>
            </div>
            
        </div>
    </div>
</section>

    </div>
  )
}

export default Testimonials
