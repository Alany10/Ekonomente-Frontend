import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Managers.css';

function Managers() {
  const [managers, setManagers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/managers/managers')
      .then(response => {
        setManagers(response.data);
      })
      .catch(error => {
        setError(error);
        console.error('Det gick inte att hämta data från API:et', error);
      });
  }, []);

  if (error) {
    return <div>Ett fel inträffade när data skulle hämtas: {error.message}</div>;
  }

  return (
    <div className='managers-container'>
      <h1>Managers</h1>
      <div className="grid-container">
        {managers.map((manager, index) => (
          <div key={index} className="grid-item">
            <div>Name: {manager.name}</div>
            <div>Email: {manager.email}</div>
            <div>Consultants: 
              {manager.consultants && manager.consultants.map((consultant, idx) => (
                <span key={idx}>{consultant.name}{idx < manager.consultants.length - 1 ? ', ' : ''}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Managers;
