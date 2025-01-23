import React from 'react';
import { Button } from '@mui/material';
import LandingMap from './LandingMap.tsx';
import LandingHeader from './LandingHeader.tsx';

export default function Landing() {
  return (
    <div style={{ position: 'relative' }}>
      <LandingHeader />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#f28f8a',
            width: '200px',
            height: '50px',
            fontSize: '17px',
            '&:hover': {
              backgroundColor: '#ff3f73',
            },
          }}
        >
          CHAPTER LOGIN
        </Button>
      </div>
      <LandingMap />
    </div>
  );
}
