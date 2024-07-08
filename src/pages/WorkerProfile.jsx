import React, { useEffect, useState } from 'react';
import { fetchGetWorkerMe, fetchUpdateWorkerProfile } from '../services/api';
import NoPhotoImage from '../images/no-photo-icon.jpeg';
import { useNavigate } from 'react-router-dom';
import '../styles/WorkerProfile.css';

const WorkerProfile = () => {
  const [worker, setWorker] = useState(null);
  const [editing, setEditing] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadWorkerData = async () => {
      try {
        const data = await fetchGetWorkerMe();
        setWorker(data);
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setAge(data.age.toString());
      } catch (error) {
        console.error('Failed to load worker data: ', error);
      }
    };
    loadWorkerData();
  }, []);

  const handleSaveProfile = async () => {
    const workerProfileToUpdate = {
      firstname,
      lastname,
      age: parseInt(age, 10),
    };

    try {
      const updatedWorker = await fetchUpdateWorkerProfile(workerProfileToUpdate);
      setWorker(updatedWorker);
      alert('Perfil guardado');
      setEditing(false);
    } catch (error) {
      console.error('El perfil no se pudo guardar: ', error);
      alert('Error', 'El perfil no se pudo guardar');
    }
  };

  if (!worker) {
    return (
      <div className="container">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <img src={worker.profileImage ? worker.profileImage : NoPhotoImage} alt="Profile" className="image" />
      {editing ? (
        <>
          <input
            className="input"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="First Name"
          />
          <input
            className="input"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Last Name"
          />
          <input
            className="input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
            type="number"
          />
          <button className="button" onClick={handleSaveProfile}>
            Guardar Perfil
          </button>
        </>
      ) : (
        <>
          <p className="text">Nombre: {worker.firstname}</p>
          <p className="text">Apellido: {worker.lastname}</p>
          <p className="text">Edad: {worker.age}</p>
          <p className="text">Rol: {worker.role}</p>
          <p className="text">Calificación Promedio: {worker.averageRating}</p>
          <button className="button" onClick={() => setEditing(true)}>
            Editar Perfil
          </button>
          <button className="button" onClick={() => navigate('/worker-home')}>
            Atrás
          </button>
        </>
      )}
    </div>
  );
};

export default WorkerProfile;