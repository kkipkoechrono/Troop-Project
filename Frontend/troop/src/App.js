import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Army from './pages/Army';
import Navy from './pages/Navy';
import Marines from './pages/Marines';
import AirForce from './pages/AirForce'
import Login from './pages/Login'
import About from './pages/About';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/army" element={<Army />} />
        <Route path='/navy' element={<Navy/>} />
        <Route path='/marines' element={<Marines/>} />
        <Route path='/air-force' element={<AirForce/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>}/>
      </Routes>
    </Router>
  );
}

export default App;
