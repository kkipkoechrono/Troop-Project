import React, { useEffect, useState } from 'react';


const Army = () => {
  const [personnel, setPersonnel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMember, setNewMember] = useState({
    first_name: '',
    last_name: '',
    age: '',
    rank: '',
    phone_number: '',
    email: '',
    joining_date: ''
  });

 

  useEffect(() => {
    const fetchPersonnel = async () => {
      const response = await fetch('http://127.0.0.1:5555/personnels'); // Adjust the endpoint as necessary
      const data = await response.json();
      setPersonnel(data);
      setLoading(false);
    }; 
    
    fetchPersonnel();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleAddMember = async () => {
    const response = await fetch('http://127.0.0.1:5555/personnels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMember),
    });
    
    const addedMember = await response.json();
    setPersonnel([...personnel, addedMember]);
    setNewMember({ first_name: '', last_name: '', age: '', rank: '', phone_number: '', email: '', joining_date: '' });
  };

  const handleUpdateMember = async (id, updatedData) => {
    const response = await fetch(`http://127.0.0.1:5555/personnels/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    
    const updatedMember = await response.json();
    setPersonnel(personnel.map(member => member.id === id ? updatedMember : member));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className='body-container'>
      <h1>Personnel List</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Rank</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Joining Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {personnel.map(member => (
            <tr key={member.id}>
              <td>{member.first_name}</td>
              <td>{member.last_name}</td>
              <td>{member.age}</td>
              <td>{member.rank}</td>
              <td>{member.phone_number}</td>
              <td>{member.email}</td>
              <td>{new Date(member.joining_date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleUpdateMember(member.id, member)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add New Member</h2>
      <input name="first_name" value={newMember.first_name} onChange={handleChange} placeholder="First Name" />
      <input name="last_name" value={newMember.last_name} onChange={handleChange} placeholder="Last Name" />
      <input name="age" value={newMember.age} onChange={handleChange} placeholder="Age" />
      <input name="rank" value={newMember.rank} onChange={handleChange} placeholder="Rank" />
      <input name="phone_number" value={newMember.phone_number} onChange={handleChange} placeholder="Phone Number" />
      <input name="email" value={newMember.email} onChange={handleChange} placeholder="Email" />
      <input name="joining_date" type="date" value={newMember.joining_date} onChange={handleChange} placeholder="Joining Date" />
      <button onClick={handleAddMember}>Add Member</button>
    </div>
  );
};

export default Army;
