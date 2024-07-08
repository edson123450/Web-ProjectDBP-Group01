import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ClientHomeScreen.css';

const ClientHomeScreen = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="client-container">
      <div className="client-buttonRow">
        <button className="client-button" onClick={() => navigate('/client-profile')}>
          Mi Perfil
        </button>
        <button className="client-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ClientHomeScreen;