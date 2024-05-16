import './ManagerDashboard.css';
import React from 'react';
import { useHistory } from 'react-router-dom';

function ManagerDashboard() {
  const history = useHistory();

  const handleMission = () => {
    history.push('mission');
  };

  const handleCompany = () => {
    history.push('company');
  };

  const handleTimestamps = () => {
    history.push('timestamp');
  };

  return (
    <div className="manager-dashboard">  
      <h2>Manager Dashboard</h2>
      <button onClick={handleMission}>Mission</button>
      <button onClick={handleCompany}>Company</button>
      <button onClick={handleTimestamps}>Timestamp</button>
    </div>
  );
}

export default ManagerDashboard;
