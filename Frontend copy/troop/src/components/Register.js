import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { Link } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:5555';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordPattern.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If all validations pass, submit the form
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Send the form data to the server
      if (response.status === 201) {
        setSuccessMessage('Registration successful');
        setFormData({
          username: '',
          email: '',
          password: '',
        });
        setErrors({});
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({ api: error.response.data.message });
      } else {
        setErrors({ api: 'An error occurred while trying to register' });
      }
    }
  };

  return (
    <div className='register-container'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.api && <p>{errors.api}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button type="submit">Register</button>
        {successMessage && <p>{successMessage}</p>}
      </form>
      <Link to='/'>Already have an account? Login</Link>
    </div>
  );
};

export default RegistrationForm;


/*import React from 'react'
import './Register.css'
import { useState } from 'react'
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5555';

const RegistrationForm = () => {
const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const [successMessage, setSuccessMessage] = useState('');
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };
  //Email validation using a regex pattern

  const validateEmail = (email) => {
    const emailPattern= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePasword = (password) => {
    const passwordPattern= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordPattern.test(password);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!validatePasword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If all validations pass, submit the form
    try {
        
        const response = await axios.post(`${API_URL}/register`,formData);
      // Send the form data to the server
      if (response.status === 201){
      setSuccessMessage('Registration successful');
      setFormData({
        username: '',
        email: '',
        password: ''
    });
    setErrors('');
        }
    } catch (error) {
      if (error.response && error.response.data){
        setErrors({ api: error.response.data.message});
      } else {
        setErrors({ api: 'An error occurred while trying to register' });
      }
    }
      
  };
  return (
    <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <button  type='submit'>Register</button>
          </form>
    </div>
  );
};

export default RegistrationForm*/