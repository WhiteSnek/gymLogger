import React, { act, useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ changeTab, activeTab }) => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          top: 79,
          height: 'calc(100% - 79px)',
        },
      }}
    >
      <List sx={{ paddingTop: 2 }}>
        <ListItem
          button
          onClick={() => changeTab('dashboard')}
          sx={{
            '&:hover': { backgroundColor: '#374151' },
            backgroundColor: activeTab === 'dashboard' ? '#4B5563' : 'transparent', // Active item background
          }}
        >
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem
          button
          onClick={() => changeTab('log workout')}
          sx={{
            '&:hover': { backgroundColor: '#374151' },
            backgroundColor: activeTab === 'log workout' ? '#4B5563' : 'transparent',
          }}
        >
          <ListItemText primary="Log Workout" />
        </ListItem>
        <ListItem
          button
          onClick={() => changeTab('new plan')}
          sx={{
            '&:hover': { backgroundColor: '#374151' },
            backgroundColor: activeTab === 'new plan' ? '#4B5563' : 'transparent',
          }}
        >
          <ListItemText primary="Create New Plan" />
        </ListItem>
        <ListItem
          button
          onClick={() => changeTab('plans')}
          sx={{
            '&:hover': { backgroundColor: '#374151' },
            backgroundColor: activeTab === 'plans' ? '#4B5563' : 'transparent',
          }}
        >
          <ListItemText primary="View Plans" />
        </ListItem>
        <ListItem
          button
          onClick={() => changeTab('Personal Records')}
          sx={{
            '&:hover': { backgroundColor: '#374151' },
            backgroundColor: activeTab === 'Personal Records' ? '#4B5563' : 'transparent',
          }}
        >
          <ListItemText primary="View Your PRs" />
        </ListItem>
      </List>
      <Divider sx={{ backgroundColor: '#F87171', margin: '10px 0' }} />
      <List sx={{ marginTop: 'auto' }}>
        <ListItem
          component={NavLink}
          to="/settings"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem
          component={NavLink}
          to="/logout"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
