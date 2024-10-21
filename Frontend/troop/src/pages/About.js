import React from 'react'
import './About.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const About = () => {
  return (
    <>
    <div><Navbar/></div>

    <section className='about'>
      <div className='main'>
        <img src="/trooptracker.png" alt=""/>
        <div className='about-text'>
           <h1>About Us</h1>
           <h5>Ex Millitary</h5>
           <p>We are a group of developers who are ex millitary of the Kenyan Marine Forces.We created this website after realising the problem in most of our millitary bases.
              Many doldiers go unpaid or not taken care of due to mishandling of data in the higher ups offices.
               We want to help our fellow soldiers and officers keep track of their data, assign them tasks and make it easy for them to find their way around.
                We believe that this tool will make our lives easier and more efficient.
           </p>
           <a className='about-contact' href='#work-list'>Meet Our Members</a>

         </div>
      </div>
      
      <div id='work-list'>
      <div className='item'>
         <img src='/Peter.jpg' alt=''/>
         <h2>Peter Rono</h2>
         <div className='price'>Scrum Master
            <p>Call: 0700 111 111</p>
         </div>
         </div>

         <div className='item'>
         <img className='cleveland' src='/Cleveland 3.jpg' alt=''/>
         <h2>Quincy Jones</h2>
         <div className='price'>Member
            <p>Call: 0700 222 222</p>
         </div>
         </div>

         <div className='item'>
         <img src='/Quagmire.jpg' alt=''/>
         <h2>Arnold Omwansa</h2>
         <div className='price'>Member
            <p>Call: 0700 333 333</p>
         </div>
         </div>

         <div className='item'>
         <img src='/Stewie.jpg' alt=''/>
         <h2>Brendan Gwer</h2>
         <div className='price'>Member
            <p>Call: 0700 444 444</p>
         </div>
         </div>
         </div>
    </section>
    <div>
        <Footer/>
 
    </div>
    </>
  )
}

export default About