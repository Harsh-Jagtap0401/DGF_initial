// src/components/Header.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Menu, MenuItem, Avatar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Header.css';
 
const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
 
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
 
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
 
  return (
    <AppBar position="fixed" className="header">
      <Toolbar>
        {/* Search Bar */}
        <div className="search">
        <SearchIcon />
          <InputBase placeholder="Search courses..." className="search-input" />
          
          <IconButton type="submit" aria-label="search">
           
          </IconButton>
        </div>
 
        {/* Spacer to push items to the right */}
        <div style={{ flexGrow: 1 }} />
 
        {/* Notification Icon */}
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
 
        {/* Profile Image and Dropdown */}
        <div className="profile" onClick={handleMenuOpen}>
          <Avatar alt="User" src="/profile.jpg" /> {/* Replace with your profile image path */}
          <Typography variant="body1" style={{ marginLeft: '10px' }}>
            John Doe
          </Typography>
        </div>
 
        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
 
export default Header;