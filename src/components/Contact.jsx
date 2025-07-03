import React from 'react'
import SmallBanner from './SmallBanner';
import { ToastContainer, toast } from 'react-toastify';


const Contact = () => {
  let contactTitle = "Contact us";

   const notify = () => toast("Form Submitted!!", {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});
  return (
    <>
    <div>
      <SmallBanner /> 
       <ToastContainer/>
      <h2 className='title'>{contactTitle}</h2>
    </div>

    <footer className='contact-footer'>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
                  <h2>Let's Connect!</h2>
                  <p>Your thoughts, questions, and feedback are what help us grow and improve <br /> Teak. Whether you've encountered an issue, have a suggestion, or just want to <br /> share your experience, we're here to listen. Reach out to us using the form <br /> below or through any of the other contact methods provided. Let's make your <br /> bookmarking experience even better, together.</p>
                  <div className="content-box first-box">
                    <p><i className="fa fa-at"></i></p>
                    <p className='support-text'>support@teck.com</p>
                  </div>
                      <br />
                   <div className="content-box second-box">
                    <i className="fa fa-phone"></i>
                    <p>+123 456 7890</p>
                  </div>
                       <br />
                   <div className="content-box third-box">
                    <p><i className="fa fa-map-marker"></i></p>
                    <p className='third-box-text'>123 Teak Lane, Bookmark City, WebWorld</p>
                  </div>
            </div>

            <div className="col-md-6">
                <div className="form-container">
                    <p className='top-form-text'>Please fill out the form below with your query or message. We strive to respond to all inquiries <br /> within 24 hours or before </p>
                    <div className="input-container">
                      <div className="input-flex-container">
                          <p>Your Name</p>  
                          <input type="text" placeholder='Enter your name'/>
                      </div>

                       <div className="input-flex-container">
                          <p>Your Email Address</p>  
                          <input type="email" placeholder='Enter your email'/>
                      </div>

                       <div className="input-flex-container">
                          <p>What's this about?</p>  
                          <input type="text" placeholder='Enter an subject'/>
                      </div>

                       <div className="input-flex-container">
                          <p className='message-box'>Message Box</p>  
                          <textarea rows={6} cols={56} placeholder='Enter your message'/>
                      </div>

                      <div className="input-flex-container">
                          <button type="submit" className="send-button" onClick={notify}>Send Now</button>
                      </div>

                </div>
                </div>
                
            </div>
          </div>
           </div>

        <div className="container-fluid m-0 p-0">
          <div className="row map-row">
            <div className="col-md-12">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14130.927050714707!2d85.32951860188965!3d27.69468421903351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb199a06c2eaf9%3A0xc5670a9173e161de!2sNew%20Baneshwor%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1748357558791!5m2!1sen!2snp"></iframe>
            </div>
          </div>
       </div>
    </footer>
    </>
  )
}

export default Contact
