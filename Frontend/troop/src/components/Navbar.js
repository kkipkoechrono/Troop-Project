import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <>
    <div className='nav'>
     <h1>Troop Tracker</h1>

    <div className='anchors'>
      <a href='#home'>Home</a>
      <a href='#services'>Units</a>
      <a href='#about'>About</a>
      <a className='btn' href='#contact'>Login/Signup</a>
    </div>
    </div>
    </>
  )
}

export default Navbar