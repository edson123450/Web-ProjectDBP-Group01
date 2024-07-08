import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, CssBaseline, Box } from '@mui/material';
import { fetchLogin } from '../services/api';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setData({
      ...data,
      [field]: value
    });
  };

  const handleLogin = async () => {
    setError('');
    if (!data.email || !data.password) {
      setError('Email and Password are required');
      return;
    }
    try {
      const role = await fetchLogin(data);
      console.log('Role: ', role);
      if (role === 'ROLE_CLIENT') {
        navigate('/client-home');
        setData({
          email: '',
          password: ''
        });
      } else if (role === 'ROLE_WORKER') {
        navigate('/worker-home');
        setData({
          email: '',
          password: ''
        });
      } else {
        setError('Email or Password is incorrect');
      }
    } catch (error) {
      console.log('Login failed: ', error);
      setError('Email or Password is incorrect');
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
          Login in DomiService
        </Typography>
        {error ? <Typography color="error">{error}</Typography> : null}
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email"
          value={data.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Enter your email"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={data.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          placeholder="Enter your password"
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogin}
        >
          Log In
        </Button>
        <Button
          fullWidth
          variant="text"
          onClick={() => navigate('/register')}
        >
          Don't have an account? Register
        </Button>
      </Box>
    </Container>
  );
};

export default Login;