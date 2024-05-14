import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Mission() {
  const [missions, setMissions] = useState([]);
  const [selectedMission, setSelectedMission] = useState(null);
  const [error, setError] = useState('');
  const [showCreateMissionForm, setShowCreateMissionForm] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [newMissionName, setNewMissionName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const history = useHistory(); // Get history object

  useEffect(() => {
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

    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:8080/company/allCompanies');
        setCompanies(response.data);
        setError('');
      } catch (error) {
        setError('Failed to fetch companies');
        console.error('Failed to fetch companies', error);
      }
    };

    fetchMissions();
    fetchCompanies();

    // Cleanup function to cancel any ongoing requests
    return () => {};
  }, []);

  const handleMissionClick = (missionDetails) => {
    setSelectedMission(missionDetails);
  };

  const handleCreateMission = () => {
    setShowCreateMissionForm(true);
  };

  const handleSubmitMission = async () => {
    try {
      const missionData = {
        name: newMissionName,
        startDate,
        endDate,
        company: { id: selectedCompany }
      };
      await axios.post('http://localhost:8080/mission/register', missionData);
      setShowCreateMissionForm(false);
      setError('');
      // Optionally, you can display a success message here
    } catch (error) {
      setError('Failed to create mission. Please try again.');
      console.error('Failed to create mission', error);
    }
  };

  const handleAssingConsult = () => {
    if (selectedMission) {
      history.push(`/mission/${selectedMission.id}/consult`);
    }
  };

  return (
    <div>
      <h2>Missions</h2>
      <div>
        <button onClick={handleCreateMission}>Create Mission</button>
        <button onClick={handleAssingConsult} disabled={!selectedMission}>Assign Mission</button>
      </div>
      {showCreateMissionForm && (
        <div>
          <h3>Create Mission</h3>
          <label>Select Company:</label>
          <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
            <option value="">Select a company...</option>
            {companies.map((companyMap, index) => (
              <option key={index} value={Object.keys(companyMap)[0]}>
                {Object.values(companyMap)[0]}
              </option>
            ))}
          </select>
          {selectedCompany && (
            <div>
              <label>Mission Name:</label>
              <input type="text" value={newMissionName} onChange={(e) => setNewMissionName(e.target.value)} />
              <label>Start Date:</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <label>End Date:</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              <button onClick={handleSubmitMission}>Submit</button>
            </div>
          )}
        </div>
      )}
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
    </div>
  );
}

export default Mission;
