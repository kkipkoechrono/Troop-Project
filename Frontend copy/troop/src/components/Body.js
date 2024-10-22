import React from 'react'
import './Body.css'
import { Link } from 'react-router-dom'
import About from '../pages/About'

const Body = () => {
  return (
    
    <>
   <section className='welcome'>
    <h1>Welcome to Troop Tracker</h1>
    <p>This is the place where all army related data is stored and used for millitary purposes.<br/>We help millitary leaders assign personnel to duties,update personnel data and even add or remove personnel</p>
  </section>

  <div id="work-list">
                <div className="work">
                    <img src='/Army.jpg' alt=''/>
                    <div className="layer">
                        <h3>PERSONNEL</h3>
                        <p>Members of the millitary</p>
                        <Link to='/personnel'><i class="fa-solid fa-link"></i></Link>
                        
                        
                    </div>
                </div>
                <div className="work">
                    <img className='airforce' src='Marines.jpg' alt=''/>
                    <div className="layer">
                        <h3>SQUADS </h3>
                        <p>Groups in millitary units</p>
                        <Link to='/squads'><i class="fa-solid fa-link"></i></Link>
                        
                    </div>
                </div>
                <div className="work">
                    <img src='/Navy.jpg' alt=''/>
                    <div className="layer">
                        <h3>ROLES</h3>
                        <p>Members of the millitary and what they do</p>
                        <Link to='/role'><i class="fa-solid fa-link"></i></Link>
                    </div>
                </div>

                <div className="work">
                    <img className='airforce' src='/Airforce.jpg' alt=''/>
                    <div className="layer">
                        <h3>OPERATIONS</h3>
                        <p>Future ogoing or past activities</p>
                        <Link to='/air-force'><i class="fa-solid fa-link"></i></Link>
                    </div>
                </div>
            </div>

            <div>
                <About/>
            </div>
  </>
  )
}

export default Body