// 📁 src/components/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1, 
        width: '100%'
      }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: '#fff' }}
        >
          📚 Digital Library
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
