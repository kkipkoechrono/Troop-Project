import React from 'react';
import './Home.css';
import Navbar from './Navbar';

const Home = () => {
  return (
    <>
      <section className='navbar'>
        <Navbar />
      </section>
      <section className='welcome'>
        <h1>Welcome to Our Website!</h1>
        <p>Explore our features and get started.</p>
      </section>
    </>
  );
}

export default Home;
