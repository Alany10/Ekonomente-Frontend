import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Import Modal

// Set the app element for React Modal
Modal.setAppElement('#root');

function Timestamp() {
  const [timestamps, setTimestamps] = useState([]);
  const [selectedTimestamp, setSelectedTimestamp] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTimestamps = async () => {
      try {
        const response = await axios.get('http://localhost:8080/timestamp/allTimestamps');
        setTimestamps(response.data);
        setError('');
      } catch (error) {
        setError('Failed to fetch timestamps');
        console.error('Failed to fetch timestamps', error);
      }
    };

    fetchTimestamps();

    return () => {};
  }, []);

  const handleTimestampClick = (timestamp) => {
    setSelectedTimestamp(timestamp);
  };

  const handleDeleteTimestamp = async () => {
    if (selectedTimestamp) {
      try {
        await axios.delete(`http://localhost:8080/timestamp/${selectedTimestamp.id}/delete`);
        const response = await axios.get('http://localhost:8080/timestamp/allTimestamps');
        setTimestamps(response.data);
        setSelectedTimestamp(null);
      } catch (error) {
        console.error('Failed to delete timestamp', error);
      }
    }
  };

  return (
    <div>
      <h2>Timestamps</h2>
      <div>
        <button onClick={handleDeleteTimestamp} disabled={!selectedTimestamp}>Delete Timestamp</button>
      </div>
      {error && <p>{error}</p>}
      <ul>
        {timestamps.map((timestampMap, index) => (
          <li
            key={index}
            onClick={() => handleTimestampClick({ id: Object.keys(timestampMap)[0], details: Object.values(timestampMap)[0] })}
            style={{
              cursor: 'pointer',
              marginBottom: '10px',
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: selectedTimestamp && selectedTimestamp.id === Object.keys(timestampMap)[0] ? '#e0f0ff' : 'transparent',
            }}
          >
            {Object.values(timestampMap)[0]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Timestamp;
