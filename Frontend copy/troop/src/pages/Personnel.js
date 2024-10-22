import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Personnel.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const API_URL = 'http://127.0.0.1:5555';

const PersonnelTable = () => {
  const [personnels, setPersonnels] = useState([]);
  const [newPersonnel, setNewPersonnel] = useState({
    first_name: '', last_name: '', rank: '', role_id: '', unit_id: '', squad_id: '', phone_number: '', email: '', age: '', joining_date: ''
  });
  const [editingPersonnel, setEditingPersonnel] = useState(null);

  // Fetch personnel data from the API
  const fetchPersonnels = async () => {
    try {
      const response = await axios.get(`${API_URL}/personnels`);
      setPersonnels(response.data);
    } catch (error) {
      console.error('Error fetching personnels:', error);
    }
  };

  // Load personnels on component mount
  useEffect(() => {
    fetchPersonnels();
  }, []);

  // Handle form submission to add/update personnel
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingPersonnel) {
        // Update personnel
        await axios.put(`${API_URL}/personnels/${editingPersonnel.id}`, newPersonnel);
        setEditingPersonnel(null);
      } else {
        // Add new personnel
        await axios.post(`${API_URL}/personnels`, newPersonnel);
      }
      setNewPersonnel({ first_name: '', last_name: '', rank: '', role_id: '', unit_id: '', squad_id: '', phone_number: '', email: '', age: '', joining_date: '' });
      fetchPersonnels();
    } catch (error) {
      console.error('Error adding/updating personnel:', error);
    }
  };

  // Handle personnel deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/personnels/${id}`);
      fetchPersonnels();
    } catch (error) {
      console.error('Error deleting personnel:', error);
    }
  };

  // Handle personnel edit
  const handleEdit = (personnel) => {
    setNewPersonnel({
      first_name: personnel.first_name,
      last_name: personnel.last_name,
      rank: personnel.rank,
      role_id: personnel.role_id,
      unit_id: personnel.unit_id,
      squad_id: personnel.squad_id,
      phone_number: personnel.phone_number,
      email: personnel.email,
      age: personnel.age,
      joining_date: personnel.joining_date
    });
    setEditingPersonnel(personnel);
  };

  return (
    <>
    <div><Navbar/></div>
    <div>
      <h1>Personnel Table</h1>
      

      {/* Personnel Table */}
      <table border="1">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Rank</th>
            <th>Role ID</th>
            <th>Unit ID</th>
            <th>Squad ID</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {personnels.map((personnel) => (
            <tr key={personnel.id}>
              <td>{personnel.first_name}</td>
              <td>{personnel.last_name}</td>
              <td>{personnel.rank}</td>
              <td>{personnel.role_id}</td>
              <td>{personnel.unit_id}</td>
              <td>{personnel.squad_id}</td>
              <td>{personnel.phone_number}</td>
              <td>{personnel.email}</td>
              <td>
                <button onClick={() => handleEdit(personnel)}>Edit</button>
                <button onClick={() => handleDelete(personnel.id)}>Delete</button>
              </td>
            </tr>
          ))}


        </tbody>
      </table>

        {/* Personnel Form */}
        <form className='input-field' onSubmit={handleSubmit}>
      <input type="text" placeholder="First Name" value={newPersonnel.first_name} onChange={(e) => setNewPersonnel({ ...newPersonnel, first_name: e.target.value })} required />
      <input type="text" placeholder="Last Name" value={newPersonnel.last_name} onChange={(e) => setNewPersonnel({ ...newPersonnel, last_name: e.target.value })} required />
      <input type="text" placeholder="Rank" value={newPersonnel.rank} onChange={(e) => setNewPersonnel({ ...newPersonnel, rank: e.target.value })} required />
      <input type="number" placeholder="Role ID" value={newPersonnel.role_id} onChange={(e) => setNewPersonnel({ ...newPersonnel, role_id: e.target.value })} required />
      <input type="number" placeholder="Unit ID" value={newPersonnel.unit_id} onChange={(e) => setNewPersonnel({ ...newPersonnel, unit_id: e.target.value })} required />
      <input type="number" placeholder="Squad ID" value={newPersonnel.squad_id} onChange={(e) => setNewPersonnel({ ...newPersonnel, squad_id: e.target.value })} required />
      <input type="number" placeholder="Phone Number" value={newPersonnel.phone_number} onChange={(e) => setNewPersonnel({ ...newPersonnel, phone_number: e.target.value })} required />
      <input type="email" placeholder="Email" value={newPersonnel.email} onChange={(e) => setNewPersonnel({ ...newPersonnel, email: e.target.value })} required />
      <input type="number" placeholder="Age" value={newPersonnel.age} onChange={(e) => setNewPersonnel({ ...newPersonnel, age: e.target.value })} required />
      <input type="date" placeholder="Joining Date" value={newPersonnel.joining_date} onChange={(e) => setNewPersonnel({ ...newPersonnel, joining_date: e.target.value })} required />
      <button type="submit">{editingPersonnel ? 'Update Personnel' : 'Add Personnel'}</button>
        </form>
    </div>
    <div><Footer/></div>
    </>
  );
};

export default PersonnelTable;