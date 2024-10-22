import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Army from './pages/Army';
import Navy from './pages/Navy';
import Marines from './pages/Marines';
import AirForce from './pages/AirForce'
import Login from './pages/Login'
import About from './pages/About';
import Register from './components/Register';
import LoginForm from './components/LoginForm';
import LandingPage from './components/LandingPage';
import Personnel from './pages/Personnel'
import Units from './pages/Units'
import Role from './pages/Role'




const App = () => {
  return (
   
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/home' element={<Home />} />
        <Route path='/army' element={<Army />} />
        <Route path='/navy' element={<Navy/>} />
        <Route path='/marines' element={<Marines/>} />
        <Route path='/air-force' element={<AirForce/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/loginform" element={<LoginForm />} />
        <Route path='/personnel' element={<Personnel/>} />
        <Route path='/units' element={<Units/>} />
        <Route path='/role' element={<Role/>} />

      </Routes>
    </Router> 
  );
}

export default App;
