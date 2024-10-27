import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Role.css'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = 'https://troop-project-2.onrender.com';

const RoleTable = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ role_name: '', role_description: '' });
  const [editingRole, setEditingRole] = useState(null);

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_URL}/roles`);
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRole) {
        // Update role
        await axios.put(`${API_URL}/roles/${editingRole.role_id}`, newRole);
        setEditingRole(null);
      } else {
        // Add new role
        await axios.post(`${API_URL}/roles`, newRole);
      }
      setNewRole({ role_name: '', role_description: '' });
      fetchRoles();
    } catch (error) {
      console.error('Error adding/updating role:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/roles/${id}`);
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const handleEdit = (role) => {
    setNewRole({ role_name: role.role_name, role_description: role.role_description });
    setEditingRole(role);
  };

  return (
    <>
    <div><Navbar/></div>
    <div>
      <h1>Roles Table</h1>
      
      <table border="1">
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Role Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.role_id}>
              <td>{role.role_name}</td>
              <td>{role.role_description}</td>
              <td>
                <button onClick={() => handleEdit(role)}>Edit</button>
                <button onClick={() => handleDelete(role.role_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form className='input-field' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Role Name"
          value={newRole.role_name}
          onChange={(e) => setNewRole({ ...newRole, role_name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Role Description"
          value={newRole.role_description}
          onChange={(e) => setNewRole({ ...newRole, role_description: e.target.value })}
          required
        />
        <button type="submit">{editingRole ? 'Update Role' : 'Add Role'}</button>
      </form>

    </div>
    <div><Footer/></div>
    </>
  );
};

export default RoleTable;
