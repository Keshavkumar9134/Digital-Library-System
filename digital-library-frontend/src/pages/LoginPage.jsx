// 📁 src/pages/LoginPage.jsx
import React, { useState, useContext } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      setUser(res.data.user);
      navigate(res.data.user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
          <Button
            variant="text"
            color="secondary"
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
