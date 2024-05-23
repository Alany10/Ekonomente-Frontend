import axios from 'axios';
import './ManagerDashboard.css';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function ManagerDashboard() {
  const { managerId } = useParams(); // Extract managerId from URL
  const history = useHistory();
  const [managerName, setManagerName] = useState('');  // Use state to store manager's name
  
  useEffect(() => {
    // Function to fetch manager's name from the API
    const fetchManagerName = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/manager/${managerId}/name`);
        setManagerName(response.data);  // Set the fetched name to state
      } catch (error) {
        console.error('Error fetching manager name:', error);
        setManagerName('Manager');  // Fallback if there's an error
      }
    };

    fetchManagerName();  // Call the function
  }, [managerId]);  // Dependency array includes managerId to refetch if it changes

  const handleMission = () => {
    history.push('mission');
  };

  const handleCompany = () => {
    history.push('company');
  };

  const handleTimestamps = () => {
    history.push('timestamp');
  };

  const handleConsult = () => {
    history.push('consult');  
  };

  return (
    <div className="manager-dashboard">
      <h2>Welcome, {managerName}</h2>
      <button onClick={handleMission}>Mission</button>
      <button onClick={handleCompany}>Company</button>
      <button onClick={handleTimestamps}>Timestamp</button>
      <button onClick={handleConsult}>Consult</button>
    </div>
  );
}

export default ManagerDashboard;
