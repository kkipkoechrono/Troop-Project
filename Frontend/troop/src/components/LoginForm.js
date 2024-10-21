import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './LoginForm.css' 
const API_URL = 'http://127.0.0.1:5555';

const LoginForm = () => {
    const [formData, setFormData] = useState({
      username: '',
      password: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');


    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});
      setSuccessMessage('');

      try {
        console.log('Form data being sent:', formData); // Debugging line
        const response = await axios.post(`${API_URL}/login`, formData);

        if (response.status === 200) {
          const token = response.data.token;
          localStorage.setItem('authToken', token);
          setSuccessMessage('Login successful');

        }
      } catch (error) {
        console.error('Login error:', error); // Debugging line
        if (error.response && error.response.data) {
          setErrors({ api: error.response.data.message });
        } else {
            setErrors({ api: 'An error occurred while trying to login' });
        }
      }
    };

    return (
        <div className='login-container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input 
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                </div>
                <button type="submit">Login</button>
                <Link to="/register">Don't have an account ? Register here</Link>

            </form>
            {errors.api && <p style={{ color: 'red' }}>{errors.api}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default LoginForm;


/*import React from 'react'
import { useState } from 'react'
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5555';

const LoginForm = () => {
    const [formData, setFormData] = useState({
      username: '',
      password: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});

      try {
        const response = await axios.post(`${API_URL}/login`, formData);

        // If the login is successful, set the token in local storage
        if (response.status === 200) {
          const token = response.data.token;
          localStorage.setItem('authToken', token);
          setSuccessMessage('Login successful');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          setErrors({ api: error.response.data.message });
        } else {
            setErrors({ api: 'An error occurred while trying to login' });
        }
      }
    };
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
            <div>
    <label>Username:</label>
    <input 
      type="text"
      name="username"
      value={formData.username}
      onChange={handleChange}
      required
    />
</div>

<div>
    <label>Password:</label>
    <input 
      type="password"  // Change type to "password" for security
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
    />
</div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
};
          

export default LoginForm*/