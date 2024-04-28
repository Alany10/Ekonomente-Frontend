import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Konsulter.css'; 

function Konsulter() {
  const [consults, setConsults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/consults/consultants')
      .then(response => {
        setConsults(response.data);
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
    <div className='consults-container'>
      <h1>Consultants</h1>
      <div className="grid-container">
        {consults.map((consult, index) => (
          <div key={index} className="grid-item">
            <div>Name: {consult.name}</div>
            <div>Email: {consult.email}</div>
            <div>Missions: 
              {consult.missions && consult.missions.map((mission, idx) => (
                <span key={idx}>{mission}{idx < consult.missions.length - 1 ? ', ' : ''}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Konsulter;
