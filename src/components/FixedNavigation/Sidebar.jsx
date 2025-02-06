// src/components/Sidebar.jsx
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import EventIcon from '@mui/icons-material/Event';
import './Sidebar.css';
 
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="src/assets/harbinger-logo.png.webp" alt="Logo" /> {/* Replace with your logo image path */}
      </div>
      <List>
        {[
          { text: 'Dashboard', icon: <DashboardIcon /> },
          { text: 'Trainings', icon: <SchoolIcon /> },
          { text: 'My Courses', icon: <BookIcon /> },
          { text: 'Events', icon: <EventIcon /> },
        ].map((item, index) => (
          <ListItem button key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
 
export default Sidebar;
 