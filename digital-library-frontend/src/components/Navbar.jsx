// //address: digital-library-frontend/src/components/Navbar.jsx
// import React, { useContext } from 'react';
// import { Button, Box, Toolbar, AppBar } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../contexts/AuthContext';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { user, setUser } = useContext(AuthContext);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <AppBar position="static" color="default">
//       <Toolbar>
//         <Box sx={{ flexGrow: 1 }}>
//           <Button component={Link} to="/" sx={{ mx: 1 }}>
//             Home
//           </Button>

//           {!user && (
//             <>
//               <Button component={Link} to="/login" sx={{ mx: 1 }}>
//                 Login
//               </Button>
//               <Button component={Link} to="/register" sx={{ mx: 1 }}>
//                 Register
//               </Button>
//             </>
//           )}

//           {user && user.role === 'user' && (
//             <>
//               <Button component={Link} to="/my-books" sx={{ mx: 1 }}>
//                 My Books
//               </Button>
//               <Button component={Link} to="/profile" sx={{ mx: 1 }}>
//                 Profile
//               </Button>
//               <Button onClick={handleLogout} sx={{ mx: 1 }}>
//                 Logout
//               </Button>
//             </>
//           )}

//           {user && user.role === 'admin' && (
//             <>
//               <Button component={Link} to="/admin" sx={{ mx: 1 }}>
//                 Dashboard
//               </Button>
//               <Button component={Link} to="/upload" sx={{ mx: 1 }}>
//                 Upload Book
//               </Button>
//               <Button component={Link} to="/admin/books" sx={{ mx: 1 }}>
//                 All Books
//               </Button>
//               <Button component={Link} to="/profile" sx={{ mx: 1 }}>
//                 Profile
//               </Button>
//               <Button onClick={handleLogout} sx={{ mx: 1 }}>
//                 Logout
//               </Button>
//             </>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;
///////_________********__________________/////

//src/components/Navbar.jsx
import React, { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  InputBase,
  useMediaQuery,
  useTheme,
  alpha,
  Typography,
  Tooltip
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Home as HomeIcon,
  Book as BookIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  ExitToApp as LogoutIcon,
  Help as HelpIcon,
  Info as AboutIcon,
  Login as LoginIcon,
  HowToReg as RegisterIcon
} from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

import logo from '../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
    navigate('/login');
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      setShowMobileSearch(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  const getNavItems = () => {
    const commonItems = [
      { label: 'Home', path: '/', icon: <HomeIcon /> },
      { label: 'Help', path: '/help', icon: <HelpIcon /> },
      { label: 'About', path: '/about', icon: <AboutIcon /> }
    ];

    if (!user) {
      return [
        ...commonItems,
        { label: 'Login', path: '/login', icon: <LoginIcon /> },
        { label: 'Register', path: '/register', icon: <RegisterIcon /> },
      ];
    }

    if (user.role === 'user') {
      return [
        ...commonItems,
        { label: 'My Books', path: '/my-books', icon: <BookIcon /> },
        { label: 'Profile', path: '/profile', icon: <PersonIcon /> },
        { label: 'Logout', action: handleLogout, icon: <LogoutIcon /> },
      ];
    }

    return [
      ...commonItems,
      { label: 'My Books', path: '/my-books', icon: <BookIcon /> },
      { label: 'Dashboard', path: '/admin', icon: <DashboardIcon /> },
      { label: 'Profile', path: '/profile', icon: <PersonIcon /> },
      { label: 'Logout', action: handleLogout, icon: <LogoutIcon /> },
    ];
  };

  const navItems = getNavItems();

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(135deg,rgb(53, 116, 199) 0%,rgb(47, 50, 209) 100%)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          color: '#fff'
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            px: { xs: 1, md: 3 }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#fff' }}>
                <MenuIcon />
              </IconButton>
            )}

            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{
                  height: '30px',
                  width: '30px',
                  marginRight: '10px',
                  objectFit: 'contain',
                  borderRadius: '50%',
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  display: { xs: 'none', sm: 'block' },
                  color: '#fff'
                }}
              >
                Digital Library
              </Typography>
            </Box>
          </Box>

          {(showMobileSearch || !isMobile) && (
            <Box
              sx={{
                position: 'relative',
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.common.white, 0.15),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.common.white, 0.25),
                },
                width: isMobile ? '100%' : '400px',
                mx: isMobile ? 0 : 3,
                display: 'flex',
                alignItems: 'center',
                px: 2,
                py: 0.5,
                transition: 'all 0.3s ease'
              }}
            >
              <SearchIcon
                sx={{
                  color: '#fff',
                  mr: 1,
                  cursor: 'pointer'
                }}
                onClick={handleSearch}
              />
              <InputBase
                autoFocus={isMobile}
                fullWidth
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                sx={{
                  flex: 1,
                  color: '#fff',
                  '&::placeholder': {
                    color: alpha(theme.palette.common.white, 0.7),
                    opacity: 1
                  }
                }}
              />
              {isMobile && (
                <IconButton
                  onClick={() => setShowMobileSearch(false)}
                  size="small"
                  sx={{ ml: 1, color: '#fff' }}
                >
                  ✕
                </IconButton>
              )}
            </Box>
          )}

          {!showMobileSearch && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 } }}>
              {isMobile ? (
                <IconButton
                  onClick={() => setShowMobileSearch(true)}
                  sx={{ color: '#fff' }}
                >
                  <SearchIcon />
                </IconButton>
              ) : (
                navItems.map((item, index) => (
                  <Tooltip key={index} title={item.label} arrow>
                    <IconButton
                      component={item.action ? undefined : Link}
                      to={item.action ? undefined : item.path}
                      onClick={item.action ? item.action : undefined}
                      sx={{
                        color: isActive(item.path) ? '#90caf9' : '#fff',
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.common.white, 0.1)
                        }
                      }}
                    >
                      {item.icon}
                    </IconButton>
                  </Tooltip>
                ))
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            top: '64px',
            height: 'calc(100% - 64px)'
          }
        }}
      >
        <List>
          {navItems.map((item, index) => {
            const active = isActive(item.path);
            return (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  component={item.action ? 'button' : Link}
                  to={item.action ? undefined : item.path}
                  onClick={() => {
                    if (item.action) item.action();
                    setDrawerOpen(false);
                  }}
                  sx={{
                    px: 3,
                    py: 1.5,
                    backgroundColor: active ? 'rgba(33, 150, 243, 0.1)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(33, 150, 243, 0.2)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: '40px',
                      color: active ? '#2196f3' : '#90caf9',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      sx: {
                        color: active ? '#2196f3' : '#ffffff',
                        fontWeight: active ? 'bold' : 'normal',
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      <Toolbar />
    </>
  );
};

export default Navbar;
