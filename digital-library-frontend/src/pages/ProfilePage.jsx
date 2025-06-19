//address:digital-library-frontend/src/pages/ProfilePage.jsx
import React, { useContext } from 'react';
import { Container, Typography } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <Typography>Please login to view your profile.</Typography>;

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" mb={3}>Profile</Typography>
      <Typography>Username: {user.username}</Typography>
      <Typography>Email: {user.email}</Typography>
      <Typography>Role: {user.role}</Typography>
    </Container>
  );
};

export default ProfilePage;
