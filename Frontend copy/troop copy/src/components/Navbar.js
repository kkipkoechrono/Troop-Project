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
<<<<<<< HEAD:Frontend/troop/src/components/Navbar.js
          <div className='content'>
            <Link to='/army'>Army</Link>
            <Link to='/airforce'>Air Force</Link>
            <Link to='/navy'>Navy</Link>
            <Link to='/marines'>Marines</Link>
=======
       <div className='content'>
         <Link to='/army'>Army</Link>
         <Link to='/airforce'>Air Force</Link>
         <Link to='/navy'>Navy</Link>
         <Link to='/marines'>Marines</Link>
         
>>>>>>> 972135335a243c470ba57a57aae424ce36bbf519:Frontend copy/troop copy/src/components/Navbar.js
        
          </div>
     
<<<<<<< HEAD:Frontend/troop/src/components/Navbar.js
        </a>
        <Link to='/about'>About</Link>
          <Link className='btn' to='/login'>Login/Signup</Link>
      </div>
=======
     </a>
     <Link to='/about'>About</Link>
      <Link className='btn' to='/login'>Login/Signup</Link>
    </div>
>>>>>>> 972135335a243c470ba57a57aae424ce36bbf519:Frontend copy/troop copy/src/components/Navbar.js
    </div>
    </>
  )
}

export default Navbar