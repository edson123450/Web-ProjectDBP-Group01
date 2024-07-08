/*import './App.css'
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

function App() {

  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="*" element={<Navigate to="/login"/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App*/

/*import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'
import WorkerHomeScreen from './pages/WorkerHomeScreen';
import ClientHomeScreen from './pages/ClientHomeScreen';
// Importa otros componentes de páginas aquí

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register />} />

      </Routes>
    </Router>
  );
};

export default App;*/


import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ClientHomeScreen from './pages/ClientHomeScreen';
import WorkerHomeScreen from './pages/WorkerHomeScreen';
import ClientProfile from './pages/ClientProfile';
import WorkerProfile from './pages/WorkerProfile';
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/client-home" element={<ClientHomeScreen />} />
        <Route path="/worker-home" element={<WorkerHomeScreen />} />
        <Route path="/client-profile" element={<ClientProfile />} />
        <Route path="/worker-profile" element={<WorkerProfile />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;