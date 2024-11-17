import React from 'react';
import { Button } from '@mui/material';
import { StateAbbreviation, StateConfig } from '../util/types/map';
import LandingMap from './LandingMap';
import LandingHeader from './LandingHeader';

export default function Landing() {
  return (
    <div style={{ position: 'relative' }}>
      <LandingHeader />
      <Button variant="contained" sx={{ backgroundColor: '#FF3F7F' }}>
        CHAPTER LOGIN
      </Button>
      <LandingMap />
    </div>
  );
}
