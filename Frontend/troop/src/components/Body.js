import React from 'react'
import './Body.css'
//import { Link } from 'react-router-dom'

const Body = () => {
  return (
    
    <>
   <section className='welcome'>
    <h1>Welcome to Troop Tracker</h1>
    <p>This is the place where all army related data is stored and used for millitary purposes.<br/>We help millitary leaders assign personnel to duties,update personnel data and even add or remove personnel</p>
  </section>

  <div className="work-list">
                <div className="work">
                    <img src='/Army.jpg' alt=''/>
                    <div className="layer">
                        <h3>Army</h3>
                        <p>Millitary combatants on the ground</p>
                        
                        
                    </div>
                </div>
                <div className="work">
                    <img className='airforce' src='Marines.jpg' alt=''/>
                    <div className="layer">
                        <h3>Airforce </h3>
                        <p>Millitary personnel on the air</p>
                        
                    </div>
                </div>
                <div className="work">
                    <img src='/Navy.jpg' alt=''/>
                    <div className="layer">
                        <h3>Navy</h3>
                        <p>Millitary personnel on the waters</p>
                    </div>
                </div>

                <div className="work">
                    <img className='airforce' src='/Airforce.jpg' alt=''/>
                    <div className="layer">
                        <h3>Air-force</h3>
                        <p>Millitary personnel on both land and the waters</p>
                    </div>
                </div>
            </div>
  </>
  )
}

export default Body