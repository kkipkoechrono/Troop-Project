import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <div className='nav'>
     <h1>Troop Tracker</h1>

    <div className='anchors'>
      <Link to='/'>Home</Link>
      <a href='#services'>Units</a>
      <a href='#about'>About</a>
      <a className='btn' href='#contact'>Login/Signup</a>
    </div>
    </div>
    </>
  )
}

export default Navbar