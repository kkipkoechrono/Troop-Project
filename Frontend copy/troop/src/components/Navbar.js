import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <div className='nav'>
      <h1>Troop Tracker</h1>

      <div id='anchors'>
        <Link to='/home'>Home</Link>
        <Link to='/units'>Units</Link>
        <Link to='/about'>About</Link>
        <Link className='btn' to='/'>Logout</Link>
       
      </div>
    </div>
  );
};

export default Navbar;
