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
     <a className='dropdown' href='#services'>Units <i class="fa-solid fa-angle-down"></i>
       <div className='content'>
         <Link to='/army'>Army</Link>
         <Link to='/airforce'>Air Force</Link>
         <Link to='/navy'>Navy</Link>
         <Link to='/marines'>Marines</Link>
        
       </div>
     
     </a>
     <Link to='/about'>About</Link>
     <Link className='btn' to='/login'>Login/Signup</Link>
    </div>
    </div>
    </>
  )
}

export default Navbar