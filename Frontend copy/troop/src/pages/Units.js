import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = 'http://127.0.0.1:5555';

const UnitTable = () => {
  const [units, setUnits] = useState([]);
  const [newUnit, setNewUnit] = useState({
    unit_name: '',
    unit_type: '',
    unit_location: '',
  });
  const [editingUnit, setEditingUnit] = useState(null);

  const fetchUnits = async () => {
    try {
      const response = await axios.get(`${API_URL}/units`);
      setUnits(response.data);
    } catch (error) {
      console.error('Error fetching units:', error);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUnit) {
        await axios.put(`${API_URL}/units/${editingUnit.unit_id}`, newUnit);
        setEditingUnit(null);
      } else {
        await axios.post(`${API_URL}/units`, newUnit);
      }
      setNewUnit({ unit_name: '', unit_type: '', unit_location: '' });
      fetchUnits();
    } catch (error) {
      console.error('Error adding/updating unit:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/units/${id}`);
      fetchUnits();
    } catch (error) {
      console.error('Error deleting unit:', error);
    }
  };

  const handleEdit = (unit) => {
    setNewUnit({
      unit_name: unit.unit_name,
      unit_type: unit.unit_type,
      unit_location: unit.unit_location,
    });
    setEditingUnit(unit);
  };

  return (
    <>
    <div><Navbar/></div>
    <div>
      <h1>Units Table</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Unit Name</th>
            <th>Unit Type</th>
            <th>Unit Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {units.map((unit) => (
            <tr key={unit.unit_id}>
              <td>{unit.unit_name}</td>
              <td>{unit.unit_type}</td>
              <td>{unit.unit_location}</td>
              <td>
                <button onClick={() => handleEdit(unit)}>Edit Location</button>
                <button onClick={() => handleDelete(unit.unit_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form className='input-field' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Unit Name"
          value={newUnit.unit_name}
          readOnly={!!editingUnit} // Make read-only if editing
          onChange={(e) => setNewUnit({ ...newUnit, unit_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Unit Type"
          value={newUnit.unit_type}
          readOnly={!!editingUnit} // Make read-only if editing
          onChange={(e) => setNewUnit({ ...newUnit, unit_type: e.target.value })}
        />
        <input
          type="text"
          placeholder="Unit Location"
          value={newUnit.unit_location}
          onChange={(e) => setNewUnit({ ...newUnit, unit_location: e.target.value })}
          required
        />
        <button type="submit">{editingUnit ? 'Update Location' : 'Add Unit'}</button>
      </form>
    </div>
    <div><Footer/></div>
    </>
  );
};

export default UnitTable;

