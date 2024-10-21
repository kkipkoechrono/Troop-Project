import React from 'react';
import './Home.css';
import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer';

import LoginForm from './LoginForm';

const Home = () => {
  return (
    <section>
  
      <LoginForm/>
    </section>
    /*<>
    <section>
      <LoginForm/>
    </section>
    <section>
      <Register/>
    </section>
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
    */
  );
}

export default Home
