import React from 'react';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LandingMap from './LandingMap.tsx';
import LandingHeader from './LandingHeader.tsx';
import { useAppSelector } from '../util/redux/hooks.ts';
import { selectUser } from '../util/redux/userSlice.ts';

export default function Landing() {
  const user = useAppSelector(selectUser);
  // Check if user has an email, which indicates they're logged in
  const isLoggedIn = Boolean(user.email);
  const loginPath = isLoggedIn ? '/home' : '/login';

  return (
    <div style={{ position: 'relative' }}>
      <LandingHeader />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          component={RouterLink}
          to={loginPath}
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
