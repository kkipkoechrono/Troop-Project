import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Squads.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = 'http://127.0.0.1:5555';

const SquadsTable = () => {
  const [squads, setSquads] = useState([]);
  const [newSquad, setNewSquad] = useState({
    squad_name: '',
    squad_size: '',
    unit_id: ''
  });
  const [editingSquad, setEditingSquad] = useState(null);

  // Fetch squads from the API
  const fetchSquads = async () => {
    try {
      const response = await axios.get(`${API_URL}/squads`);
      setSquads(response.data);
    } catch (error) {
      console.error('Error fetching squads:', error);
    }
  };

  // Load squads on component mount
  useEffect(() => {
    fetchSquads();
  }, []);

  // Handle form submission to add/update squad
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingSquad) {
        // Update squad
        await axios.put(`${API_URL}/squads/${editingSquad.squad_id}`, newSquad);
        setEditingSquad(null);
      } else {
        // Add new squad
        await axios.post(`${API_URL}/squads`, newSquad);
      }
      setNewSquad({ squad_name: '', squad_size: '', unit_id: '' });
      fetchSquads();
    } catch (error) {
      console.error('Error adding/updating squad:', error);
    }
  };

  // Handle squad deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/squads/${id}`);
      fetchSquads();
    } catch (error) {
      console.error('Error deleting squad:', error);
    }
  };

  // Handle squad edit
  const handleEdit = (squad) => {
    setNewSquad({
      squad_name: squad.squad_name,
      squad_size: squad.squad_size,
      unit_id: squad.unit_id
    });
    setEditingSquad(squad);
  };

  return (
    <>
    <div><Navbar/></div>
    <div>
      <h1>Squads Table</h1>

      {/* Squads Table */}
      <table border="1">
        <thead>
          <tr>
            <th>Squad Name</th>
            <th>Squad Size</th>
            <th>Unit ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {squads.map((squad) => (
            <tr key={squad.squad_id}>
              <td>{squad.squad_name}</td>
              <td>{squad.squad_size}</td>
              <td>{squad.unit_id}</td>
              <td>
                <button onClick={() => handleEdit(squad)}>Edit</button>
                <button onClick={() => handleDelete(squad.squad_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       {/* Squad Form */}
       <form className='input-field' onSubmit={handleSubmit}>
        <input type="text" placeholder="Squad Name" value={newSquad.squad_name} onChange={(e) => setNewSquad({ ...newSquad, squad_name: e.target.value })} required />
        <input type="number" placeholder="Squad Size" value={newSquad.squad_size} onChange={(e) => setNewSquad({ ...newSquad, squad_size: e.target.value })} required />
        <input type="number" placeholder="Unit ID" value={newSquad.unit_id} onChange={(e) => setNewSquad({ ...newSquad, unit_id: e.target.value })} required />
        <button type="submit">{editingSquad ? 'Update Squad' : 'Add Squad'}</button>
      </form>

    </div>
    <div><Footer/></div>
    </>
  );
};

export default SquadsTable;
