import React from 'react';
import './Home.css';
import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer';

const Home = () => {
  return (
    <>
      <section className='navbar'>
        <Navbar />
      </section>

      <section className='body'>
        <Body />
      </section>

      <section>
        <Footer />
      </section>
     
    </>
  );
}

export default Home;
