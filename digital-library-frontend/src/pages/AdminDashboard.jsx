//src/pages/AdminDashboard.jsx
import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h4" display="flex" justifyContent="center" mt={5}>
        Admin Dashboard
      </Typography>

      <Box mt={2} display="flex" justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => navigate('/upload')}
          sx={{ width: '60%' }}
        >
          Upload New Book
        </Button>
      </Box>

      <Box mt={2} display="flex" justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => navigate('/admin/users')}
          sx={{ width: '60%' }}
        >
        User Management
        </Button>
      </Box>

      <Box mt={2} display="flex" justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => navigate('/admin/books')}
          sx={{ width: '60%' }}
        >
          Manage Books
        </Button>
      </Box>

      <Box mt={2} mb={2} display="flex" justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => navigate('/')}
          sx={{ width: '60%' }}
        >
          Go to Home Page
        </Button>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
