import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Consult() {
  const [consults, setConsults] = useState([]);
  const [error, setError] = useState('');
  const [selectedConsult, setSelectedConsult] = useState(null);
  const [showCreateConsultForm, setShowCreateConsultForm] = useState(false);
  const [newConsultName, setNewConsultName] = useState('');
  const [newConsultEmail, setNewConsultEmail] = useState('');
  const [newConsultPassword, setNewConsultPassword] = useState('');

  useEffect(() => {
    fetchConsults();

    // Cleanup function to cancel any ongoing requests
    return () => {};
  }, []);

  const fetchConsults = async () => {
    try {
      const response = await axios.get('http://localhost:8080/consult/allConsultants');
      setConsults(response.data);
      setError('');
    } catch (error) {
      setError('Failed to fetch consults');
      console.error('Failed to fetch consults', error);
    }
  };

  const handleConsultClick = (consultDetails) => {
    setSelectedConsult(consultDetails);
  };

  const handleCreateConsult = () => {
    setShowCreateConsultForm(true);
  };

  const handleSubmitConsult = async () => {
    try {
        const consultData = {
          name: newConsultName,
          email: newConsultEmail,
          password: newConsultPassword
        };
        await axios.post('http://localhost:8080/consult/register', consultData);
        setShowCreateConsultForm(false);
        await fetchConsults(); 
        setError('');
      } catch (error) {
        setError('Failed to create consult. Please try again.');
        console.error('Failed to create consult', error);
      }
  };

  const handleDeleteConsult = async () => {
    if (selectedConsult) {
        try {
          await axios.delete(`http://localhost:8080/consult/${selectedConsult.id}/delete`);
          await fetchConsults(); 
          setSelectedConsult(null); 
          setError('');
        } catch (error) {
          setError('Failed to delete consult. Please try again.');
          console.error('Failed to delete consult', error);
        }
      }
  };

  return (
    <div>
      <h2>Consults</h2>
      <div>
        <button onClick={handleCreateConsult}>Create Consult</button>
        <button onClick={handleDeleteConsult} disabled={!selectedConsult}>Delete Consult</button>
      </div>
      {showCreateConsultForm && (
        <div>
          <h3>Create Consult</h3>
          <div>
            <label>Consult Name:</label>
            <input type="text" value={newConsultName} onChange={(e) => setNewConsultName(e.target.value)} />
            <label>Consult Email:</label>
            <input type="text" value={newConsultEmail} onChange={(e) => setNewConsultEmail(e.target.value)} />
            <label>Consult Password:</label>
            <input type="text" value={newConsultPassword} onChange={(e) => setNewConsultPassword(e.target.value)} />
            <button onClick={handleSubmitConsult}>Submit</button>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
      <ul>
        {consults.map((consultMap, index) => (
          <li
            key={index}
            onClick={() => handleConsultClick({ id: Object.keys(consultMap)[0], details: Object.values(consultMap)[0] })}
            style={{
              cursor: 'pointer',
              marginBottom: '10px',
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: selectedConsult && selectedConsult.id === Object.keys(consultMap)[0] ? '#e0f0ff' : 'transparent',
            }}
          >
            {Object.values(consultMap)[0]}
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default Consult;
