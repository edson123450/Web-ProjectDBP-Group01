import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, CssBaseline, Box, FormControlLabel, Checkbox } from '@mui/material';
import { fetchRegister } from '../services/api';
import '../styles/Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    age: 0,
    email: '',
    password: '',
    district: { name: '' },
    direccion: '',
    isWorker: false
  });

  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setData({
      ...data,
      [field]: value
    });
  };

  const handleCheckboxChange = () => {
    setData({
      ...data,
      isWorker: !data.isWorker
    });
  };

  const handleRegister = async () => {
    setError('');
    try {
      const role = await fetchRegister(data);
      if (role === 'ROLE_CLIENT') {
        navigate('/client-home');
      } else if (role === 'ROLE_WORKER') {
        navigate('/worker-home');
      } else {
        setError('There is some data that is incorrect');
      }
    } catch (error) {
      console.log('Register failed: ', error);
      setError('Something went wrong');
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="container">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        {error ? <Typography color="error">{error}</Typography> : null}
        <TextField
          margin="normal"
          required
          fullWidth
          label="First Name"
          value={data.firstname}
          onChange={(e) => handleInputChange('firstname', e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Last Name"
          value={data.lastname}
          onChange={(e) => handleInputChange('lastname', e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Age"
          type="number"
          value={data.age}
          onChange={(e) => handleInputChange('age', e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email"
          type="email"
          value={data.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={data.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={data.isWorker}
              onChange={handleCheckboxChange}
              name="isWorker"
              color="primary"
            />
          }
          label="Register as Worker"
        />
        {!data.isWorker && (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              label="District"
              value={data.district.name}
              onChange={(e) => handleInputChange('district', { name: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Direccion"
              value={data.direccion}
              onChange={(e) => handleInputChange('direccion', e.target.value)}
            />
          </>
        )}
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleRegister}
        >
          Register
        </Button>
        <Button
          fullWidth
          variant="text"
          onClick={() => navigate('/login')}
        >
          Already have an account? Login
        </Button>
      </Box>
    </Container>
  );
};

export default Register;