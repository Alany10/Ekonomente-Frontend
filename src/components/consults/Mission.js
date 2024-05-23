import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Mission() {
  const { consultId } = useParams(); // Extract consultId from URL
  const [missions, setMissions] = useState([]);
  const [selectedMission, setSelectedMission] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [consultName, setConsultName] = useState(''); // State to store consultant's name

  useEffect(() => {
    const fetchConsultantName = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/consult/${consultId}/name`);
        setConsultName(response.data);
      } catch (error) {
        console.error('Error fetching consultant name:', error);
        setConsultName('Consultant'); // Fallback if there's an error
      }
    };

    const fetchMissions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/mission/allMissions');
        setMissions(response.data);
        setError('');
      } catch (error) {
        setError('Failed to fetch missions');
        console.error('Failed to fetch missions', error);
      }
    };

    fetchConsultantName(); // Fetch consultant's name
    fetchMissions(); // Fetch missions

  }, [consultId]);

  const handleMissionClick = (missionDetails) => {
    setSelectedMission(missionDetails);
  };

  const handleAddTimestamp = async () => {
    // Open the modal when clicking the "Add Timestamp" button
    setShowModal(true);
  };

  const handleSubmitTimestamp = async () => {
    try {
      const timestampData = {
        notes,
        startTime,
        endTime,
        date,
        consult: { id: consultId },
        mission: { id: selectedMission.id }
      };
      await axios.post('http://localhost:8080/timestamp/register', timestampData);
      setShowModal(false); // Close the modal after successful submission
      setError('');
      // Optionally, you can display a success message here
    } catch (error) {
      setError('Timestamp already exists.');
      console.error('Failed to add timestamp', error);
    }
  };

  return (
    <div>
      <h2>Welcome, {consultName}</h2> {/* Display consultant's name */}
      <h2>Missions</h2>
      {error && <p>{error}</p>}
      <ul>
        {missions.map((missionMap, index) => (
          <li
            key={index}
            onClick={() => handleMissionClick({ id: Object.keys(missionMap)[0], details: Object.values(missionMap)[0] })}
            style={{
              cursor: 'pointer',
              marginBottom: '10px',
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: selectedMission && selectedMission.id === Object.keys(missionMap)[0] ? '#e0f0ff' : 'transparent',
            }}
          >
            {Object.values(missionMap)[0]}
          </li>
        ))}
      </ul>

      <button onClick={handleAddTimestamp} disabled={!selectedMission}>Add Timestamp</button>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Add Timestamp</h2>
            <label>Notes:</label>
            <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
            <label>Start Time:</label>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            <label>End Time:</label>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            <label>Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <button onClick={handleSubmitTimestamp}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mission;
