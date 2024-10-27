import React from 'react';
import './Home.css';
import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer';
import PersonnelTable from './PersonnelTable';

const Home = () => {
  return (
    <>
      <section className='navbar'>
        <Navbar />
      </section>

      <section className='body'>
       <PersonnelTable/>
      </section>

      <section>
        <Footer />
      </section>
     
    </>
  );
}

export default Home;
