import React from 'react'
import './Footer.css';

const Footer = () => {
  return (
    <section className='footer'>
          <h2>Contact Us</h2>
      <div className='container'>
        
        
        <div className='social'>
          <h3>Socials:</h3>
          <a href='facebook.com'><i className="fab fa-facebook-f"></i></a>
          <a href='twitter.com'><i className="fab fa-twitter"></i></a>
          <a href='instagram.com'><i className="fab fa-instagram"></i></a>
          <a href='linkedin.com'><i className="fab fa-linkedin-in"></i></a>
          </div>
         
          <div className="email">
          <h3>Email Us:</h3>
          <i class="fa-regular fa-envelope"></i>
          <a href='mailto:example@example.com'>trooptracker254@gmail.com</a>
          </div>
         </div>
         <p>�� 2022 Troop Tracker.<span/> All rights reserved.</p>
    </section>
  )
}

export default Footer