// 📁 src/components/Footer.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: 'center',
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Digital Library. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
