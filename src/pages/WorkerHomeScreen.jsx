import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WorkerHomeScreen.css';

const WorkerHomeScreen = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="worker-container">
      <div className="worker-buttonRow">
        <button className="worker-button" onClick={() => navigate('/worker-profile')}>
          Mi Perfil
        </button>
        <button className="worker-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default WorkerHomeScreen;