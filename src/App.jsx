import React from 'react';
import CarGrid from './CarGrid';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Car Dealership Application
            
          </Typography>
        </Toolbar>
      </AppBar>
      <CarGrid />
    </div>
      
  );
}

export default App;
