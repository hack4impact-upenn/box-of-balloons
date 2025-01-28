import React from 'react';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LandingMap from './LandingMap.tsx';
import LandingHeader from './LandingHeader.tsx';
import { useAppSelector } from '../util/redux/hooks.ts';
import { selectUser } from '../util/redux/userSlice.ts';
import { useData } from '../util/api.ts';

export default function Landing() {
  // Check if user has an email, which indicates they're logged in
  const isLoggedIn = useData('auth/authstatus');

  const user = useAppSelector(selectUser);

  const loginPath = isLoggedIn?.data ? `/chapterDash/${user.id}` : '/login';

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
