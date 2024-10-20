import React,{useState} from 'react'
import './Login.css'
import Navbar from '../components/Navbar'

const Login = () => {

  const[action,setAction] = useState('Login');
  return (
    <>
    <div>
      <Navbar/>
    </div>
    
    <div className='login-container'>
      <div className='text'>{action}</div>
     
     <div className='inputs'>
      {action==="Login"?<div></div>:
      <div className='input'>
        <img className='img' src='/person.png' alt=''/>
        <input placeholder='Name' type='name' />
      </div>}
      <div className='input'>
        <img className='img' src='mail.png'alt=''/>
        <input placeholder='Email' type='email' />
      </div>
      <div className='input'>
        <img className='img' src='lock.png' alt=''/>
        <input placeholder='Password' type='Password' />
      </div>
     </div>
     {action==="Sign Up"?<div></div>: <div className='forgot-password'>Forgot Password?<span>Click here</span></div>}
    
     <div className='submit-container'>
     <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}} > Sign Up</div>
     <div className={action==="Sign Up"?"submit gray":"submit"}onClick={()=>{setAction("Login")}}  >Login</div>
     </div>
    </div>

    </>
  )
}

export default Login