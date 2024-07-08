import React, { useEffect, useState } from 'react';
import { fetchGetClientMe, fetchUpdateClientProfile } from '../services/api';
import NoPhotoImage from '../images/no-photo-icon.jpeg';
import { useNavigate } from 'react-router-dom';
import '../styles/ClientProfile.css';

const ClientProfile = () => {
  const [client, setClient] = useState(null);
  const [editing, setEditing] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');
  const [distritoVive, setDistritoVive] = useState('');
  const [direccion, setDireccion] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadClientData = async () => {
      try {
        const data = await fetchGetClientMe();
        setClient(data);
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setAge(data.age.toString());
        setDistritoVive(data.distrito_vive.name);
        setDireccion(data.direccion);
      } catch (error) {
        console.error('Failed to load client data: ', error);
      }
    };
    loadClientData();
  }, []);

  const handleSaveProfile = async () => {
    const clientProfileToUpdate = {
      firstname,
      lastname,
      age: parseInt(age, 10),
      distrito_vive: distritoVive,
      direccion,
    };

    try {
      await fetchUpdateClientProfile(clientProfileToUpdate);
      alert('Perfil guardado');
      setEditing(false);
      // Reload the client data
      const updatedClient = await fetchGetClientMe();
      setClient(updatedClient);
    } catch (error) {
      console.error('El perfil no se pudo guardar: ', error);
      alert('Error', 'El perfil no se pudo guardar');
    }
  };

  if (!client) {
    return (
      <div className="container">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <img src={client.profileImage ? client.profileImage : NoPhotoImage} alt="Profile" className="image" />
      {editing ? (
        <>
          <input
            className="input"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="Nombre"
          />
          <input
            className="input"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Apellido"
          />
          <input
            className="input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Edad"
            type="number"
          />
          <input
            className="input"
            value={distritoVive}
            onChange={(e) => setDistritoVive(e.target.value)}
            placeholder="Distrito"
          />
          <input
            className="input"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Dirección"
          />
          <button className="button" onClick={handleSaveProfile}>
            Guardar Perfil
          </button>
        </>
      ) : (
        <>
          <p className="text">Nombre: {client.firstname}</p>
          <p className="text">Apellido: {client.lastname}</p>
          <p className="text">Edad: {client.age}</p>
          <p className="text">Distrito: {client.distrito_vive.name}</p>
          <p className="text">Dirección: {client.direccion}</p>
          <p className="text">Rol: {client.role}</p>
          <button className="button" onClick={() => setEditing(true)}>
            Editar Perfil
          </button>
          <button className="button" onClick={() => navigate('/client-home')}>
            Atrás
          </button>
        </>
      )}
    </div>
  );
};

export default ClientProfile;