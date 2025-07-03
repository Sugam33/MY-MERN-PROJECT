import React from 'react'
import Comp1 from '../assets/comp1.jpg'

const One = (props) => {
  return (
    <div className={`one bg-${props.mode}`}>
        <div className="container">
            <h4 className='text-dark'>This is our service</h4>
            <div className="row">
            <div className="col-md-4">
            <div className={`card bg-${props.mode}`}>
  <img src={Comp1} className="card-img-top" alt="..." height={400}/>
  <div className="card-body">
    <h5 className={`card-title text-${props.textColor}`}>Card title</h5>
     <p className={`card-text text-${props.textColor}`}>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </p>
    <a href="#" className={`btn btn-primary text-${props.textColor}`}>Go somewhere</a>
  </div>
  </div>
</div>

     <div className="col-md-4">
            <div className={`card bg-${props.mode}`}>
  <img src={Comp1} className="card-img-top" alt="..." height={400}/>
  <div className="card-body">
    <h5 className={`card-title text-${props.textColor}`}>Card title</h5>
     <p className={`card-text text-${props.textColor}`}>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </p>
    <a href="#" className={`btn btn-primary text-${props.textColor}`}>Go somewhere</a>
  </div>
  </div>
</div>

     <div className="col-md-4">
            <div className={`card bg-${props.mode}`}>
  <img src={Comp1} className="card-img-top" alt="..." height={400}/>
  <div className="card-body">
    <h5 className={`card-title text-${props.textColor}`}>Card title</h5>
     <p className={`card-text text-${props.textColor}`}>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </p>
    <a href="#" className={`btn btn-primary text-${props.textColor}`}>Go somewhere</a>
  </div>
  </div>
</div>

    </div>

      <div className="row bottom-row">
            <div className="col-md-4">
            <div className={`card bg-${props.mode}`}>
  <img src={Comp1} className="card-img-top" alt="..." height={400}/>
  <div className="card-body">
    <h5 className={`card-title text-${props.textColor}`}>Card title</h5>
     <p className={`card-text text-${props.textColor}`}>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </p>
    <a href="#" className={`btn btn-primary text-${props.textColor}`}>Go somewhere</a>
  </div>
  </div>
</div>

     <div className="col-md-4">
            <div className={`card bg-${props.mode}`}>
  <img src={Comp1} className="card-img-top" alt="..." height={400}/>
  <div className="card-body">
    <h5 className={`card-title text-${props.textColor}`}>Card title</h5>
     <p className={`card-text text-${props.textColor}`}>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </p>
    <a href="#" className={`btn btn-primary text-${props.textColor}`}>Go somewhere</a>
  </div>
  </div>
</div>

     <div className="col-md-4">
            <div className={`card bg-${props.mode}`}>
  <img src={Comp1} className="card-img-top" alt="..." height={400}/>
  <div className="card-body">
    <h5 className={`card-title text-${props.textColor}`}>Card title</h5>
     <p className={`card-text text-${props.textColor}`}>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </p>
    <a href="#" className={`btn btn-primary text-${props.textColor}`}>Go somewhere</a>
  </div>
  </div>
</div>

    </div>
        </div>
    </div>
  )
}

export default One
