import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Missions() {
  const [missions, setMissions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/mission')
      .then(response => {
        setMissions(response.data);
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
    <div>
      <h1>Missions</h1>
      {missions.length > 0 ? (
        <ul>
          {missions.map((mission, index) => <li key={index}>{mission}</li>)}
        </ul>
      ) : (
        <div>Inga Uppdrag att visa.</div>
      )}
    </div>
  );
}

export default Missions;
